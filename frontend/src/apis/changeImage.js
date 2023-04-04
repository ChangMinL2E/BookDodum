import axios from "axios";
import { Configuration, OpenAIApi } from "openai";

const REACT_APP_CHANGE_API_KEY = process.env.REACT_APP_CHANGE_API_KEY;
const REACT_APP_CHANGE_API_URL = process.env.REACT_APP_CHANGE_API_URL;

export async function changeImageAPI(result) {
  try {
    const { data } = await axios({
      method: "POST",
      url: REACT_APP_CHANGE_API_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${REACT_APP_CHANGE_API_KEY}`,
      },
      data: JSON.stringify({
        prompt: result,
        n: 3,
        size: "1024x1024",
      }),
    });
    return data.data;
   
  } catch (e) {
    console.log(e);
  }
}
