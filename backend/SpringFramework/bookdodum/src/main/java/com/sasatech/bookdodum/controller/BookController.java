package com.sasatech.bookdodum.controller;


import com.sasatech.bookdodum.dto.request.book.BookRequestDto;
import com.sasatech.bookdodum.dto.resposne.api.ApiResponseDto;
import com.sasatech.bookdodum.service.book.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/book")
@RequiredArgsConstructor
// @SecurityRequirement(name = "bearerAuth")
// @Tag(name = "도서 API")
public class BookController {
    private final BookService bookService;

    @PostMapping("/")
    public ResponseEntity<?> addBook(@RequestBody BookRequestDto bookRequestDto) {
        bookService.addBook(bookRequestDto);
        return new ResponseEntity(new ApiResponseDto(true, "addBook Success", null), HttpStatus.OK);
    }
    //isbn코드가 넘어오고 DB에서 책을 조회한 다음 내 책에 등록

    @GetMapping("/")
    public ResponseEntity<?> listBook() {
        bookService.listBook();
        return new ResponseEntity(new ApiResponseDto(true, "addBook Success", null), HttpStatus.OK);
    }

    @GetMapping("/isbn")
    public ResponseEntity<?> test(@RequestParam("path") String path) {
        System.out.println(path);
        bookService.readIsbn(path);
        return null;
    }
}




//    @GetMapping("/test")
//    public ResponseEntity<?> test() {
//        bookService.convertCategory();
//        return null;
//    }