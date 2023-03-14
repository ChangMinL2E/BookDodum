package com.sasatech.bookdodum.service;

import com.sasatech.bookdodum.dto.request.user.UserRequestDto;
import com.sasatech.bookdodum.entity.user.User;
import com.sasatech.bookdodum.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class UserService {
    private UserRepository userRepository;
    public boolean addUser(UserRequestDto userRequestDto) {
        userRepository.save(User.builder()
                .id(userRequestDto.getId())
                .name(userRequestDto.getName())
                .email(userRequestDto.getEmail())
                .age(userRequestDto.getAge())
                .gender(userRequestDto.getGender())
                .build()
        );
        return true;
    }
}
