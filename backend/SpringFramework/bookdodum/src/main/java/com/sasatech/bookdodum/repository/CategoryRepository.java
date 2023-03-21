package com.sasatech.bookdodum.repository;

import com.sasatech.bookdodum.entity.book.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findAllByBook_Id(Long bookId);
}