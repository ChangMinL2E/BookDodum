import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export async function getReadWithAPI(bookid: number) {
  const token:any = window.localStorage.getItem("user");
  const user = JSON.parse(token)
 
  try {
    const data = await axios({
      method: "GET",
      url: `${API_URL}/book/readwith/${bookid}`,
      headers: {
        Authorization: `Bearer ${user}`,
      },
    });

    return data.data.responseData;
  } catch (e) {
    console.log(e);
  }
}