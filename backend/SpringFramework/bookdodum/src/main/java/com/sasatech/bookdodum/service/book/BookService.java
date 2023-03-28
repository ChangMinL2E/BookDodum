package com.sasatech.bookdodum.service.book;

import com.google.zxing.*;

import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;
import com.sasatech.bookdodum.dto.request.book.BookConvertRequestDto;
import com.sasatech.bookdodum.dto.resposne.book.BookDetailResponseDto;
import com.sasatech.bookdodum.dto.resposne.book.BookListResponseDto;
import com.sasatech.bookdodum.dto.resposne.book.BookResponseDto;
import com.sasatech.bookdodum.dto.resposne.user.UserResponseDto;
import com.sasatech.bookdodum.entity.book.Book;
import com.sasatech.bookdodum.entity.book.Category;
import com.sasatech.bookdodum.entity.user.User;
import com.sasatech.bookdodum.entity.user.UserBook;
import com.sasatech.bookdodum.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;

import java.awt.image.BufferedImage;
import java.io.*;
import java.util.*;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final UserBookRepository userBookRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final UserBookQdslRepositoryImpl userBookQdslRepositoryImpl;



    public boolean addBook(Long bookId, Long userId) {
        Book book = bookRepository.findById(bookId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();

        // 이미 등록한 책이 있다면?
        if (userBookRepository.findByBook_IdAndUser_Id(bookId, userId) != null) {
            return false;
        }

        userBookRepository.save(UserBook.builder()
                .book(book)
                .user(user)
                .endTime(null)
                .build());

        return true;
    }


    public List<BookListResponseDto> listBook(Long userId, boolean fin) {
        List<BookListResponseDto> list = new ArrayList<>();
        List<UserBook> listUserBook = userBookQdslRepositoryImpl.findUserBook(userId, fin);

        return getBookListResponseDtos(list, listUserBook);
    }


    public List<BookListResponseDto> listAllBook(Long userId) {
        List<BookListResponseDto> list = new ArrayList<>();
        List<UserBook> listUserBook = userBookRepository.findAllByUser_Id(userId);

        return getBookListResponseDtos(list, listUserBook);
    }

    private List<BookListResponseDto> getBookListResponseDtos(List<BookListResponseDto> list, List<UserBook> listUserBook) {
        for (UserBook userBook : listUserBook) {
            Long bookId = userBook.getBook().getId();
            Book myBook = bookRepository.findById(bookId).orElseThrow();

            List<Category> categoryList = categoryRepository.findAllByBook_Id(myBook.getId());
            List<String> categories = new ArrayList<>();
            for (Category category : categoryList) {
                categories.add(category.getKind());
            }

            list.add(BookListResponseDto.builder()
                    .bookId(myBook.getId())
                    .imageUrl(myBook.getImageUrl())
                    .title(myBook.getTitle())
                    .publisher(myBook.getPublisher())
                    .category(categories)
                    .build());
        }

        return list;
    }


    public BookResponseDto readIsbn(String path) {
        try {
            // base64 데이터 추출
            String base64Data = path.split(",")[1];
            base64Data = base64Data.replaceAll(" ", "+");
            base64Data = base64Data.replaceAll("[^A-Za-z0-9+/=]", "");

            byte[] decodedBytes = Base64.getDecoder().decode(base64Data);

            // 이미지 파일로 저장
            FileOutputStream outputStream = new FileOutputStream("isbn.png");
            outputStream.write(decodedBytes);
            outputStream.close();

//            FileUtils.writeByteArrayToFile(new File("isbn.png"), decodedBytes, true);


            BufferedImage bf = ImageIO.read(new FileInputStream("isbn.png"));

            BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(
                    new BufferedImageLuminanceSource(bf)
            ));

            Map<DecodeHintType, Object> hints = new EnumMap<>(DecodeHintType.class);
            hints.put(DecodeHintType.PURE_BARCODE, true);

            Result result = new MultiFormatReader().decode(bitmap, hints);


            System.out.println(result.getText());

            // ISBN 기반으로 책 정보 찾기
            Book book = bookRepository.findByIsbn(result.getText());

            return BookResponseDto.builder()
                    .id(book.getId())
                    .author(book.getAuthor())
                    .category(book.getCategory())
                    .content(book.getContent())
                    .imageUrl(book.getImageUrl())
                    .isbn(book.getIsbn())
                    .publisher(book.getPublisher())
                    .siteUrl(book.getSiteUrl())
                    .title(book.getTitle())
                    .build();

        } catch (Exception e) {
            e.printStackTrace();

            return null;
        }
    }


    public boolean deleteBook(Long bookId, Long userId) {
        // userId 와 bookId를 FK로 가진 userBook row 삭제
        try {
            userBookRepository.deleteByBook_IdAndUser_Id(bookId, userId);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    public boolean finishBook(Long bookId, Long userId) {

        try {
            // 다 읽은 책의 id를 통해 userBook 을 찾는다.
            UserBook userBook = userBookRepository.findByBook_IdAndUser_Id(bookId, userId);

            Date date = new Date();

            // endTime 을 제외하고 Update
            userBookRepository.save(UserBook.builder()
                    .id(userBook.getId())
                    .book(userBook.getBook())
                    .user(userBook.getUser())
                    .startTime(userBook.getStartTime())
                    .endTime(date)
                    .build());

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public BookDetailResponseDto detailBook(Long bookId, Long userId) {

        Book book = userBookRepository.findByBook_IdAndUser_Id(bookId, userId).getBook();

        return BookDetailResponseDto.builder()
                .imageUrl(book.getImageUrl())
                .title(book.getTitle())
                .author(book.getAuthor())
                .publisher(book.getPublisher())
                .content(book.getContent())
                .build();
    }

    public List<UserResponseDto> listReadWith(Long bookId, Long userId) {

        // userBook 테이블에서 아직 책을 읽고있는 (endTime 과 startTime 이 다른..),
        // 나의 bookId 와 같은 row들을 구하자.
        // 그 row 에서 userId만 뽑아서 return 하셈 ㅋㅋ
        List<UserBook> list = userBookQdslRepositoryImpl.findUserByReadWith(bookId, userId);
        List<UserResponseDto> dtoList = new ArrayList<>();

        for (UserBook userBook : list) {
            Long readWithUserId = userBook.getUser().getId();
            User readWithUser = userRepository.findById(readWithUserId).orElseThrow();

            // 내 아이디를 제외하고 가져오기
            if (readWithUser.getId() != userId) {
                dtoList.add(UserResponseDto.builder()
                        .name(readWithUser.getName())
                        .build());
            }
        }

        return dtoList;
    }

    public boolean convertBook(BookConvertRequestDto bookConvertRequestDto, Long userId) {
        // userBook 에 convertedImageUrl 를 update
        try {
            UserBook userBook = userBookRepository.findByBook_IdAndUser_Id(bookConvertRequestDto.getBookId(), userId);

            String path = bookConvertRequestDto.getConvertedImageUrl();

            userBookRepository.save(UserBook.builder()
                    .id(userBook.getId())
                    .startTime(userBook.getStartTime())
                    .endTime(userBook.getEndTime())
                    .book(userBook.getBook())
                    .user(userBook.getUser())
                    .convertedImageUrl(path)
                    .build());
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean searchBook(String isbn) {
        if(bookRepository.existsByIsbn(isbn)){
            return true;
        }else{
            return false;
        }
    }

    //도서관에서 책 isbn 넘어오면 책 정보 return
    public BookResponseDto infoBook(String isbn) {
        Book infoBook = bookRepository.findByIsbn(isbn);

        return BookResponseDto.builder()
                .id(infoBook.getId())
                .title(infoBook.getTitle())
                .author(infoBook.getAuthor())
                .publisher(infoBook.getPublisher())
                .imageUrl(infoBook.getImageUrl())
                .isbn(infoBook.getIsbn())
                .siteUrl(infoBook.getSiteUrl())
                .content(infoBook.getContent())
                .category(infoBook.getCategory())
                .build();


    }

    //내가 읽고 있는 책은 읽고 있거나 읽은 사용자들이 읽었던 책들
//    public List<BookResponseDto> recommandBook(long bookId, Long id) {
//        List<UserBook> listUserId = userBookRepository.findByBook_Id(bookId);
//        List<Long> IdList = new ArrayList<>();
//
//        //같은 책을 읽고 있거나 읽은 사용자 id list = IdList
//        for(UserBook userBook : listUserId){
//            if(userBook.getId() == id)continue;
//            IdList.add(userBook.getId());
//        }
//
//
//
//
//
//
//    }


    public List<BookListResponseDto> mybookList(Long id) {
        List<BookListResponseDto> list = new ArrayList<>();

        //List<UserBook> userid = UserBookRepository.findByUser_Id(id);

    }

    public boolean existReadWith(Long bookId, Long id) {


    }
}







//    public List<Book> convertCategory() {
//        List<Book> books = bookRepository.findAll();
//        Pattern pattern = Pattern.compile("[\\w가-힣]+");
//
//        for (Book book : books) {
//            String category = book.getCategory();
//            Matcher matcher = pattern.matcher(category);
//
//            while (matcher.find()) {
//                String kind = matcher.group();
//
//                categoryRepository.save(Category.builder()
//                        .book(book)
//                        .kind(kind)
//                        .build()
//                );
//            }
//        }
//
//        return null;
//    }