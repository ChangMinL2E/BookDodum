import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../../Assets/Images/logo-white.png";
import { signupUserAPI, checkNameAPI, checkUseridAPI } from "../../apis/auth";
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
  const [samePwd, setSamePwd] = useState<boolean>(false);
  const navigate = useNavigate();

  let userInfo: SignupInfo = {
    userid: userid,
    password: password,
    name: name,
  };

  // 회원 가입
  const signupUser = async (userInfo: SignupInfo) => {
    const data = await signupUserAPI(userInfo);
    if (data.success) {
      navigate("/");
    }
  };

  const checkSignup = (userInfo: SignupInfo) => {
    if (samePwd && userid && name && password) {
      signupUser(userInfo);
    } else {
      alert("비밀번호가 다릅니다! 다시 입력해주세요.");
      setPwdCheck("");
    }
  };

  // 닉네임 중복확인
  const checkName = async (name: string) => {
    const data = await checkNameAPI(name);
    if (!data.responseData) {
      alert("사용 가능한 닉네임입니다.");
    } else {
      alert("중복된 닉네임입니다.");
    }
  };

  // id 중복확인
  const checkUserid = async (userid: string) => {
    const data = await checkUseridAPI(userid);
    if (!data.responseData) {
      alert("사용 가능한 닉네임입니다.");
    } else {
      alert("중복된 닉네임입니다.");
    }
  };

  useEffect(() => {
    if (password !== pwdCheck) {
      setSamePwd(false);
    } else {
      setSamePwd(true);
    }
  }, [pwdCheck]);

  return (
    <Container>
      <Div>
        <Logo src={logo} />
        <Text>닉네임</Text>
        <Input
          value={name}
          placeholder="닉네임을 입력하세요"
          onChange={(e) => setName(e.target.value)}
        />
        <DoubleN
          onClick={() => {
            checkName(name);
          }}
        >
          중복확인
        </DoubleN>

        <Text>아이디</Text>
        <Input
          value={userid}
          placeholder="아아디를 입력하세요"
          onChange={(e) => setUserid(e.target.value)}
        ></Input>
        <DoubleI
          onClick={() => {
            checkUserid(userid);
          }}
        >
          중복확인
        </DoubleI>

        <Text>비밀번호</Text>
        <Input
          value={password}
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Text>비밀번호 확인</Text>
        <Input
          style={{ borderColor: samePwd ? "" : "red" }}
          value={pwdCheck}
          type="password"
          placeholder="비밀번호를 확인하세요"
          onChange={(e) => setPwdCheck(e.target.value)}
        />

        <Button
          onClick={() => {
            checkSignup(userInfo);
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
  border: 3px solid transparent;
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

const DoubleN = styled.button`
  font-size: 0.8rem;
  border-radius: 5px;
  padding: 2%;
  background-color: #e4ddcc;
  border: transparent;
  z-index: 5;
  position: fixed;
  top: 21.5%;
  right: 3%;
`;

const DoubleI = styled.button`
  font-size: 0.8rem;
  border-radius: 5px;
  padding: 2%;
  background-color: #e4ddcc;
  border: transparent;
  z-index: 5;
  position: fixed;
  top: 39%;
  right: 3%;
`;
