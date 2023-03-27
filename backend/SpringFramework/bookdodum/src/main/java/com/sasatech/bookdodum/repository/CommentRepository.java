package com.sasatech.bookdodum.repository;

import com.sasatech.bookdodum.entity.meeting.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findAllByMeeting_Id(Long meetingId);
}
