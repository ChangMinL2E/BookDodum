
import axios from "axios";
import { off } from "process";
import { getGeoLocationAPI } from "./geolocation";

const regions: {[key:string]:number} = {
    '서울' : 11,
    '부산' : 21,
    '대구' : 22,
    '인천' : 23,
    '광주' : 24,
    '대전' : 25,
    '울산' : 26,
    '세종' : 29,
    '경기' : 31,
    '강원' : 32,
    '충북' : 33,
    '충남' : 34,
    '전북' : 35,
    '전남' : 36,
    '경북' : 37,
    '경남' : 38,
    '제주' : 39
}

const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY
const LIBRARY_API_URL = process.env.REACT_APP_LIBRARY_API_URL
const LIBRARY_API_KEY = process.env.REACT_APP_LIBRARY_API_KEY

// 현재 좌표를 기준으로 지역코드 불러오기
export async function getRegionCodeAPI(longitude:string, latitude:string) {
  try {
    // const [latitude, longitude] = getGeoLocationAPI();
    

    const data  = await axios({
      method: "GET",
      url: `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`,
      headers: {
        'Authorization': `KakaoAK ${KAKAO_REST_API_KEY}`,
      }
    });

    // 지역 이름 - string
    const region:string = data.data.documents[0].address['region_1depth_name']
    
    return regions[region];
  } catch (e) {
    console.log(e);
  }
}

// 내 지역 도서관 인기 대출 도서 목록 조회
export async function getLibraryBooksAPI() {
  let tmp:any = []  
  let title : string[] = []
  try {
      // const REGION_CODE = await getRegionCodeAPI(longitude, latitude)

      const data  = await axios({
        method: "GET",
        url: `http://data4library.kr/api/loanItemSrchByLib?authKey=${LIBRARY_API_KEY}&region=${24}&format=json`,
      });

      for(let book of data.data.response.docs) {
        if(!title.includes(book.doc.bookname)) {
          tmp.push(book.doc)
          title.push(book.doc.bookname)
        }

        if(tmp.length === 10) break
      }

      return tmp;
    } catch (e) {
      console.log(e);
    }
  }
