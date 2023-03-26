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
        n: 1,
        size: "1024x1024",
      }),
    });
    console.log(data)
    return data.data[0].url;
  } catch (e) {
    console.log(e,'❤❤');
  }
}
