package com.sasatech.bookdodum.repository;

import com.sasatech.bookdodum.entity.book.Book;
import com.sasatech.bookdodum.entity.user.User;
import com.sasatech.bookdodum.entity.user.UserBook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserBookRepository extends JpaRepository<UserBook, Long> {

    boolean deleteByBook_IdAndUser_Id(Long bookId, Long userId);

    List<UserBook> findAllByUser_Id(Long id);

    UserBook findByBook_IdAndUser_Id(Long bookId, Long userId);

    List<UserBook> findByBook_Id(long bookId);
}
