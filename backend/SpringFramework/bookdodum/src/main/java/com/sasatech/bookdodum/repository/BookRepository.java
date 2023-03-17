package com.sasatech.bookdodum.repository;

import com.sasatech.bookdodum.entity.book.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findAll();
    List<Book> findAllById(Long id);

    Book findByIsnb(String isbn);
}
