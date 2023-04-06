package com.sasatech.bookdodum.entity.meeting;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserMeeting is a Querydsl query type for UserMeeting
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserMeeting extends EntityPathBase<UserMeeting> {

    private static final long serialVersionUID = 1262491783L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserMeeting userMeeting = new QUserMeeting("userMeeting");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QMeeting meeting;

    public final com.sasatech.bookdodum.entity.user.QUser user;

    public QUserMeeting(String variable) {
        this(UserMeeting.class, forVariable(variable), INITS);
    }

    public QUserMeeting(Path<? extends UserMeeting> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserMeeting(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserMeeting(PathMetadata metadata, PathInits inits) {
        this(UserMeeting.class, metadata, inits);
    }

    public QUserMeeting(Class<? extends UserMeeting> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.meeting = inits.isInitialized("meeting") ? new QMeeting(forProperty("meeting"), inits.get("meeting")) : null;
        this.user = inits.isInitialized("user") ? new com.sasatech.bookdodum.entity.user.QUser(forProperty("user")) : null;
    }

}

