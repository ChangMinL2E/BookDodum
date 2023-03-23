import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

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

// 모임 만들기
export async function createMeeting(meeting: Meeting) {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/book/meeting`,
      data: meeting,
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

// 모임 조회하기
export async function postMeeting() {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/book/meeting`,
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

// 모임 댓글 쓰기
export async function postMeetingComment(comment: Comment) {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/book/meeting/comment`,
      data: comment,
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

// 모임 댓글 조회하기
