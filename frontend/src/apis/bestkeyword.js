import axios from "axios";
import XMLparser from 'react-xml-parser';

// 이달의 키워드 조회
export async function getBestKeyword(year, month) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_LIBRARY_API_URL}/monthlyKeywords?authKey=${process.env.REACT_APP_LIBRARY_API_KEY}&month=${year}-${month}`,
    });

    return new XMLparser().parseFromString(data).children[1].children.slice(0, 60);
  } catch (e) {
    console.log(e);
  }
}

