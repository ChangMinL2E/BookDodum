package com.sasatech.bookdodum.repository;

import com.sasatech.bookdodum.entity.meeting.UserMeeting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserMeetingRepository extends JpaRepository<UserMeeting, Long> {
    UserMeeting findByUser_Id(Long userId);
    UserMeeting findByMeeting_Id(Long meetingId);
    UserMeeting findByMeeting_IdAndUser_Id(Long meetingId, Long id);

    List<UserMeeting> findAllByUser_Id(Long id);
}
