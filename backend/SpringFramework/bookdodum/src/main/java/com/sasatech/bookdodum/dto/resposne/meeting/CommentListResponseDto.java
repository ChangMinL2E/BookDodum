package com.sasatech.bookdodum.dto.resposne.meeting;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentListResponseDto {
    private Long commentId;
    private Long userId;
    private String userName;
    private String leader_content;
    private String content;
}
