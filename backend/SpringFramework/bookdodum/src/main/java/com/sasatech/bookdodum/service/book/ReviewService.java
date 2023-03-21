package com.sasatech.bookdodum.service.book;

import com.sasatech.bookdodum.dto.request.book.ReviewRequestDto;
import com.sasatech.bookdodum.entity.book.Review;
import com.sasatech.bookdodum.entity.user.User;
import com.sasatech.bookdodum.entity.user.UserBook;
import com.sasatech.bookdodum.repository.ReviewRepository;
import com.sasatech.bookdodum.repository.UserBookRepository;
import com.sasatech.bookdodum.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final UserBookRepository userBookRepository;


    public boolean createReview(ReviewRequestDto reviewRequestDto) {
        User user = userRepository.findById(1L).orElseThrow();
        Long userId = user.getId();
        Long bookId = reviewRequestDto.getBookId();

        try {
            UserBook userBook = userBookRepository.findByBook_IdAndUser_Id(bookId, userId);

            reviewRepository.save(Review.builder()
                    .imageUrl(reviewRequestDto.getImageURL())
                    .userBook(userBook)
                    .user(user)
                    .build());

            return true;
        } catch (Exception e) {
            e.printStackTrace();

            return false;
        }
    }
}
