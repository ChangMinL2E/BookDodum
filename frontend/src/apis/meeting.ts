import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
const user: any = localStorage.getItem("user");
const token = JSON.parse(user);

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
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data)
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
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

// 모임 댓글 조회하기
export async function getMeetingCommentAPI(id: number, idx: number) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/meeting/comment`,
      params: { id, idx },
    });
    return data.responseData;
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
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.responseData;
  } catch (e) {
    console.log(e);
  }
}

// 읽은 책 목록 조회
export async function getBooksAPI() {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/book/list`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.responseData;
  } catch (e) {
    console.log(e);
  }
}

// 모임 참여
export async function postMeetingJoinAPI(meetingid: number) {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/meeting/join/${meetingid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

// 모임 목록 / 책 기준 조회
export async function getBookMeetingAPI(bookid: number) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/meeting`,
      params: {
        bookid,
      },
    });
    return data.responseData;
  } catch (e) {
    console.log(e);
  }
}

// 모임 댓글작성 권한 확인
export async function getCommentAuthorityAPI(meetingid: number) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/meeting/comment/authority/${meetingid}`,
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return data.success;
  } catch (e) {
    console.log(e);
  }
}
