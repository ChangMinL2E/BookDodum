import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../Assets/Images/logo-white.png";
import { loginUserAPI } from "../../apis/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAction } from '../../Store/userSlice'

interface LoginInfo {
  userid: string;
  password: string;
}

export default function Login() {
  const [userid, setUserid] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let userInfo: LoginInfo = {
    userid,
    password,
  };

  const loginUser = async (userInfo: LoginInfo) => {
    const data = await loginUserAPI(userInfo);
    if (data.code === 401) {
      alert(data.msg + "입니다.");
    } else if (data.code === 402) {
      alert(data.msg + "입니다.");
    } else {
      navigate("/");
      localStorage.setItem("user", JSON.stringify(data.token));
      dispatch(userAction.loginAction({userid: data.userid, name: data.name}))
    }
  };

  return (
    <Container>
      <Div>
        <Logo src={logo} />
        <Text>아이디</Text>
        <Input
          placeholder="아이디를 입력하세요"
          onChange={(e) => setUserid(e.target.value)}
        />
        <Text>비밀번호</Text>
        <Input
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={() => {
            loginUser(userInfo);
          }}
        >
          들어가기
        </Button>
        <SignUp onClick={() => {navigate('/signup')}}>회원가입</SignUp>
      </Div>
    </Container>
  );
}

const Container = styled.div`
  background-color: #5c5649;
  width: 100%;
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
  margin-top: 3%;
  font-weight: 300;
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
  font-size: 0.9rem;
  padding: 5%;
  width: 200px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 6% auto 4% auto;
`;

const SignUp = styled.div`
    color: #F7F3EB;
    width: 100%;
    text-align: center;
    font-size: 0.8rem;
    text-decoration: underline;
`
