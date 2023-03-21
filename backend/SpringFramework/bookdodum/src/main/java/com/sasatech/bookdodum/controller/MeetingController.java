package com.sasatech.bookdodum.controller;

import com.sasatech.bookdodum.dto.request.meeting.MeetingRequestDto;
import com.sasatech.bookdodum.repository.MeetingRepository;
import com.sasatech.bookdodum.service.meeting.MeetingService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Meet", description = "모임 관련 API")
@RestController
@RequestMapping("/meet")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MeetingController {

    private final MeetingRepository meetingRepository;
    private final MeetingService meetingService;

    @PostMapping("/")
    public ResponseEntity<?> createMeeting(@RequestBody MeetingRequestDto meetRequestDto) {

        meetingService.createMeet(meetRequestDto);

        return null;
    }
}
