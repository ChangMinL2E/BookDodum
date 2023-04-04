package com.sasatech.bookdodum.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sasatech.bookdodum.entity.meeting.Comment;
import com.sasatech.bookdodum.entity.meeting.QComment;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CommentScrollQdslRepositoryImpl implements CommentScrollQdslRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public CommentScrollQdslRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<Comment> findNoOffsetCommentPaging(Pageable pageable, Long idx, Long meetingId) {
        QComment comment = QComment.comment;

        return jpaQueryFactory.selectFrom(comment)
                .where(comment.id.gt(idx), comment.meeting.id.eq(meetingId))
                .orderBy(comment.id.asc())
                .limit(pageable.getPageSize())
                .fetch()
                ;
    }
}
