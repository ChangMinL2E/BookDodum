package com.sasatech.bookdodum.controller;

import com.sasatech.bookdodum.repository.MeetingRepository;
import com.sasatech.bookdodum.service.meeting.MeetingService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Meet", description = "모임 관련 API")
@RestController
@RequestMapping("/meet")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MeetingController {

    private final MeetingRepository meetingRepository;
    private final MeetingService meetingService;

    @GetMapping
    public ResponseEntity<?> createMeet() {
        return null;
    }
}
