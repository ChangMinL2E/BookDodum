package com.sasatech.bookdodum.service.user;

import com.sasatech.bookdodum.dto.jwt.SignInResultDto;
import com.sasatech.bookdodum.dto.jwt.SignUpResultDto;
import com.sasatech.bookdodum.dto.request.user.UserRequestDto;
import com.sasatech.bookdodum.entity.user.User;
import com.sasatech.bookdodum.repository.UserRepository;
import com.sasatech.bookdodum.security.JwtTokenProvider;
import com.sasatech.bookdodum.security.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class UserService {

    private final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    //로그인
    public SignInResultDto signIn(String userid, String password) {

        System.out.println(password);
        //회원 정보 요청
        User user = userRepository.findByUserid(userid);
        System.out.println(user.getPassword());

        //패스워드 비교 수행
        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new RuntimeException();
        }

        SignInResultDto signInResultDto = SignInResultDto.builder()
                .token(jwtTokenProvider.createToken(String.valueOf(user.getUserid()))).build();

        setSuccessResult(signInResultDto);

        return signInResultDto;
    }

    private void setSuccessResult(SignUpResultDto result) {
        result.setSuccess(true);
        result.setCode(CommonResponse.SUCCESS.getCode());
        result.setMsg(CommonResponse.SUCCESS.getMsg());
    }

    private void setFailResult(SignUpResultDto result){
        result.setSuccess(false);
        result.setCode(CommonResponse.FAIL.getCode());
        result.setMsg(CommonResponse.FAIL.getMsg());
    }

    //회원가입
    public SignUpResultDto signUp(String userId, String password, String name) {
        User user = userRepository.save(User.builder()
                .userid(userId)
                .password(passwordEncoder.encode(password))
                .name(name)
                .build());

        UserRequestDto userRequestDto = UserRequestDto.builder()
                .userid(user.getUserid())
                .password(user.getPassword())
                .name(user.getName())
                .build();

        User savedUser = userRepository.save(user);
        SignUpResultDto signUpResultDto = new SignInResultDto();

        if(!savedUser.getName().isEmpty()){
            setSuccessResult(signUpResultDto);
        }else{
            setFailResult(signUpResultDto);
        }

        return signUpResultDto;

    }
//    private final JwtTokenProvider jwtTokenProvider;


//    public SignInResultDto signIn(String user_id, String password) {
//        LOGGER.info("[getSignInResult] signDataHandler 로 회원 정보 요청");
//        User user = userRepository.getByUid(user_id);
//        LOGGER.info("[getSignInResult] Id : {}", user_id);
//
//        LOGGER.info("[getSignInResult] 패스워드 비교 수행");
//        if(password != user.getPassword()){
//            throw new RuntimeException();
//        }
//        LOGGER.info("[getSignInResult] 패스워드 일치");
//
//        LOGGER.info("[getSignInResult] SignInResultDto 객체 생성");
//        SignInResultDto signInResultDto = SignInResultDto.builder()
//                .token(jwtTokenProvider.createToken(String.valueOf(user.getUser_id())))
//                .build();
//
//
//
//
//
//
//        return signInResultDto;
//    }

//    public boolean addUser(UserRequestDto userRequestDto) {
//        userRepository.save(User.builder()
//                .id(userRequestDto.getId())0
//                .name(userRequestDto.getName())
//                .email(userRequestDto.getEmail())
//                .age(userRequestDto.getAge())
//                .gender(userRequestDto.getGender())
//                .build()
//        );
//        return true;
//    }

//    public boolean deleteUser(Long id) {
//        Optional<User> user = userRepository.findById(id);
//        if(user.isPresent()){
//            userRepository.delete(user.get());
//            return 1;
//        }
//        return 0;
//    }
}
