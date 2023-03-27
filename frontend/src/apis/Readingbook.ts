import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("user");

export async function getReadingAPI() {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/book/list/false`,
      headers: {
        Authorization: token,
      },
    });
    console.log(data)
    return data;
  } catch (e) {
    console.log(e);
  }
}
