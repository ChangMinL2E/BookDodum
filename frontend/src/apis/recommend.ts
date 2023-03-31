import axios from "axios";
import useSelectorTyped from "../Store";

const API_URL = process.env.REACT_APP_API_URL;
const DATA_API_URL = process.env.REACT_APP_API_URL;

// 내가 읽은 책을 읽은 사람이 선택한 책
export async function getUserRecommendAPI(bookId: number) {
  const user: any = window.localStorage.getItem("user");
  const token = JSON.parse(user);

  try {
    const data = await axios({
      method: "GET",
      url: `${API_URL}/book/list/recommend/${bookId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data.responseData;
  } catch (e) {
    console.log(e);
  }
}

// 컨텐츠 기반 추천
export async function getContentsRecommendAPI(userId: string) {
  try {
    const data = await axios({
      method: "GET",
      url: `http://127.0.0.1:8000/books/recommend_books/${userId}`,
    });
    return data.data.slice(0, 10);
  } catch (e) {
    console.log(e);
  }
}
