package com.sasatech.bookdodum.controller;


import com.sasatech.bookdodum.dto.request.book.BookRequestDto;
import com.sasatech.bookdodum.dto.resposne.api.ApiResponseDto;
import com.sasatech.bookdodum.dto.resposne.book.BookResponseDto;
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

    @GetMapping("/")
    public ResponseEntity<?> listBook() {
        bookService.listBook();
        return new ResponseEntity(new ApiResponseDto(true, "addBook Success", null), HttpStatus.OK);
    }

    @GetMapping("/isbn")
    public ResponseEntity<?> readIsbn(@RequestParam("path") String path) {
        return new ResponseEntity(new ApiResponseDto(true, "readIsbn Success", bookService.readIsbn(path)), HttpStatus.OK);
    }

    @PostMapping("/isbn/{bookid}")
    public ResponseEntity<?> addBook(@PathVariable("bookid") Long id) {
        System.out.println(id);
        bookService.addBook(id);
        return new ResponseEntity(new ApiResponseDto(true, "readIsbn Success", null), HttpStatus.OK);
    }
}




//    @GetMapping("/test")
//    public ResponseEntity<?> test() {
//        bookService.convertCategory();
//        return null;
//    }