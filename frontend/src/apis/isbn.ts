import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("user")

// 책 정보 불러오기
export async function getBookInfoAPI(imgUrl: string) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/book/isbn`,
      params: { path: imgUrl },
    });
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

// isbn으로 책 등록하기
export async function postBookIdAPI(id: number) {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/book/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}
