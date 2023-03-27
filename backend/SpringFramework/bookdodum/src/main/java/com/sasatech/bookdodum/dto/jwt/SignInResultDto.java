package com.sasatech.bookdodum.dto.jwt;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class SignInResultDto extends SignUpResultDto{

    private String token;
    private String userid;
    private String name;



}
