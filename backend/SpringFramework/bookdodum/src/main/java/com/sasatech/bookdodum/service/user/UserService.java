package com.sasatech.bookdodum.service.user;

import com.sasatech.bookdodum.dto.jwt.SignInResultDto;
import com.sasatech.bookdodum.dto.jwt.SignUpResultDto;
import com.sasatech.bookdodum.dto.request.user.UserRequestDto;
import com.sasatech.bookdodum.entity.user.User;
import com.sasatech.bookdodum.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class UserService {

    private final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public SignUpResultDto signUp(String userId, String password, String name) {
        LOGGER.info("[getSignUpResult] 회원 가입 정보 전달");
        User user;

        user = User.builder()
                .user_id(userId)
//                .password(passwordEncoder.encode(password))
                .password(password)
                .name(name)
                .build();

        User savedUser = userRepository.save(user);
        SignUpResultDto signUpResultDto = new SignInResultDto();

//        LOGGER.info("[getSignUpResult] userEntity 값이 들어왔는지 확인 후 결과값 주입");
//        if(!savedUser.getName().isEmpty()){
//            LOGGER.info("[getSignUpResult] 정상 처리 완료");
//            setSuccessResult(signUpResultDto);
//        }else{
//            LOGGER.info("[getSignUpResult] 실패 처리 완료");
//            setFailResult(signUpResultDto);
//        }
//        return signUpResultDto;
    }

    public SignInResultDto signIn(String user_id, String password) {
        LOGGER.info("[getSignInResult] signDataHandler 로 회원 정보 요청");
        User user = userRepository.getByUid(user_id);
        LOGGER.info("[getSignInResult] Id : {}", user_id);

        LOGGER.info("[getSignInResult] 패스워드 비교 수행");
        if(password != user.getPassword()){
            throw new RuntimeException();
        }
        LOGGER.info("[getSignInResult] 패스워드 일치");

        LOGGER.info("[getSignInResult] SignInResultDto 객체 생성");
        SignInResultDto signInResultDto = SignInResultDto.builder()
                .token(jwtTokenProvider.createToken(String.valueOf(user.getUser_id())))
                .build();






        return signInResultDto;
    }

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
