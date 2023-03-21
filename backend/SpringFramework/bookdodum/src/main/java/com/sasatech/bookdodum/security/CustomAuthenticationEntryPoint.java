package com.sasatech.bookdodum.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        //인증에 실패한 상황 구현
        ObjectMapper objectMapper = new ObjectMapper();

        EntryPointErrorResponse entryPointErrorResponse = new EntryPointErrorResponse();

        entryPointErrorResponse.setMsg("인증에 실패하였습니다.");
    }
}
