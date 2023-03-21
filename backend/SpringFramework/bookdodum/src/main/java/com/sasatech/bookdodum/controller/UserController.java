package com.sasatech.bookdodum.controller;

import com.sasatech.bookdodum.dto.jwt.SignInResultDto;
import com.sasatech.bookdodum.dto.jwt.SignUpResultDto;
import com.sasatech.bookdodum.dto.request.user.UserLoginDto;
import com.sasatech.bookdodum.dto.request.user.UserRequestDto;
import com.sasatech.bookdodum.dto.resposne.api.ApiResponseDto;
import com.sasatech.bookdodum.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor

public class UserController {

    private final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    //회원가입
//    @PostMapping("/")

//    public ResponseEntity<?> addUser(@RequestBody UserRequestDto userRequestDto) {
//        userService.addUser(userRequestDto);
//        return new ResponseEntity(new ApiResponseDto(true, "addUser Success", null), HttpStatus.OK);
//
//    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponseDto> signUp(@RequestBody UserRequestDto userRequestDto){
        LOGGER.info("[signUp] 회원가입을 수행합니다. user_id : {}, password : ****, name : {}", userRequestDto.getUserid(), userRequestDto.getPassword(), userRequestDto.getName());
        userService.signUp(userRequestDto.getUserid(), userRequestDto.getPassword(),
                                                                userRequestDto.getName());
        return new ResponseEntity(new ApiResponseDto(true, "User registered successfully@", null), HttpStatus.CREATED);

    }
    @PostMapping("/signin")
    public SignInResultDto signIn(@RequestBody UserLoginDto userLoginDto){
        LOGGER.info("[signIn] 로그인을 시도하고 있습니다. id : {}, pw : ****", userLoginDto.getUserid());
        SignInResultDto signInResultDto = userService.signIn(userLoginDto.getUserid(), userLoginDto.getPassword());

        if(signInResultDto.getCode() == 0){
            LOGGER.info("[signIn] 정상적으로 로그인되었습니다. id : {}, token : {}", userLoginDto.getUserid(), signInResultDto.getToken());
        }
        return signInResultDto;
    }
    //회원탈퇴 구현 중
    @DeleteMapping("/")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
//        userService.delete(id);
//        if(userService.delete(id) == 1 ){
//            return new ResponseEntity(new ApiResponseDto(true, "deleteUser Success", null), HttpStatus.OK);
//        }else{
//            return new ResponseEntity(new ApiResponseDto(false, "deleteUser fail", null), HttpStatus.OK);
//        }
        return null;
    }


}
