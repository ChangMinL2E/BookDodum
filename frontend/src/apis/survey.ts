import axios from "axios";

const API_URL = process.env.REACT_APP_DATA_API_URL;

interface Info {
  name: string;
  info: string[];
}

export async function postRegisterAPI(info: Info) {
  try {
    const data = await axios({
      method: "POST",
      url: `${API_URL}/books/register_data/`,
      data: info,
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}
