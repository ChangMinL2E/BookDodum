import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const user: any = localStorage.getItem("user");
const token = JSON.parse(user);


const regions: { [key: string]: number } = {
  서울: 11,
  부산: 21,
  대구: 22,
  인천: 23,
  광주: 24,
  대전: 25,
  울산: 26,
  세종: 29,
  경기: 31,
  강원: 32,
  충북: 33,
  충남: 34,
  전북: 35,
  전남: 36,
  경북: 37,
  경남: 38,
  제주: 39,
};

// 현재 좌표를 기준으로 지역코드 불러오기
export async function getRegionCodeAPI(longitude: number, latitude: number) {
  try {
    const data  = await axios({
      method: "GET",
      url: `${API_URL}/external/regioncode?longitude=${longitude}&latitude=${latitude}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(data);

    // 지역 이름 - string
    // const region: string = data["region_1depth_name"];

    console.log(data);
    // console.log(region);
    

    // return { regionName: region, regionCode: regions[region] };
    return data;
  } catch (e) {
    console.log(e);
  }
}



// 도서 소장 도서관 정보 불러오기
export async function getLibraryAPI(ISBN: any, REGION_CODE: number) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/external/library?isbn=${ISBN}&regioncode=${REGION_CODE}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.response.libs;
  } catch (e) {
    console.log(e);
  }
}

// 도서관별 장서/대출 데이터 조회
export async function getItemSrchAPI(ISBN: any, LIB_CODE: number) {
  console.log(LIB_CODE)
  try {
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/external/itemsrch?isbn=${ISBN}&libcode=${LIB_CODE}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.response.docs[0].doc;
  } catch (e) {
    console.log(e);
  }
}

// 도서관별 도서 소장여부 및 대출 가능여부 조회
export async function getBookExistAPI(ISBN: any, LIB_CODE: number) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/external/bookexist?isbn=${ISBN}&libcode=${LIB_CODE}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.response.result.loanAvailable;
  } catch (e) {
    console.log(e);
  }
}

// 베스트 키워드 조회
// 이달의 키워드 조회
export async function getBestKeywordAPI(YEAR: string, MONTH: string) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/external/bestkeyword?year=${YEAR}&month=${MONTH}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.response.keywords;
  } catch (e) {
    console.log(e);
  }
}


// 내 지역 도서관 인기 대출 도서 목록 조회
export async function getLibraryBooksAPI(REGION_CODE: number) {
  let tmp: any = [];
  let title: string[] = [];
  try {
    const data = await axios({
      method: "GET",
      url: `${API_URL}/external/librarybooks?regioncode=${REGION_CODE}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    for (let book of data.data.response.docs) {
      if (!title.includes(book.doc.bookname)) {
        tmp.push(book.doc);
        title.push(book.doc.bookname);
      }

      if (tmp.length === 10) break;
    }

    return tmp;
  } catch (e) {
    console.log(e);
  }
}
