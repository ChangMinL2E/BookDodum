package com.sasatech.bookdodum.repository;

import com.sasatech.bookdodum.entity.meeting.Meeting;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeetingScrollQdslRepository {

    List<Meeting> findNoOffsetMeetingPaging(Pageable pageable, Long idx);
}
