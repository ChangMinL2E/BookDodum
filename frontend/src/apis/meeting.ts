import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("user")

interface Meeting {
  bookId: number;
  title: string;
  content: string;
  authority: boolean;
}

interface Comment {
  meetingId: number;
  content: string;
}

// 모임 생성
export async function createMeetingAPI(meeting: Meeting) {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/meeting`,
      data: meeting,
      headers:{
        Authorization: token,
      }
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

// 모임 조회하기
export async function postMeetingAPI() {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/meeting`,
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

// 모임 댓글 쓰기
export async function postMeetingCommentAPI(comment: Comment) {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/meeting/comment`,
      data: comment,
      headers:{
        Authorization: token,
      }
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

// 모임 댓글 조회하기
export async function getMeetingCommentAPI(id: number) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/meeting/comment`,
      params: { id: id },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

// 참여중인 모임 목록 조회
export async function getMeetingJoinAPI() {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/meeting/join`,
      headers:{
        Authorization: token,
      }
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

// 읽은 책 목록 조회


// 모임 참여
export async function postMeetingJoinAPI(meetingid: number) {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/meeting/join/${meetingid}`,
      headers:{
        Authorization: token,
      }
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

