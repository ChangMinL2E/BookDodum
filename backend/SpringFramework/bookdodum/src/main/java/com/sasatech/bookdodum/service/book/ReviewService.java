package com.sasatech.bookdodum.service.book;

import com.sasatech.bookdodum.dto.request.book.ReviewRequestDto;
import com.sasatech.bookdodum.dto.resposne.review.ReviewListResponseDto;
import com.sasatech.bookdodum.entity.book.Review;
import com.sasatech.bookdodum.entity.user.User;
import com.sasatech.bookdodum.entity.user.UserBook;
import com.sasatech.bookdodum.repository.ReviewRepository;
import com.sasatech.bookdodum.repository.UserBookRepository;
import com.sasatech.bookdodum.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final UserBookRepository userBookRepository;


    public boolean createReview(ReviewRequestDto reviewRequestDto, Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        Long bookId = reviewRequestDto.getBookId();

        try {
            System.out.println(bookId + ", " + userId);

            UserBook userBook = userBookRepository.findByBook_IdAndUser_Id(bookId, userId);

            reviewRepository.save(Review.builder()
                    .content(reviewRequestDto.getContent())
                    .userBook(userBook)
                    .user(user)
                    .build());


            return true;
        } catch (Exception e) {
            e.printStackTrace();

            return false;
        }
    }

    public boolean deleteReview(Long reviewId) {
        try {
            reviewRepository.deleteById(reviewId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    public List<ReviewListResponseDto> listReview(Long userId) {
        List<Review> list = reviewRepository.findAllByUser_Id(userId);
        List<ReviewListResponseDto> dtoList = new ArrayList<>();

        for (Review review : list) {
            dtoList.add(ReviewListResponseDto.builder()
                    .content(review.getContent())
                    .build());
        }

        return dtoList;
    }
}
