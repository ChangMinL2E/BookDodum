package com.sasatech.bookdodum.dto.resposne.book;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewBookDetailResponseDto {
    private String name;
    private String isbn;
    private BookDataResponseDto data;
}
