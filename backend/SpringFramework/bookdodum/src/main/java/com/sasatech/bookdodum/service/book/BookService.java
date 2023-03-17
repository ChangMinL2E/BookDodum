package com.sasatech.bookdodum.service.book;

import com.google.zxing.*;

import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;
import com.sasatech.bookdodum.dto.request.book.BookRequestDto;
import com.sasatech.bookdodum.dto.resposne.book.BookListResponseDto;
import com.sasatech.bookdodum.entity.book.Book;
import com.sasatech.bookdodum.entity.book.Category;
import com.sasatech.bookdodum.repository.CategoryRepository;
import com.sasatech.bookdodum.repository.BookRepository;
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
    private final CategoryRepository categoryRepository;

    public boolean addBook(BookRequestDto bookRequestDto) {
        bookRepository.save(Book.builder()
                .author(bookRequestDto.getAuthor())
                .category(bookRequestDto.getCategory())
                .content(bookRequestDto.getContent())
                .imageUrl(bookRequestDto.getImageUrl())
                .isbn(bookRequestDto.getIsbn())
                .publisher(bookRequestDto.getPublisher())
                .siteUrl(bookRequestDto.getSiteUrl())
                .title(bookRequestDto.getTitle())
                .build());
        // 도서 등록 로직
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


    public void convertToPng(String webpFile, String pngFile) throws IOException {

        System.out.println(webpFile);
//        BufferedImage image = ImageIO.read(new File(webpFile));
//        ImageIO.write(image, "png", new File(pngFile));

//        ImageInputStream input = ImageIO.createImageInputStream(webpFile);
        ImageReader reader = ImageIO.getImageReadersByMIMEType("image/webp").next();
//        reader.setInput(input);
//        BufferedImage image = reader.read(0);
//
//        ImageOutputStream output = ImageIO.createImageOutputStream(pngFile);
//        ImageWriter writer = ImageIO.getImageWritersByFormatName("png").next();
//        writer.setOutput(output);
//        writer.write(image);
//
//        input.close();
//        output.close();
    }



    public void readIsbn(String path) {

        try {

            // base64 데이터 추출
            String base64Data = path.split(",")[1];
            base64Data = base64Data.replaceAll(" ", "+");
            base64Data = base64Data.replaceAll("[^A-Za-z0-9+/=]", "");

            byte[] decodedBytes = Base64.getDecoder().decode(base64Data);

            // 이미지 파일로 저장
            FileOutputStream outputStream = new FileOutputStream("isbn1.jpg");
            outputStream.write(decodedBytes);
            outputStream.close();


            FileUtils.writeByteArrayToFile(new File("isbn2.jpg"), decodedBytes, true);

            BufferedImage bf = ImageIO.read(new FileInputStream("isbn1.jpg"));
            BufferedImage bf2 = ImageIO.read(new FileInputStream("isbn2.jpg"));

            System.out.println(bf);
            System.out.println(bf2);

            BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(
                    new BufferedImageLuminanceSource(bf)
            ));

            Map<DecodeHintType, Object> hints = new EnumMap<>(DecodeHintType.class);
            hints.put(DecodeHintType.PURE_BARCODE, true);

            Result result = new MultiFormatReader().decode(bitmap, hints);

            System.out.println(result.getText());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}


//            FileInputStream fileInputStream = new FileInputStream("abc.png");
//
//
//            try {
//                if (fileInputStream != null) {
//                    BufferedImage image = ImageIO.read(new FileInputStream("abc.png"));
//                    if (image != null) {
//                        // 이미지 파일이 로드된 경우 수행할 작업
//                    } else {
//                        System.out.println("이미지 파일을 로드할 수 없습니다.");
//                    }
//                } else {
//                    System.out.println("파일을 찾을 수 없습니다.");
//                }
//            } catch (IOException e) {
//                e.printStackTrace();
//            }