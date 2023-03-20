import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

// 책 정보 불러오기
export async function getBookInfo(imgUrl: string) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/book/isbn`,
      data: imgUrl,
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function postBookId(id: number) {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/book/${id}`,
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}