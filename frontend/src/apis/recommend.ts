import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

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
    // console.log(data.data.responseData)

    return data.data.responseData;
  } catch (e) {
    console.log(e);
  }
}
