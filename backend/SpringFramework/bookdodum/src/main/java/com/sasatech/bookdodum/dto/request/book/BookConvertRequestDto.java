package com.sasatech.bookdodum.dto.request.book;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookConvertRequestDto {
    private Long bookId;
    private String convertedImageUrl;
}
