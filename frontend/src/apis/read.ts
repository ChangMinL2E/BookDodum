import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL

export async function getReadBooksAPI() {
    const user: any = window.localStorage.getItem('user')
    const token = JSON.parse(user)
    
    try {
        const { data } = await axios({
          method: "GET",
          url: `${API_URL}/book/list/true`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data.responseData);
        return data.responseData;
      } catch (e) {
        console.log(e);
      }
};

