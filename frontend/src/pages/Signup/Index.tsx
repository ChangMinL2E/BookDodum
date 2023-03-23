import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../../Assets/Images/logo-white.png";
import { signupUserAPI } from "../../apis/auth";
import { useNavigate } from "react-router-dom";

interface SignupInfo {
  userid: string;
  name: string;
  password: string;
}

export default function Signup() {
  const [userid, setUserid] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pwdCheck, setPwdCheck] = useState<string>("");
  const navigate = useNavigate();

  let userInfo: SignupInfo = {
    userid: userid,
    password: password,
    name: name,
  };

  const signupUser = async (userInfo: SignupInfo) => {
    const data = await signupUserAPI(userInfo);
    if (data) {
      navigate("/");
    }
  };

  return (
    <Container>
      <Div>
        <Logo src={logo} />
        <Text>닉네임</Text>
        <Input
          placeholder="닉네임을 입력하세요"
          onChange={(e) => setName(e.target.value)}
        />

        <Text>아이디</Text>
        <Input
          placeholder="아아디를 입력하세요"
          onChange={(e) => setUserid(e.target.value)}
        />

        <Text>비밀번호</Text>
        <Input
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Text>비밀번호 확인</Text>
        <Input
          type="password"
          placeholder="비밀번호를 확인하세요"
          onChange={(e) => setPwdCheck(e.target.value)}
        />

        <Button
          onClick={() => {
            signupUser(userInfo);
          }}
        >
          시작하기
        </Button>
      </Div>
    </Container>
  );
}

const Container = styled.div`
  background-color: #5c5649;
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Logo = styled.img`
  width: 110px;
  height: 55px;
  margin: auto;
  display: block;
`;

const Div = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Text = styled.div`
  color: white;
  font-size: 0.8rem;
  font-weight: 300;
  margin-top: 3%;
`;

const Input = styled.input`
  border-radius: 5px;
  height: 40px;
  width: 250px;
`;

const Button = styled.button`
  background-color: rgba(219, 219, 219, 0.3);
  color: white;
  border: 1px solid #fffefc;
  border-radius: 40px;
  padding: 5%;
  width: 200px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 6% auto;
`;
