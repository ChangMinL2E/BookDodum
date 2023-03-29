package com.sasatech.bookdodum.controller;

import com.sasatech.bookdodum.dto.request.meeting.CommentRequestDto;
import com.sasatech.bookdodum.dto.request.meeting.MeetingRequestDto;
import com.sasatech.bookdodum.dto.resposne.api.ApiResponseDto;
import com.sasatech.bookdodum.entity.user.User;
import com.sasatech.bookdodum.repository.MeetingRepository;
import com.sasatech.bookdodum.service.meeting.MeetingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
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
    public ResponseEntity<?> createMeeting(@RequestBody MeetingRequestDto meetingRequestDto,
                                           @Parameter(hidden = true)
                                           @AuthenticationPrincipal User user) {

        System.out.println(meetingRequestDto.getBookId());

        if (meetingService.createMeeting(meetingRequestDto, user)) {
            return new ResponseEntity(new ApiResponseDto(true, "createMeeting Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "createMeeting Fail (이미 생성한 모임이 있습니다.)", null), HttpStatus.OK);
        }
    }


    @PostMapping("/join/{meetingid}")
    @Operation(summary = "모임 참여")
    public ResponseEntity<?> joinMeeting(@PathVariable("meetingid") Long meetingId,
                                         @Parameter(hidden = true)
                                         @AuthenticationPrincipal User user) {
        System.out.println(meetingId);
        if (meetingService.joinMeeting(meetingId, user)) {
            return new ResponseEntity(new ApiResponseDto(true, "joinMeeting Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "joinMeeting Fail(중복참여 불가능)", null), HttpStatus.OK);
        }
    }

    @GetMapping("/join")
    @Operation(summary = "참여중인 모임 목록 조회")
    public ResponseEntity<?> listMyMeeting(
            @RequestParam(value = "idx", defaultValue = "0") long idx,
            @Parameter(hidden = true)
            @PageableDefault(size = 7, sort = "idx", direction = Sort.Direction.ASC) Pageable pageable,
            @Parameter(hidden = true)
            @AuthenticationPrincipal User user) {

        // 최초 로딩시점
        if (idx == 0) {
            idx = Long.MAX_VALUE;
        }

        // userMeeting 테이블에서 내가 참여중인 meeting 만 찾아오자
        return new ResponseEntity(new ApiResponseDto(true, "listMyMeeting Success", meetingService.listMyMeeting(pageable, idx, user.getId())), HttpStatus.OK);
    }


    // 무한 스크롤
    @GetMapping
    @Operation(summary = "모임 목록/책 기준 조회")
    public ResponseEntity<?> listMeeting(
            @RequestParam(value = "idx", defaultValue = "0") Long idx,
            @RequestParam(value = "bookid", defaultValue = "-1") Long bookId,
            @Parameter(hidden = true)
            @PageableDefault(size = 7, sort = "idx", direction = Sort.Direction.ASC) Pageable pageable) {

        // 최초 로딩시점
        if (idx == 0) {
            idx = Long.MAX_VALUE;
        }

        return new ResponseEntity(new ApiResponseDto(true, "readListMeeting Success", meetingService.listMeeting(pageable, idx, bookId)), HttpStatus.OK);
    }


    @PostMapping("/comment")
    @Operation(summary = "모임 댓글 생성")
    public ResponseEntity<?> createComment(@RequestBody CommentRequestDto commentRequestDto,
                                           @Parameter(hidden = true)
                                           @AuthenticationPrincipal User user) {

        if (meetingService.createComment(commentRequestDto, user)) {
            return new ResponseEntity(new ApiResponseDto(true, "createComment Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "createComment Fail", null), HttpStatus.OK);
        }
    }


    @GetMapping("/comment/authority/{meetingid}")
    @Operation(summary = "댓글 작성 권한 확인")
    public ResponseEntity<?> authorityCheck(@PathVariable("meetingid") Long meetingId,
                                            @Parameter(hidden = true)
                                            @AuthenticationPrincipal User user) {
        if (meetingService.authorityCheck(meetingId, user.getId())) {
            return new ResponseEntity(new ApiResponseDto(true, "authorityCheck true", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "authorityCheck false", null), HttpStatus.OK);
        }
    }


    // 무한 스크롤
    @GetMapping("/comment")
    @Operation(summary = "모임 댓글 목록 조회")
    public ResponseEntity<?> listComment(
            @RequestParam(value = "idx", defaultValue = "0") long idx,
            @RequestParam("id") long meetingId,
            @Parameter(hidden = true)
            @PageableDefault(size = 7, sort = "idx", direction = Sort.Direction.ASC) Pageable pageable) {

        // 최초 로딩시점
        if (idx == 0) {
            idx = Long.MIN_VALUE;
        }

        return new ResponseEntity(new ApiResponseDto(true, "readListMeeting Success", meetingService.listComment(pageable, idx, meetingId)), HttpStatus.OK);
    }
}
