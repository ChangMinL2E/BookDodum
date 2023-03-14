package com.sasatech.bookdodum.entity.user;

import com.sasatech.bookdodum.entity.book.Book;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
public class UserBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BOOK_ID")
    private Book book;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date startTime;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date endTime;
}
