package com.sasatech.bookdodum.repository;

import com.sasatech.bookdodum.entity.user.UserBook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserBookRepository extends JpaRepository<UserBook, Long> {

}
