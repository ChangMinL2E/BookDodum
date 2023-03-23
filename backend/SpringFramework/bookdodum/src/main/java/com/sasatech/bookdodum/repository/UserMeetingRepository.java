package com.sasatech.bookdodum.repository;

import com.sasatech.bookdodum.entity.meeting.UserMeeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserMeetingRepository extends JpaRepository<UserMeeting, Long> {
    UserMeeting findByUser_Id(Long userId);
    UserMeeting findByMeeting_Id(Long meetingId);
    UserMeeting findByMeeting_IdAndUser_Id(Long meetingId, Long id);
}
