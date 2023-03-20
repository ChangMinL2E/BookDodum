package com.sasatech.bookdodum.controller;

import com.sasatech.bookdodum.dto.jwt.SignInResultDto;
import com.sasatech.bookdodum.dto.jwt.SignUpResultDto;
import com.sasatech.bookdodum.dto.request.user.UserRequestDto;
import com.sasatech.bookdodum.dto.resposne.api.ApiResponseDto;
import com.sasatech.bookdodum.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor

public class UserController {

    private final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;
    //회원가입
//    @PostMapping("/")

//    public ResponseEntity<?> addUser(@RequestBody UserRequestDto userRequestDto) {
//        userService.addUser(userRequestDto);
//        return new ResponseEntity(new ApiResponseDto(true, "addUser Success", null), HttpStatus.OK);
//
//    }

    @PostMapping("/")
    public SignUpResultDto signUp(@RequestBody UserRequestDto userRequestDto){
        LOGGER.info("[signUp] 회원가입을 수행합니다. user_id : {}, password : ****, name : {}", userRequestDto.getUser_id(), userRequestDto.getPassword(), userRequestDto.getName());
        SignUpResultDto signUpResultDto = userService.signUp(userRequestDto.getUser_id(),
                                                                userRequestDto.getPassword(),
                                                                userRequestDto.getName());

    }
    @PostMapping("/")
    public SignInResultDto signIn(@RequestParam String user_id, @RequestParam String password){
        LOGGER.info("[signIn] 로그인을 시도하고 있습니다. id : {}, pw : ****", user_id);
        SignInResultDto signInResultDto = UserService.signIn(user_id, password);

        if(signInResultDto.getCode() == 0){
            LOGGER.info("[signIn] 정상적으로 로그인되었습니다. id : {}, token : {}", user_id, signInResultDto.getToken());
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
