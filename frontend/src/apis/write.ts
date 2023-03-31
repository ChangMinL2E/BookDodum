import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
const user: any = localStorage.getItem("user");
const token = JSON.parse(user);

interface Comment {
  bookId: number;
  content: string;
}

export async function writeTextAPI(comment: Comment) {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/book/review`,
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

// 독후감 리스트 불러오기
export async function getWriteAPI(bookId: number) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/book/review/${bookId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    return data.responseData;
  } catch (e) {
    console.log(e, "🧨🧨🧨");
  }
}

// 독후감 삭제하기
export async function deleteCommentAPI(rerviewId: number) {
  try {
    const { data } = await axios({
      method: "DELETE",
      url: `${baseUrl}/book/review/${rerviewId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}
