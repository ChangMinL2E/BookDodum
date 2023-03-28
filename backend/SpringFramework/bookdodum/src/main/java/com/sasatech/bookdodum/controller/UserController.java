package com.sasatech.bookdodum.controller;

import com.sasatech.bookdodum.dto.jwt.SignInResultDto;
import com.sasatech.bookdodum.dto.request.user.UserLoginRequestDto;
import com.sasatech.bookdodum.dto.request.user.UserSignupRequestDto;
import com.sasatech.bookdodum.dto.resposne.api.ApiResponseDto;
import com.sasatech.bookdodum.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@Tag(name = "User", description = "회원 관련 API")
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    @Operation(summary = "회원가입")
    public ResponseEntity<ApiResponseDto> signUp(@RequestBody UserSignupRequestDto userRequestDto){
        LOGGER.info("[signUp] 회원가입을 수행합니다. user_id : {}, password : ****, name : {}", userRequestDto.getUserid(), userRequestDto.getPassword(), userRequestDto.getName());
        userService.signUp(userRequestDto.getUserid(), userRequestDto.getPassword(),
                                                                userRequestDto.getName());
        return new ResponseEntity(new ApiResponseDto(true, "User registered successfully@", null), HttpStatus.CREATED);

    }
    @PostMapping("/signin")
    @Operation(summary = "로그인")
    public SignInResultDto signIn(@RequestBody UserLoginRequestDto userLoginDto){
        LOGGER.info("[signIn] 로그인을 시도하고 있습니다. id : {}, pw : ****", userLoginDto.getUserid());
        SignInResultDto signInResultDto = userService.signIn(userLoginDto.getUserid(), userLoginDto.getPassword());

        if(signInResultDto.getCode() == 0){
            LOGGER.info("[signIn] 정상적으로 로그인되었습니다. id : {}, token : {}", userLoginDto.getUserid(), signInResultDto.getToken());

        }else{

        }
        return signInResultDto;
    }

    //닉네임 중복 체크
    @GetMapping("/checkName")
    @Operation(summary = "닉네임 중복체크")
    public ResponseEntity<?> CheckName(@RequestParam String name){
        boolean result = userService.checkName(name);
        //값 존재 = true, 값 없음 = false
        if(result){
            return new ResponseEntity(new ApiResponseDto(true,"exist Name", result),HttpStatus.OK);
        }else{
            return new ResponseEntity(new ApiResponseDto(true,"not exist Name", result),HttpStatus.OK);
        }
    }

    //아이디 중복 체크
    @GetMapping("/checkUserid")
    @Operation(summary = "내 독서중/완 목록조회")
    public ResponseEntity<?> CheckUserid(@RequestParam String userid){
        boolean result = userService.checkUserid(userid);
        //값 존재 = true, 값 없음 = false
        if(result){
            return new ResponseEntity(new ApiResponseDto(true,"exist Name", result),HttpStatus.OK);
        }else{
            return new ResponseEntity(new ApiResponseDto(true,"not exist Name", result),HttpStatus.OK);
        }
    }



    //회원탈퇴 구현 중
    @DeleteMapping("/")
    @Operation(summary = "회원탈퇴")
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
