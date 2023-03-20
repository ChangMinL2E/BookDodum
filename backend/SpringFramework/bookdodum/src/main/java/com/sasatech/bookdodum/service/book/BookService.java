package com.sasatech.bookdodum.service.book;

import com.google.zxing.*;

import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;
import com.sasatech.bookdodum.dto.request.book.BookRequestDto;
import com.sasatech.bookdodum.dto.resposne.book.BookListResponseDto;
import com.sasatech.bookdodum.dto.resposne.book.BookResponseDto;
import com.sasatech.bookdodum.entity.book.Book;
import com.sasatech.bookdodum.entity.book.Category;
import com.sasatech.bookdodum.entity.user.User;
import com.sasatech.bookdodum.entity.user.UserBook;
import com.sasatech.bookdodum.repository.CategoryRepository;
import com.sasatech.bookdodum.repository.BookRepository;
import com.sasatech.bookdodum.repository.UserBookRepository;
import com.sasatech.bookdodum.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.aspectj.util.FileUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import org.springframework.util.Base64Utils;

import java.awt.image.BufferedImage;
import java.io.*;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
                .build());

        return true;
    }


    public List<Book> convertCategory() {
        List<Book> books = bookRepository.findAll();
        Pattern pattern = Pattern.compile("[\\w가-힣]+");

        for (Book book : books) {
            String category = book.getCategory();
            Matcher matcher = pattern.matcher(category);

            while (matcher.find()) {
                String kind = matcher.group();

                categoryRepository.save(Category.builder()
                        .book(book)
                        .kind(kind)
                        .build()
                );
            }
        }

        return null;
    }


    public List<BookListResponseDto> listBook() {
//        List<Book> bookList = bookRepository.findAllByUserId();
        List<BookListResponseDto> list = new ArrayList<>();


//        for (Book book : bookList) {
//            BookListResponseDto dto = BookListResponseDto.builder()
//                    .build();
//        }

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
}