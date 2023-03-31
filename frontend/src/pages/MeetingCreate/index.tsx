import React, { useState, useEffect } from "react";
import NavBack from "../../Components/Contents/NavBack";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { createMeetingAPI, getBooksAPI } from "../../apis/meeting";

interface Meeting {
  bookId: number;
  title: string;
  content: string;
  authority: boolean;
}

interface Book {
  bookId: number;
  imageUrl: string;
  title: string;
  publisher: string;
  category: string[];
  convertedImageUrl: string | null;
}

interface BookInfo {
  bookId: number;
  title: string;
}

export default function MeetingCreate() {
  const [bookInfo, setBookInfo] = useState<BookInfo[]>([]);
  const [bookId, setBookId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [authority, setAuthority] = useState<boolean>(true);
  const [read, setRead] = useState<string>("예");
  const options = [
    { authority: true, read: "예" },
    { authority: false, read: "아니요" },
  ];

  const navigate = useNavigate();

  const meeting: Meeting = {
    bookId: bookId,
    title: title,
    content: content,
    authority: authority,
  };

  useEffect(() => {
    getIngBooks();
  }, []);

  // 읽고있는 책, 읽은 책 불러오는 api
  const getIngBooks = async () => {
    const data = await getBooksAPI();
    let list: BookInfo[] = [];

    data.forEach((item: Book) => {
      list.push({
        bookId: item.bookId,
        title: item.title,
      });
    });
    setBookInfo(list);
  };

  // 모임 만드는 api
  const makeMeeting = async (meeting: Meeting) => {
    if (meeting.bookId == 0) {
      alert("도서를 선택해주세요!");
    } else if (meeting.title == "") {
      alert("모임 이름을 입력해주세요.");
    } else if (meeting.content) {
      alert("모임 설명을 입력해주세요.");
    } else {
      await createMeetingAPI(meeting);
      navigate(`/bookmeeting`);
    }
  };

  // 예, 아니오 변경
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRead(e.target.value);
    if (e.target.value === "예") {
      setAuthority(true);
    } else {
      setAuthority(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setBookId(parseInt(value));
  };

  return (
    <Container>
      <NavBack text={"모임 만들기"} link={"/bookmeeting"} />
      <Text>도서 선택하기</Text>
      <Book onChange={handleChange}>
        <option value="0">--- 도서를 선택해 주세요 ---</option>
        {bookInfo?.map(({ bookId, title }: BookInfo) => (
          <option value={bookId} key={bookId}>
            {title}
          </option>
        ))}
      </Book>

      <Text>모임 만들기</Text>
      <Title
        placeholder="모임 제목을 입력해주세요"
        onChange={(e) => setTitle(e.target.value)}
      />

      <Text>모임지기의 말</Text>
      <Say
        placeholder="모임에 대한 설명을 입력해주세요."
        onChange={(e) => setContent(e.target.value)}
      />

      <Text>읽은 사람만 참여할 수 있는 모임입니다.</Text>
      <Wrapper>
        {options.map((option, idx) => (
          <OptionText key={idx}>
            <input
              type="radio"
              value={option.read}
              checked={read === option.read}
              onChange={handleOptionChange}
            />
            {option.read}
          </OptionText>
        ))}
      </Wrapper>
      <Button
        onClick={() => {
          makeMeeting(meeting);
        }}
      >
        모임 만들기
      </Button>
    </Container>
  );
}

// styled component
const Container = styled.div`
  background-color: #f9f9f7;
  width: 100vw;
  height: 100vh;
`;

const Book = styled.select`
  width: 95%;
  padding: 1.5%;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  background-color: white;
  margin: 2%;
`;

const Text = styled.div`
  color: #5c5649;
  font-weight: 600;
  margin: 2% 0 0 3%;
`;

const Title = styled.textarea`
  border: 1px solid #d9d9d9;
  background-color: white;
  border-radius: 3px;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c9c9c9;
  }
  width: 90%;
  padding: 2%;
  margin: 2%;
`;

const Say = styled(Title)`
  height: 20%;
`;

const Radio = styled.input`
  appearance: none;
  border: max(2px, 0.1em) solid #5c5649;
  border-radius: 50%;
  width: 1.25em;
  height: 1.25em;
`;

const Button = styled.button`
  width: 85%;
  background-color: #dbd4c3;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  color: #5c5649;
  padding: 4%;
  border: none;
  font-weight: 600;
  right: 7%;
  bottom: 4%;
  position: fixed;
`;

const Wrapper = styled.div`
  margin-top: 2%;
`;

const OptionText = styled.label`
  color: #5c5649;
  font-weight: 500;
  margin-left: 2%;
`;
