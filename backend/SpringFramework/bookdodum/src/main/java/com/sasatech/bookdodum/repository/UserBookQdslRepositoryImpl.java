package com.sasatech.bookdodum.repository;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.DateTimePath;
import com.querydsl.core.types.dsl.StringPath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sasatech.bookdodum.entity.book.QCategory;
import com.sasatech.bookdodum.entity.meeting.QComment;
import com.sasatech.bookdodum.entity.user.QUserBook;
import com.sasatech.bookdodum.entity.user.UserBook;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public class UserBookQdslRepositoryImpl implements UserBookQdslRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public UserBookQdslRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<UserBook> findUserBook(Long userId, Boolean fin) {
        QUserBook userBook = QUserBook.userBook;

        DateTimePath<Date> startTime = userBook.startTime;
        DateTimePath<Date> endTime = userBook.endTime;

        // 다 읽은 책이면
        if (fin) {
            System.out.println("다 읽은 책!");
            return jpaQueryFactory.selectFrom(userBook)
                    .where(userBook.user.id.eq(userId), startTime.ne(endTime))
                    .fetch();
        } else {
            System.out.println("다 읽지 않은 책!");
            return jpaQueryFactory.selectFrom(userBook)
                    .where(userBook.user.id.eq(userId), startTime.eq(endTime))
                    .fetch();
        }
    }

    public List<UserBook> findUserByReadWith(Long bookId, Long userId) {
        QUserBook userBook = QUserBook.userBook;
        // userBook 테이블에서 아직 책을 읽고있는 (endTime 과 startTime 이 다른..),
        // 나의 bookId 와 같은 row들을 구하자.
        // 그 row 에서 userId만 뽑아서 return 하셈 ㅋㅋ

        DateTimePath<Date> startTime = userBook.startTime;
        DateTimePath<Date> endTime = userBook.endTime;

        return jpaQueryFactory.selectFrom(userBook)
                .where(userBook.book.id.eq(bookId), startTime.eq(endTime))
                .fetch();
    }
}
