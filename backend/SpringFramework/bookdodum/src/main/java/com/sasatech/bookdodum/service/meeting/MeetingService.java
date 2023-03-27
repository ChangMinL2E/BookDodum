package com.sasatech.bookdodum.service.meeting;


import com.sasatech.bookdodum.dto.request.meeting.CommentRequestDto;
import com.sasatech.bookdodum.dto.request.meeting.MeetingRequestDto;
import com.sasatech.bookdodum.dto.resposne.meeting.CommentListResponseDto;
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
    private final CommentScrollQdslRepositoryImpl commentScrollQdslRepositoryImpl;


    public boolean createMeeting(MeetingRequestDto meetingRequestDto, User user) {

        try {
            System.out.println(meetingRequestDto.getBookId());
            Book book = bookRepository.findById(meetingRequestDto.getBookId()).orElseThrow();

            // 지금 미팅을 만드려는 유저의 미팅을 찾는다.
            List<UserMeeting> userMeetingList = userMeetingRepository.findAllByUser_Id(user.getId());

            // 미팅이 존재한다면..
            if (userMeetingList != null) {

                for (UserMeeting userMeeting : userMeetingList) {
                    Meeting meet = meetingRepository.findById(userMeeting.getMeeting().getId()).orElseThrow();

                    // 그 미팅의 주제가 되는 책(Book)을 찾는다.
                    Book meetBook = meet.getBook();

                    // 해당 모임의 책과 지금 만드려는 모임의 책이 같다면 return false
                    if (book.getId() == meetBook.getId()) {
                        return false;
                    }
                }
            }

            // validation 후에 미팅 생성
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
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    public List<MeetingListResponseDto> listMeeting(Pageable pageable, Long idx, Long bookId) {
        List<Meeting> meetingList = meetingScrollQdslRepositoryImpl.findNoOffsetMeetingPaging(pageable, idx, bookId);
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
//                    .userImageUrl(null)
                    .build());
        }

        return dtoList;
    }

    public Object listMyMeeting(Pageable pageable, long idx, Long userId) {
        List<Meeting> meetingList = meetingScrollQdslRepositoryImpl.findNoOffsetUserMeetingPaging(pageable, idx, userId);
        List<MeetingListResponseDto> dtoList = new ArrayList<>();

        for (Meeting meeting : meetingList) {
            UserMeeting userMeeting = userMeetingRepository.findByMeeting_Id(meeting.getId());
            User user = userMeeting.getUser();

            Long commentCnt = (long) commentRepository.findAllByMeeting_Id(meeting.getId()).size();

            dtoList.add(MeetingListResponseDto.builder()
                    .id(meeting.getId())
                    .title(meeting.getTitle())
                    .content(meeting.getContent())
                    .userName(user.getName())
                    .commentCnt(commentCnt)
                    .imageUrl(meeting.getBook().getImageUrl())
//                    .userImageUrl(null)
                    .build());
        }

        return dtoList;
    }



    public boolean createComment(CommentRequestDto commentRequestDto, User user) {
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

    public List<CommentListResponseDto> listComment(Pageable pageable, long idx, long meetingId) {
        List<Comment> commentList = commentScrollQdslRepositoryImpl.findNoOffsetCommentPaging(pageable, idx, meetingId);
        System.out.println(commentList.size());
        List<CommentListResponseDto> dtoList = new ArrayList<>();

        // 모임의 장 이라면, leader_content 를 가져온다. 그렇지 않으면 null 을 가져온다.
        // 모임의 장을 찾으려면 meetingId를 통해 찾는다.

        UserMeeting userMeeting = userMeetingRepository.findByMeeting_Id(meetingId);
        Meeting meeting = meetingRepository.findById(userMeeting.getMeeting().getId()).orElseThrow();

        Long leader_id = userMeeting.getUser().getId();

        for (Comment comment : commentList) {
            Long user_id = comment.getUser().getId();

            System.out.println(user_id + ", " + leader_id);

            // 해당 모임 장의 아이디와 Comment를 작성한 유저의 id가 같다면 모임의 장이다.
            if (user_id == leader_id) {
                dtoList.add(CommentListResponseDto.builder()
                        .commentId(comment.getId())
                        .userId(user_id)
                        .leader_content(meeting.getContent())
                        .content(comment.getContent())
                        .build());
            } else {
                dtoList.add(CommentListResponseDto.builder()
                        .commentId(comment.getId())
                        .userId(user_id)
                        .content(comment.getContent())
                        .build());
            }
        }

        return dtoList;
    }

    public boolean joinMeeting(Long meetingId, User user) {
        // a번 유저가 b 미팅에 참여한다.
        Meeting meeting = meetingRepository.findById(meetingId).orElseThrow();

        // 중복 참여는 불가능하다.
        if (userMeetingRepository.findByMeeting_IdAndUser_Id(meetingId, user.getId()) != null) {
            return false;
        }


        try {
            userMeetingRepository.save(UserMeeting.builder()
                    .meeting(meeting)
                    .user(user)
                    .build());

            return true;
        } catch (Exception e) {
            e.printStackTrace();

            return false;
        }
    }
}
