import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
const user: any = window.localStorage.getItem("user");
const token = JSON.parse(user);

// 책 정보 불러오기
export async function getBookInfoAPI(imgUrl: string) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/book/isbn`,
      params: { path: imgUrl },
    });
    return data.responseData;
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
    return data.success;
  } catch (e) {
    console.log(e);
  }
}

// 다 읽은 책 갱신하기
export async function putBookIdAPI(id: number) {
  try {
    const { data } = await axios({
      method: "PUT",
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