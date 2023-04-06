package com.sasatech.bookdodum.dto.resposne.book;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookDataResponseDto {

    private String title;
    private String image_url;
    private String author;
    private String publisher;
    private String isbn;
    private String category;
    private String content;
}
