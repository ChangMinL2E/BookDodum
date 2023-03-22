package com.sasatech.bookdodum.controller;

import com.sasatech.bookdodum.dto.request.meeting.CommentRequestDto;
import com.sasatech.bookdodum.dto.request.meeting.MeetingRequestDto;
import com.sasatech.bookdodum.dto.resposne.api.ApiResponseDto;
import com.sasatech.bookdodum.repository.MeetingRepository;
import com.sasatech.bookdodum.service.meeting.MeetingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Meet", description = "모임 관련 API")
@RestController
@RequestMapping("/meeting")
@RequiredArgsConstructor
public class MeetingController {

    private final MeetingRepository meetingRepository;
    private final MeetingService meetingService;

    @PostMapping
    @Operation(summary = "모임 생성")
    public ResponseEntity<?> createMeeting(@RequestBody MeetingRequestDto meetRequestDto) {

        if (meetingService.createMeeting(meetRequestDto)) {
            return new ResponseEntity(new ApiResponseDto(true, "createMeeting Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "createMeeting Fail (이미 생성한 모임이 있습니다.)", null), HttpStatus.OK);
        }
    }

    // 무한 스크롤
    @GetMapping
    @Operation(summary = "모임 목록 조회")
    public ResponseEntity<?> listMeeting(
            @RequestParam(value = "idx", defaultValue = "0") long idx,
            @PageableDefault(size = 5, sort = "idx", direction = Sort.Direction.ASC) Pageable pageable) {

        System.out.println(idx);

        // 최초 로딩시점
        if (idx == 0) {
            idx = Long.MAX_VALUE;
        }

        return new ResponseEntity(new ApiResponseDto(true, "readListMeeting Success", meetingService.listMeeting(pageable, idx)), HttpStatus.OK);
    }


    @PostMapping("/comment")
    @Operation(summary = "모임 댓글 생성")
    public ResponseEntity<?> createComment(@RequestBody CommentRequestDto commentRequestDto) {

        if (meetingService.createComment(commentRequestDto)) {
            return new ResponseEntity(new ApiResponseDto(true, "createComment Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "createComment Fail", null), HttpStatus.OK);
        }
    }
}
