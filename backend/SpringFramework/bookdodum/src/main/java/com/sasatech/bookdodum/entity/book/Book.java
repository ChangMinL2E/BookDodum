package com.sasatech.bookdodum.entity.book;


import com.sasatech.bookdodum.entity.user.User;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Builder
@Table(name = "book")
@DynamicInsert
@DynamicUpdate
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String author;

    private String publisher;

    @Column(nullable = false)
    private String imageUrl;

    private String isbn;

    private String siteUrl;

    @Column(length = 6300)
    private String content;

    private String category;
}


//제목
//imgurl
//저자
//출판사
//줄거리(책소개)
//카테고리
//크롤링사이트?