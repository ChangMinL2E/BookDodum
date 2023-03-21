package com.sasatech.bookdodum.dto.request.meeting;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MeetingRequestDto {

    private Long bookId;
    private String title;
    private String content;
    private boolean authority;
}
