package com.sasatech.bookdodum.service.book;

import com.sasatech.bookdodum.dto.request.book.BookRequestDto;
import com.sasatech.bookdodum.dto.resposne.book.BookListResponseDto;
import com.sasatech.bookdodum.entity.book.Book;
import com.sasatech.bookdodum.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor

public class BookService {
    private BookRepository bookRepository;

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
