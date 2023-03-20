package com.sasatech.bookdodum.config.security;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final UserDetailsService userDetailsService;

    @Value(${springboot.jwt.secret})
    private String secretkey = "secretKey";
    private final long tokenValidMillisecond = 1000L * 60 * 80;

    @PostConstruct
    protected void init(){
        secretkey = Base64.getEncoder().encodeToString(secretkey.getBytes(StandardCharsets.UTF_8))
    }
    


}
