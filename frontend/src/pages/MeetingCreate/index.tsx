import React, { useState } from "react";
import NavBack from "../../Components/Contents/NavBack";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { createMeeting } from "../../apis/meeting";

interface Meeting {
  bookId: number;
  title: string;
  content: string;
  authority: boolean;
}

export default function MeetingCreate() {
  const bookId = 1;
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [authority, setAuthority] = useState<boolean>(true);
  const [read, setRead] = useState<string>("예");
  const options = [
    { authority: true, read: "예" },
    { authority: false, read: "아니요" },
  ];

  const meeting: Meeting = {
    bookId: bookId,
    title: title,
    content: content,
    authority: authority,
  };

  const makeMeeting = async (meeting: Meeting) => {
    await createMeeting(meeting);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRead(e.target.value);
    if (e.target.value === "예") {
      setAuthority(true);
    } else {
      setAuthority(false);
    }
  };

  const navigate = useNavigate();
  const goMeeting = () => {
    navigate(`/bookmeeting/${bookId}`);
  };

  return (
    <Container>
      <NavBack text={"모임 만들기"} link={"/bookmeeting"} />

      <Text>도서 선택하기</Text>
      <Book>
        <option>- - - 도서를 선택해 주세요 - - -</option>
        <option>불편한 편의점</option>
        <option>구의 증명</option>
        <option>모순</option>
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
          goMeeting();
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
