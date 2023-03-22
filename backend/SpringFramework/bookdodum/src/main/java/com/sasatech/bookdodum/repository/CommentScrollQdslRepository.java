package com.sasatech.bookdodum.repository;

import com.sasatech.bookdodum.entity.meeting.Comment;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentScrollQdslRepository {

    List<Comment> findNoOffsetCommentPaging(Pageable pageable, Long idx, Long meetingId);
}
