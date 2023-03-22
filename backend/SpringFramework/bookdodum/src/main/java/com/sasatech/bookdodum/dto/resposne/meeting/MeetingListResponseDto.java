package com.sasatech.bookdodum.dto.resposne.meeting;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MeetingListResponseDto {
    private String title;
    private String content;
    private String userName;
    private Long commentCnt;
    private String imageUrl;
    private String userImageUrl;

}
