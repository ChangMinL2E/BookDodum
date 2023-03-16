package com.sasatech.bookdodum.controller;

import com.sasatech.bookdodum.dto.request.user.UserRequestDto;
import com.sasatech.bookdodum.dto.resposne.api.ApiResponseDto;
import com.sasatech.bookdodum.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    //회원가입
    @PostMapping("/")
    public ResponseEntity<?> addUser(@RequestBody UserRequestDto userRequestDto) {
        userService.addUser(userRequestDto);
        return new ResponseEntity(new ApiResponseDto(true, "addUser Success", null), HttpStatus.OK);

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
