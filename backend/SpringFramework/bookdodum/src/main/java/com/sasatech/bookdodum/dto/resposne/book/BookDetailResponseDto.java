package com.sasatech.bookdodum.dto.resposne.book;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookDetailResponseDto {

    private String imageUrl;
    private String title;
    private String author;
    private String publisher;
    private String content;
}
