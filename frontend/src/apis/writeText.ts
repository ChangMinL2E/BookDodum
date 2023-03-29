import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("user");

interface Comment {
  bookId: number;
  content:string;
}

export async function writeTextAPI(comment: Comment) {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/book/review`,
      data:  comment ,
      headers: {
        Authorization: token,
      },
    });
    console.log(data);
    return data;
  } catch (e) {
    console.log(e)
    
  }
}
