package com.sasatech.bookdodum.service.meeting;


import com.sasatech.bookdodum.dto.request.meeting.CommentRequestDto;
import com.sasatech.bookdodum.dto.request.meeting.MeetingRequestDto;
import com.sasatech.bookdodum.dto.resposne.meeting.MeetingListResponseDto;
import com.sasatech.bookdodum.entity.book.Book;
import com.sasatech.bookdodum.entity.meeting.Comment;
import com.sasatech.bookdodum.entity.meeting.Meeting;
import com.sasatech.bookdodum.entity.meeting.UserMeeting;
import com.sasatech.bookdodum.entity.user.User;
import com.sasatech.bookdodum.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MeetingService {
    private final MeetingRepository meetingRepository;
    private final MeetingScrollQdslRepositoryImpl meetingScrollQdslRepositoryImpl;
    private final UserMeetingRepository userMeetingRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final CommentRepository commentRepository;


    public boolean createMeeting(MeetingRequestDto meetingRequestDto) {
        User user = userRepository.findById(1L).orElseThrow();
        Book book = bookRepository.findById(meetingRequestDto.getBookId()).orElseThrow();

        Long userId = user.getId();

        UserMeeting userMeeting = userMeetingRepository.findByUser_Id(userId);
        userMeeting.getUser().getId();
        // 이미 유저가 만든 책 모임이 있는 경우
        if (userMeeting.getUser().getId() == userId) {
            return false;
        }


        Meeting meeting = meetingRepository.save(Meeting.builder()
                .title(meetingRequestDto.getTitle())
                .content(meetingRequestDto.getContent())
                .authority(meetingRequestDto.isAuthority())
                .book(book)
                .build());

        userMeetingRepository.save(UserMeeting.builder()
                .meeting(meeting)
                .user(user)
                .build());

        return true;
    }

    public List<MeetingListResponseDto> listMeeting(Pageable pageable, Long idx) {
        List<Meeting> meetingList = meetingScrollQdslRepositoryImpl.findNoOffsetMeetingPaging(pageable, idx);
        List<MeetingListResponseDto> dtoList = new ArrayList<>();

        for (Meeting meeting : meetingList) {
            UserMeeting userMeeting = userMeetingRepository.findByMeeting_Id(meeting.getId());
            User user = userMeeting.getUser();

            Long commentCnt = (long) commentRepository.findAllByMeeting_Id(meeting.getId()).size();

            dtoList.add(MeetingListResponseDto.builder()
                    .title(meeting.getTitle())
                    .content(meeting.getContent())
                    .userName(user.getName())
                    .commentCnt(commentCnt)
                    .imageUrl(meeting.getBook().getImageUrl())
                    .userImageUrl(null)
                    .build());
        }

        return dtoList;
    }

    public boolean createComment(CommentRequestDto commentRequestDto) {
        User user = userRepository.findById(1L).orElseThrow();

        Meeting meeting = meetingRepository.findById(commentRequestDto.getMeetingId()).orElseThrow();

        try {
            commentRepository.save(Comment.builder()
                    .meeting(meeting)
                    .content(commentRequestDto.getContent())
                    .user(user)
                    .build());

            return true;
        } catch (Exception e) {
            e.printStackTrace();

            return false;
        }
    }
}
