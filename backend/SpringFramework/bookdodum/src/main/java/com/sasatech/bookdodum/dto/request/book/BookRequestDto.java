package com.sasatech.bookdodum.dto.request.book;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookRequestDto {
    private String isbn;
    private String title;
    private String author;
    private String siteUrl;
    private String publisher;
    private String content;
    private String category;
    private String imageUrl;
}
