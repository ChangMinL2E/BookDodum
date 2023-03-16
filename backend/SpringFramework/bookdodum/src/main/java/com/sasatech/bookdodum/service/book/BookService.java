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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;

import org.mockito.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
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
            System.out.println(path);
            convertToPng(path, "C:/Users/multicampus/Desktop/imgs");

            BufferedImage bf = ImageIO.read(new FileInputStream(path));
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


//    private String readBarcode(String fileName) {
//        File file = new File(fileName);
//        BufferedImage image = null;
//        BinaryBitmap bitmap = null;
//        Result result = null;
//
//        try {
//            image = ImageIO.read(file);
//            int[] pixels = image.getRGB(0, 0, image.getWidth(), image.getHeight(), null, 0, image.getWidth());
//            RGBLuminanceSource source = new RGBLuminanceSource(image.getWidth(), image.getHeight(), pixels);
//            bitmap = new BinaryBitmap(new HybridBinarizer(source));
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//        if (bitmap == null) {
//            return null;
//        }
//        EAN13Reader reader = new EAN13Reader();
//        try {
//
//            result = reader.decode(bitmap);
//
//            System.out.println("Decoded image successfully, result was : '" + result.getText() + "'");
//            return result.getText();
//
//        } catch (FormatException | NotFoundException e) {
//            e.printStackTrace();
//        }
//
//        return null;
//    }
