package com.sasatech.bookdodum.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sasatech.bookdodum.entity.meeting.Meeting;
import com.sasatech.bookdodum.entity.meeting.QMeeting;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MeetingScrollQdslRepositoryImpl implements MeetingScrollQdslRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public MeetingScrollQdslRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

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
