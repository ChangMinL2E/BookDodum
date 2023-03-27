package com.sasatech.bookdodum.repository;

import com.sasatech.bookdodum.entity.book.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findAllByUser_Id(Long userId);
}
