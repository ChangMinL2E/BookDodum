package com.sasatech.bookdodum.service.book;

import com.google.zxing.*;

import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;
import com.sasatech.bookdodum.dto.resposne.book.BookResponseDto;
import com.sasatech.bookdodum.entity.book.Book;
import com.sasatech.bookdodum.entity.user.User;
import com.sasatech.bookdodum.entity.user.UserBook;
import com.sasatech.bookdodum.repository.CategoryRepository;
import com.sasatech.bookdodum.repository.BookRepository;
import com.sasatech.bookdodum.repository.UserBookRepository;
import com.sasatech.bookdodum.repository.UserRepository;
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


    public boolean addBook(Long id) {
        Book book = bookRepository.findById(id).orElseThrow();
        User user = userRepository.findById(1L).orElseThrow();

        userBookRepository.save(UserBook.builder()
                .book(book)
                .user(user)
                .endTime(null)
                .build());

        return true;
    }


    public List<BookResponseDto> listBook() {
        User user = userRepository.findById(1L).orElseThrow();


        List<BookResponseDto> list = new ArrayList<>();
        List<UserBook> listUserBook = userBookRepository.findAllByUser_Id(user.getId());

        for (UserBook userBook : listUserBook) {
            Long bookId = userBook.getId();
            Book myBook = bookRepository.findById(bookId).orElseThrow();

            list.add(BookResponseDto.builder()
                    .id(myBook.getId())
                    .title(myBook.getTitle())
                    .author(myBook.getAuthor())
                    .publisher(myBook.getPublisher())
                    .imageUrl(myBook.getImageUrl())
                    .isbn(myBook.getIsbn())
                    .siteUrl(myBook.getSiteUrl())
                    .content(myBook.getContent())
                    .category(myBook.getCategory())
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


    public boolean deleteBook(Long id) {
        User user = userRepository.findById(1L).orElseThrow();
        // userId 와 bookId를 FK로 가진 userBook row 삭제
        return userBookRepository.deleteByBook_IdAndUser_Id(id, user.getId());
    }


    public void finishBook(Long id) {
        User user = userRepository.findById(1L).orElseThrow();

        // 다 읽은 책의 id를 통해 userBook 을 찾는다.
        UserBook userBook = userBookRepository.findByBook_Id(id);

        // endTime 을 제외하고 Update
        userBookRepository.save(UserBook.builder()
                .id(userBook.getId())
                .book(userBook.getBook())
                .user(userBook.getUser())
                .startTime(userBook.getStartTime())
                .build());
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