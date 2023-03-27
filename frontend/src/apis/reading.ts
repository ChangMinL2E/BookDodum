import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL

// 사용자가 읽고 있는 책 목록 조회
export async function getReadingBooksAPI() {
    const user:any = window.localStorage.getItem('user')
    const token = JSON.parse(user)
    try {
        const { data } = await axios({
          method: "GET",
          url: `${API_URL}/book/list/false`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data.responseData;
      } catch (e) {
        console.log(e);
      }
};

