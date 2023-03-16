package com.sasatech.bookdodum.service.book;

import com.sasatech.bookdodum.dto.request.book.BookRequestDto;
import com.sasatech.bookdodum.dto.resposne.book.BookListResponseDto;
import com.sasatech.bookdodum.entity.book.Book;
import com.sasatech.bookdodum.entity.book.Category;
import com.sasatech.bookdodum.repository.CategoryRepository;
import com.sasatech.bookdodum.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
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
}
