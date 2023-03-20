package com.sasatech.bookdodum.entity.user;

import com.sasatech.bookdodum.dto.user.Gender;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Builder
@Table(name = "user")
@DynamicInsert
@DynamicUpdate
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String user_id;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;


    //후에 아래 제거

    @Column(nullable = false)
    private String email;

    @Column(nullable = true)
    private int age;

    @Enumerated(EnumType.STRING)
    private Gender gender;
}
