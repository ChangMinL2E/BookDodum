package com.sasatech.bookdodum.repository;

import com.sasatech.bookdodum.entity.book.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}