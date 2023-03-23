import axios from "axios";
import XMLparser from 'react-xml-parser';

const LIBRARY_API_URL = process.env.REACT_APP_LIBRARY_API_URL
const LIBRARY_API_KEY = process.env.REACT_APP_LIBRARY_API_KEY

// 이달의 키워드 조회
export async function getBestKeywordAPI(year, month) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${LIBRARY_API_URL}/monthlyKeywords?authKey=${LIBRARY_API_KEY}&month=${year}-${month}`,
    });

    return new XMLparser().parseFromString(data).children[1].children.slice(0, 60);
  } catch (e) {
    console.log(e);
  }
}

