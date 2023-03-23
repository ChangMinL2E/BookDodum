package com.sasatech.bookdodum.service.book;

import com.google.zxing.*;

import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;
import com.sasatech.bookdodum.dto.resposne.book.BookDetailResponseDto;
import com.sasatech.bookdodum.dto.resposne.book.BookListResponseDto;
import com.sasatech.bookdodum.dto.resposne.book.BookResponseDto;
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

        for (UserBook userBook : listUserBook) {
            Long bookId = userBook.getId();
            Book myBook = bookRepository.findById(bookId).orElseThrow();

            List<Category> categoryList = categoryRepository.findAllByBook_Id(myBook.getId());
            List<String> categories = new ArrayList<>();
            for (Category category : categoryList) {
                categories.add(category.getKind());
            }

            String startTime = userBook.getStartTime().toString();
            String endTime = userBook.getEndTime().toString();

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
        return userBookRepository.deleteByBook_IdAndUser_Id(bookId, userId);
    }


    public void finishBook(Long bookId, Long userId) {
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