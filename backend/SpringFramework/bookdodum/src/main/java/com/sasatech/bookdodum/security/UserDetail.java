package com.sasatech.bookdodum.security;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDetail implements UserDetails  {

    private Long id;
    private String userid;
    private String password;
    private String name;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { //계정이 가지고 있는 권한 목록 리턴

        return null;
    }


    @Override
    public String getUsername() { //계정의 이름을 리턴

        return this.userid;
    }

    //상태 다루지 않으면 모두 true
    @Override
    public boolean isAccountNonExpired() { //계정이 만료됐는지 리턴

        return true;
    }

    @Override
    public boolean isAccountNonLocked() { //계정이 잠겨있는지 리턴

        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() { //비밀번호가 만료됐는지 리턴

        return true;
    }

    @Override
    public boolean isEnabled() { //계정이 활성화돼 있는지 리턴
        return true;
    }
}
