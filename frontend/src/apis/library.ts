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

// 도서관별 장서/대출 데이터 조회
export async function getItemSrchAPI(ISBN:any, LIB_CODE:number) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${LIBRARY_API_URL}/itemSrch?authKey=${LIBRARY_API_KEY}&type=ALL&libCode=${LIB_CODE}&isbn13=${ISBN}&format=json`,
    });
    return data.response.docs[0].doc;
  } catch (e) {
    console.log(e);
  }
}

// 도서관별 도서 소장여부 및 대출 가능여부 조회
export async function getBookExistAPI(ISBN:any, LIB_CODE:number) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${LIBRARY_API_URL}/bookExist?authKey=${LIBRARY_API_KEY}&libCode=${LIB_CODE}&isbn13=${ISBN}&format=json`,
    });
    return data.response.result.loanAvailable;
  } catch (e) {
    console.log(e);
  }
}
