import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

interface Meeting {
  bookId: number;
  title: string;
  content: string;
  authority: boolean;
}

export async function createMeeting(meeting: Meeting) {
    try {
      const { data } = await axios({
        method: "POST",
        url: `${baseUrl}/book/meeting`,
        data: {
          "bookId": meeting.bookId,
          "title": meeting.title,
          "content": meeting.content,
          "authority": meeting.authority,
        }
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }
