import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export async function getBookDetailAPI(isbn: number) {
  const token = window.localStorage.getItem("user");
  try {
    const data = await axios({
      method: "GET",
      url: `${API_URL}/book/search`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        isbn: String(isbn),
      },
    });
    return { success: data.data.success, responseData: data.data.responseData };
  } catch (e) {
    console.log(e);
  }
}
