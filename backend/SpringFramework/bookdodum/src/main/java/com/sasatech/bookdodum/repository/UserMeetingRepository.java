package com.sasatech.bookdodum.repository;

import com.sasatech.bookdodum.entity.group.UserMeeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserMeetingRepository extends JpaRepository<UserMeeting, Long> {
    UserMeeting findByUser_Id(Long userId);
    UserMeeting findByMeeting_Id(Long meetingId);
}
