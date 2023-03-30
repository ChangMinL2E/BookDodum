package com.sasatech.bookdodum.dto.resposne.review;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewListResponseDto {
    private Long reviewId;
    private String content;
}
