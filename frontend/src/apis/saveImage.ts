import axios from "axios";
const baseUrl = process.env.REACT_APP_API_URL;
const user: any = localStorage.getItem("user");
const token = JSON.parse(user);

// axios 요청할 데이터 타입
interface ImageProps {
  bookId: number;
  convertedImageUrl: string;
}

export async function saveImageAPI(image: ImageProps) {
  try {
    const { data } = await axios({
      method: "PUT",
      url: `${baseUrl}/book/conversion`,
      data: image,
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
