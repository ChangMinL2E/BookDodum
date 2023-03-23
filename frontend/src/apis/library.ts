import axios from "axios";

const LIBRARY_API_URL = process.env.REACT_APP_LIBRARY_API_URL
const LIBRARY_API_KEY = process.env.REACT_APP_LIBRARY_API_KEY

// 도서 소장 도서관 정보 불러오기
export async function getLibraryAPI(ISBN:any, REGION_CODE:number) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${LIBRARY_API_URL}/libSrchByBook?authKey=${LIBRARY_API_KEY}&isbn=${ISBN}&region=${REGION_CODE}&format=json`,
    });
    return data.response.libs;
  } catch (e) {
    console.log(e);
  }
}
