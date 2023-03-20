package com.sasatech.bookdodum.controller;


import com.sasatech.bookdodum.dto.request.book.BookRequestDto;
import com.sasatech.bookdodum.dto.resposne.api.ApiResponseDto;
import com.sasatech.bookdodum.dto.resposne.book.BookResponseDto;
import com.sasatech.bookdodum.service.book.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Tag(name = "Book", description = "도서 관련 API")
@RestController
@RequestMapping("/book")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @GetMapping("/list")
    @Operation(summary = "책 리스트 조회")
    public ResponseEntity<?> listBook() {
        bookService.listBook();
        return new ResponseEntity(new ApiResponseDto(true, "addBook Success", null), HttpStatus.OK);
    }

    @GetMapping("/isbn")
    @Operation(summary = "ISBN 조회")
    public ResponseEntity<?> readIsbn(@RequestParam("path") String path) {
        return new ResponseEntity(new ApiResponseDto(true, "readIsbn Success", bookService.readIsbn(path)), HttpStatus.OK);
    }

    @PostMapping("/{bookid}")
    @Operation(summary = "읽는 책 등록")
    public ResponseEntity<?> addBook(@PathVariable("bookid") Long id) {
        bookService.addBook(id);
        return new ResponseEntity(new ApiResponseDto(true, "readIsbn Success", null), HttpStatus.OK);
    }


    @DeleteMapping("/{bookid}")
    @Operation(summary = "등록한 책 삭제")
    public ResponseEntity<?> deleteBook(@PathVariable("bookid") Long id) {
        bookService.addBook(id);
        return new ResponseEntity(new ApiResponseDto(true, "deleteBook Success", null), HttpStatus.OK);
    }

    @PutMapping("/{bookid}")
    @Operation(summary = "다 읽은 책 update")
    public ResponseEntity<?> finishBook(@PathVariable("bookid") Long id) {
        bookService.addBook(id);
        return new ResponseEntity(new ApiResponseDto(true, "finishBook Success", null), HttpStatus.OK);
    }
}




//    @GetMapping("/test")
//    public ResponseEntity<?> test() {
//        bookService.convertCategory();
//        return null;
//    }