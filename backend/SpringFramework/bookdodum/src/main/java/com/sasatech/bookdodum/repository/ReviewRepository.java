package com.sasatech.bookdodum.repository;

import com.sasatech.bookdodum.entity.book.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
