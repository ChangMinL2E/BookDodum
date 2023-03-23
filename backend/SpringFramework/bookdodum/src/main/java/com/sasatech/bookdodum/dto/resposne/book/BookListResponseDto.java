package com.sasatech.bookdodum.dto.resposne.book;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookListResponseDto {
    private Long bookId;
    private String imageUrl;
    private String title;
    private String publisher;
    private List<String> category;
}
