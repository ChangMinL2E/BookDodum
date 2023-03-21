package com.sasatech.bookdodum.service.meeting;


import com.sasatech.bookdodum.dto.request.meeting.MeetingRequestDto;
import com.sasatech.bookdodum.entity.book.Book;
import com.sasatech.bookdodum.entity.group.Meeting;
import com.sasatech.bookdodum.repository.BookRepository;
import com.sasatech.bookdodum.repository.MeetingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final BookRepository bookRepository;

    public void createMeet(MeetingRequestDto meetingRequestDto) {

        Book book = bookRepository.findById(meetingRequestDto.getBookId()).orElseThrow();

        meetingRepository.save(Meeting.builder()
                .book(book)
                .name(meetingRequestDto.getName())
                .content(meetingRequestDto.getContent())
                .authority(meetingRequestDto.isAuthority())
                .build());
    }
}
