package com.sasatech.bookdodum.controller;


import com.sasatech.bookdodum.dto.request.book.BookRequestDto;
import com.sasatech.bookdodum.dto.request.book.PapagoRequestDto;
import com.sasatech.bookdodum.dto.request.book.BookConvertRequestDto;
import com.sasatech.bookdodum.dto.request.book.ReviewRequestDto;
import com.sasatech.bookdodum.dto.resposne.api.ApiResponseDto;
import com.sasatech.bookdodum.entity.user.User;
import com.sasatech.bookdodum.service.book.BookService;
import com.sasatech.bookdodum.service.book.ReviewService;
import com.sasatech.bookdodum.service.book.TranslationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@Tag(name = "Book", description = "도서 관련 API")
@RestController
@RequestMapping("/book")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;
    private final ReviewService reviewService;


    @GetMapping("/list/{fin}")
    @Operation(summary = "내 독서중/완 목록조회")
    public ResponseEntity<?> listBook(@PathVariable("fin") boolean fin,
                                      @Parameter(hidden = true)
                                      @AuthenticationPrincipal User user) {
        return new ResponseEntity(new ApiResponseDto(true, "listBook Success", bookService.listBook(user.getId(), fin)), HttpStatus.OK);
    }


    @GetMapping("/list")
    @Operation(summary = "내 독서 전체 목록 조회")
    public ResponseEntity<?> listAllBook(@Parameter(hidden = true)
                                         @AuthenticationPrincipal User user) {
        return new ResponseEntity(new ApiResponseDto(true, "listAllBook Success", bookService.listAllBook(user.getId())), HttpStatus.OK);
    }



    @Operation(summary = "내 도서 상세조회")
    public ResponseEntity<?> detailBook(@RequestParam("bookid") Long bookId,
                                        @Parameter(hidden = true)
                                        @AuthenticationPrincipal User user) {

        return new ResponseEntity(new ApiResponseDto(true, "detailBook Success", bookService.detailBook(bookId, user.getId())), HttpStatus.OK);
    }

    @GetMapping("/isbn")
    @Operation(summary = "ISBN 조회")
    public ResponseEntity<?> readIsbn(@RequestParam("path") String path) {
        return new ResponseEntity(new ApiResponseDto(true, "readIsbn Success", bookService.readIsbn(path)), HttpStatus.OK);
    }

    //isbn 직접 입력하여 책 조회

    @PostMapping("/{bookid}")
    @Operation(summary = "읽는 도서 등록")
    public ResponseEntity<?> addBook(@PathVariable("bookid") Long id,
                                     @Parameter(hidden = true)
                                     @AuthenticationPrincipal User user) {
        if (bookService.addBook(id, user.getId())){
            return new ResponseEntity(new ApiResponseDto(true, "addBook Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "addBook Fail(이미 등록한 책입니다.)", null), HttpStatus.OK);
        }
    }


    @GetMapping("/readwith/{bookid}")
    @Operation(summary = "이 책을 읽고 있는 사람 목록 조회")
    public ResponseEntity<?> listReadWith(@PathVariable("bookid") Long bookId,
                                          @Parameter(hidden = true)
                                          @AuthenticationPrincipal User user) {
        if(bookService.existReadWith(bookId, user.getId())){
            return new ResponseEntity(new ApiResponseDto(true, "listReadWith Success", bookService.listReadWith(bookId, user.getId())), HttpStatus.OK);
        }else{
            return new ResponseEntity(new ApiResponseDto(false, "not exist readwith",null), HttpStatus.OK);
        }

    }

    //없으면 500error말고 다른 명시적인 값 리턴 필요


    @DeleteMapping("/{bookid}")
    @Operation(summary = "등록 도서 삭제")
    public ResponseEntity<?> deleteBook(@PathVariable("bookid") Long id,
                                        @Parameter(hidden = true)
                                        @AuthenticationPrincipal User user) {
        bookService.deleteBook(id, user.getId());
        return new ResponseEntity(new ApiResponseDto(true, "deleteBook Success", null), HttpStatus.OK);
    }

    @PutMapping("/{bookid}")
    @Operation(summary = "다 읽은 도서 갱신")
    public ResponseEntity<?> finishBook(@PathVariable("bookid") Long id,
                                        @Parameter(hidden = true)
                                        @AuthenticationPrincipal User user) {
        if (bookService.finishBook(id, user.getId())) {
            return new ResponseEntity(new ApiResponseDto(true, "finishBook Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(true, "finishBook Fail", null), HttpStatus.OK);
        }
    }


    @PutMapping("/conversion")
    @Operation(summary = "책 표지 변환 저장")
    public ResponseEntity<?> convertBook(@RequestBody BookConvertRequestDto bookConvertRequestDto,
                                         @Parameter(hidden = true)
                                         @AuthenticationPrincipal User user) {
        if (bookService.convertBook(bookConvertRequestDto, user.getId())) {
            return new ResponseEntity(new ApiResponseDto(true, "convertBook Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(true, "convertBook Fail", null), HttpStatus.OK);
        }
    }

    @GetMapping("/search")
    @Operation(summary = "도서관 isbn 도서정보")
    public ResponseEntity<?> searchBook(@RequestParam String isbn){
        if(bookService.searchBook(isbn)){
            return new ResponseEntity(new ApiResponseDto(true, "searchBook Success", bookService.infoBook(isbn)), HttpStatus.OK);
        }else{
            return new ResponseEntity(new ApiResponseDto(false, "NotexistBook", null), HttpStatus.OK);
        }

    }

//    @GetMapping("/recommand")
//    public ResponseEntity<?> recommandBook(@RequestParam long bookId,
//                                           @AuthenticationPrincipal User user){
//
//        return new ResponseEntity(new ApiResponseDto(true,"recommandBook",bookService.recommandBook(bookId, user.getId())),HttpStatus.OK);
//
//    }


    // ====================================== feature/review ===========================================

    @PostMapping("/review")
    @Operation(summary = "독후감 등록")
    public ResponseEntity<?> createReview(@RequestBody ReviewRequestDto reviewRequestDto,
                                          @Parameter(hidden = true)
                                          @AuthenticationPrincipal User user) {

        if (reviewService.createReview(reviewRequestDto, user.getId())) {
            return new ResponseEntity(new ApiResponseDto(true, "createReview Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "createReview Fail", null), HttpStatus.OK);
        }
    }

    @PostMapping("/papago")
    @Operation(summary = "독후감 목록 조회")
    public String getEnglish(@RequestBody PapagoRequestDto papagoRequestDto) throws IOException {
        String Eng = TranslationService.getEnglish(papagoRequestDto.getKorean());

        return Eng;
    }


    @GetMapping("/review")
    @Operation(summary = "독후감 목록 조회")
    private ResponseEntity<?> listReview(
            @Parameter(hidden = true)
            @AuthenticationPrincipal User user) {
        return new ResponseEntity(new ApiResponseDto(true, "listReview Success", reviewService.listReview(user.getId())), HttpStatus.OK);
    }


    @DeleteMapping("/review/{reviewid}")
    @Operation(summary = "독후감 삭제")
    public ResponseEntity<?> deleteReview(@PathVariable("reviewid") Long reviewId) {
        if (reviewService.deleteReview(reviewId)) {
            return new ResponseEntity(new ApiResponseDto(true, "deleteReview Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "deleteReview Fail", null), HttpStatus.OK);
        }
    }



}




//    @GetMapping("/test")
//    public ResponseEntity<?> test() {
//        bookService.convertCategory();
//        return null;
//    }