import { useNavigate } from 'react-router-dom';
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

interface SignupInfo {
  userid: string;
  name: string;
  password: string;
}

interface LoginInfo {
  userid: string;
  password: string;
}

// signup axios
export async function signupUserAPI(userInfo: SignupInfo) {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/user/signup`,
      data: userInfo,
    });
    console.log('회원가입 성공')
    return true;
  } catch (e) {
    console.log(e);
  }
}

// login axios
export async function loginUserAPI(userInfo: LoginInfo) {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/user/signin`,
      data: userInfo,
    });
    console.log('로그인 성공')
    return true;
  } catch (e) {
    console.log(e);
  }
}

// 회원 탈퇴
export async function deleteUserAPI(userid: string) {
  try {
    const { data } = await axios({
      method: "DELETE",
      url: `${baseUrl}/user/`,
      params: { userid },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}
