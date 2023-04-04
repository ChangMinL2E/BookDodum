import axios from "axios";

const API_URL = process.env.REACT_APP_DATA_API_URL;

interface Survey {
  name: string;
  survey: string[];
}

interface Book {
  name: string;
  read_books: string[];
}

export async function postRegisterSurveyAPI(survey: Survey) {
  try {
    const data = await axios({
      method: "POST",
      url: `${API_URL}/books/register_data/`,
      data: survey,
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function postRegisterBookAPI(book: Book) {
  try {
    const data = await axios({
      method: "POST",
      url: `${API_URL}/books/register_data/`,
      data: book,
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}