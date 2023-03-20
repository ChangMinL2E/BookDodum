package com.sasatech.bookdodum.dto.request.user;

import com.sasatech.bookdodum.dto.user.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDto {
    private long id;

    private String user_id; //아이디
    private String password; //비밀번호

    private String name; //닉네임

    //아래 부분 제거
    private String email;

    private int age;
    private Gender gender;
}
