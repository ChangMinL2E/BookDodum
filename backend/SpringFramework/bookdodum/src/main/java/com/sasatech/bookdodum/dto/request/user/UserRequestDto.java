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
    private String name;
    private String email;
    private int age;
    private Gender gender;
}
