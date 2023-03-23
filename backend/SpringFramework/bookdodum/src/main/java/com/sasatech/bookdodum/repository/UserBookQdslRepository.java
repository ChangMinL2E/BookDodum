package com.sasatech.bookdodum.repository;


import com.sasatech.bookdodum.entity.user.UserBook;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserBookQdslRepository {
    List<UserBook> findUserBook(Long userId, Boolean fin);

    List<UserBook> findUserByReadWith(Long bookId, Long userId);
}
