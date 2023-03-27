import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL

export async function getReadingBooksAPI() {
    const token = window.localStorage.getItem('token')
    
    try {
        const { data } = await axios({
          method: "GET",
          url: `${API_URL}/book/list/true`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data);
        return data;
      } catch (e) {
        console.log(e);
      }
}