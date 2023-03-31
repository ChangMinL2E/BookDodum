import axios from "axios";

const API_URL = process.env.REACT_APP_DATA_API_URL;

interface Survey {
  name: string;
  survey: string[];
}

export async function postRegisterAPI(survey: Survey) {
  try {
    const data = await axios({
      method: "POST",
      url: `${API_URL}/books/register_data/`,
      data: survey,
    });
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}
