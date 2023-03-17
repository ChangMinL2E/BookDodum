package com.sasatech.bookdodum.dto.resposne.book;

import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Builder
public class BookResponseDto {

    private Long id;
    private String title;
    private String author;
    private String publisher;
    private String imageUrl;
    private String isbn;
    private String siteUrl;
    private String content;
    private String category;
}
