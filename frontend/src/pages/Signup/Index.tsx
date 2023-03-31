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

  // 회원가입 시 확인
  const [samePwd, setSamePwd] = useState<boolean>(false);
  const [validUserid, setValidUserid] = useState<boolean>(false);
  const [validName, setValidName] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);

  // 유효성 검사
  const [nameCheck, setNameCheck] = useState<boolean>(false);
  const [useridCheck, setUseridCheck] = useState<boolean>(false);
  const [passwordCheck, setPasswordCheck] = useState<boolean>(false);

  const navigate = useNavigate();

  let userInfo: SignupInfo = {
    userid: userid,
    password: password,
    name: name,
  };

  // 닉네임 유효성 검사
  useEffect(() => {
    if (name.length >= 2 && name.length <= 10) {
      setNameCheck(true);
    } else {
      setNameCheck(false);
    }
  }, [name]);

  // 아이디 유효성 검사
  useEffect(() => {
    const regex = /^[a-zA-Z0-9]{4,16}$/;
    if (regex.test(userid)) {
      setUseridCheck(true);
    } else {
      setUseridCheck(false);
    }
    console.log(useridCheck)
  }, [userid]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/;
    if (regex.test(password)) {
      setPasswordCheck(true);
    } else {
      setPasswordCheck(false)
    }
  }, [password]);

  // 회원 가입
  const signupUser = async (userInfo: SignupInfo) => {
    const data = await signupUserAPI(userInfo);
    if (data.success) {
      navigate("/");
    }
  };

  // 닉네임 중복확인
  const checkName = async (name: string) => {
    const data = await checkNameAPI(name);
    if (nameCheck) {
      if (!data.responseData) {
        alert("사용 가능한 닉네임입니다.");
        setValidName(true);
      } else {
        alert("중복된 닉네임입니다.");
      }
    } else {
      alert("2~10자로 입력해주세요.");
    }
  };

  // id 중복확인
  const checkUserid = async (userid: string) => {
    const data = await checkUseridAPI(userid);
    if (useridCheck) {
      if (!data.responseData) {
        alert("사용 가능한 아이디입니다.");
        setValidUserid(true);
      } else {
        alert("중복된 아이디입니다.");
      }
    } else {
      alert("영문, 숫자 4~16자로 입력해주세요.");
    }
  };

  // 비밀번호 확인
  useEffect(() => {
    if (password.length && password !== pwdCheck) {
      setSamePwd(false);
    } else if (password.length && password === pwdCheck) {
      setSamePwd(true);
    }
  }, [pwdCheck]);

  // button 색상
  useEffect(() => {
    if (
      nameCheck &&
      useridCheck &&
      passwordCheck &&
      validName &&
      validUserid &&
      samePwd
    ) {
      setConfirm(true);
    }
  }, [nameCheck, useridCheck, passwordCheck, validName, validUserid, samePwd]);

  // 회원가입 가능 여부
  const checkSignup = (userInfo: SignupInfo) => {
    if (confirm) {
      signupUser(userInfo);
    } else {
      alert("정보를 제대로 입력해주세요.");
      setPwdCheck("");
    }
  };

  return (
    <Container>
      <Div>
        <Logo src={logo} />
        <Text>닉네임</Text>
        <Input
          value={name}
          placeholder="2~10자"
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
          placeholder="영문/숫자 4~16자"
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
          placeholder="영문, 숫자, 특수문자 포함 8~30자"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Text>비밀번호 확인</Text>
        <Input
          // style={{ borderColor: samePwd ? "" : "red" }}
          value={pwdCheck}
          type="password"
          placeholder="영문, 숫자, 특수문자 포함 8~30자"
          onChange={(e) => setPwdCheck(e.target.value)}
        />

        <Button
          style={{
            backgroundColor: confirm ? "rgba(219, 219, 219, 0.7)" : "",
            color: confirm ? "black" : "",
          }}
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
  padding-left: 3%;
`;

const Button = styled.button`
  background-color: rgba(219, 219, 219, 0.3);
  color: white;
  border: 1px solid white;
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
  right: 0;
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
  right: 0;
`;
