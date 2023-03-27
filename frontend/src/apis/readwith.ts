import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export async function getReadWithAPI(bookid: number) {
  const token = window.localStorage.getItem("user");
 
  try {
    const data = await axios({
      method: "GET",
      url: `${API_URL}/book/readwith/${bookid}`,
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