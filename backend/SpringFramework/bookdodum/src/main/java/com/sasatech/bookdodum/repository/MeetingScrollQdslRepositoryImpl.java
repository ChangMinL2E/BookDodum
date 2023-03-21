package com.sasatech.bookdodum.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sasatech.bookdodum.entity.group.Meeting;
import com.sasatech.bookdodum.entity.group.QMeeting;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MeetingScrollQdslRepositoryImpl implements MeetingScrollQdslRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Meeting> findNoOffsetMeetingPaging(Pageable pageable, Long idx) {
        QMeeting meeting = QMeeting.meeting;

        return jpaQueryFactory.selectFrom(meeting)
                .where(meeting.id.lt(idx))
                .orderBy(meeting.id.desc())
                .limit(pageable.getPageSize())
                .fetch()
                ;
    }

}
