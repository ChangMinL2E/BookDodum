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
    private Long meetingId;
    private String title;
    private String content;
    private String leaderUserName;
    private Long leaderUserId;
    private Long commentCnt;
    private String imageUrl;
//    private String userImageUrl;

}
