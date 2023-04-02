import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GenderCard from "./GenderCard";
import ReasonCard from "./ReasonCard";
import EmotionCard from "./EmotionCard";
import FieldCard from "./FieldCard";
import useSelectorTyped from "../../Store";

// step1
import woman from "../../Assets/Images/woman.png";
import man from "../../Assets/Images/man.png";

// step2
import healing from "../../Assets/Images/healing.png";
import development from "../../Assets/Images/development.png";
import funny from "../../Assets/Images/funny.png";
import bestseller from "../../Assets/Images/bestseller.png";
import spec from "../../Assets/Images/spec.png";
import confidence from "../../Assets/Images/confidence.png";

// step3
import happy from "../../Assets/Images/happy.png";
import love from "../../Assets/Images/love.png";
import boring from "../../Assets/Images/boring.png";
import sad from "../../Assets/Images/sad.png";
import frustrated from "../../Assets/Images/frustrated.png";
import farewell from "../../Assets/Images/farewell.png";
import unrest from "../../Assets/Images/unrest.png";
import stress from "../../Assets/Images/stress.png";
import { postRegisterAPI } from "../../apis/survey";
import { useNavigate } from "react-router";
import Loading from "../../Components/Common/Loading";

interface Prop {
  step: Number;
}

interface Item {
  image: string;
  text: string;
}

interface Survey {
  name: string;
  survey: string[];
}

export default function Step({ step }: Prop) {
  const genders: Item[] = [
    { image: woman, text: "여성" },
    { image: man, text: "남성" },
  ];

  const reasons: Item[] = [
    { image: healing, text: "힐링" },
    { image: development, text: "자기계발" },
    { image: funny, text: "재미" },
    { image: bestseller, text: "베스트 셀러" },
    { image: spec, text: "스펙" },
    { image: confidence, text: "자존감" },
  ];

  const emotions: Item[] = [
    { image: happy, text: "행복" },
    { image: love, text: "사랑" },
    { image: boring, text: "심심" },
    { image: sad, text: "우울" },
    { image: frustrated, text: "답답" },
    { image: farewell, text: "이별" },
    { image: unrest, text: "불안" },
    { image: stress, text: "스트레스" },
  ];

  const fields: string[] = [
    "경제경영",
    "소설/시/희곡",
    "사회과학",
    "어린이",
    "예술/대중문화",
    "인문학",
    "만화",
    "에세이",
    "외국어",
    "역사",
    "좋은부모",
    "청소년",
    "추천도서",
    "수험서/자격증",
    "컴퓨터/모바일",
    "과학",
    "건강/취미",
    "고전",
    "유아",
    "요리/살림",
    "여행",
    "종교/역학",
    "잡지",
    "달력/기타",
    "과학/수학/생태",
    "기술공학",
    "국내도서",
    "전집/중고전집",
  ];

  // const [loading, setLoading] = useState(false);

  const sessionGet: any = sessionStorage.getItem("list");
  const navigate = useNavigate();

  const [surveyList, setSurveyList] = useState(JSON.parse(sessionGet) || "");
  const [book, setBook] = useState<string>("");
  const [result, setResult] = useState<string[]>([]);

  const name = useSelectorTyped((state) => state.user.userid);

  const survey: Survey = {
    name: name,
    survey: result,
  };

  useEffect(() => {
    sessionStorage.setItem("list", JSON.stringify(surveyList));
  }, [surveyList]);

  const saveSession = (value: string) => {
    setSurveyList([...surveyList, value]);
  };

  const postRegister = async () => {
    // setLoading(true);
    await postRegisterAPI(survey);
    // setLoading(false);
  };

  const handleSubmitBook = () => {
    if (book.trim().length > 0) {
      let tmp = JSON.parse(sessionGet);
      sessionStorage.removeItem("list");
      tmp.push(book);
      setResult(tmp);
    } else {
      alert("제목을 입력해주세요.");
      setBook("");
    }
  };

  useEffect(() => {
    if (result.length > 0) {
      postRegister();
      navigate("/");
    }
  }, [result]);

  return (
    <Container>
      {/* {loading ? <Loading /> : null} */}
      {step === 1 && (
        <GenderDiv>
          {genders.map((gender: Item) => (
            <div
              key={gender.text}
              onClick={() => {
                saveSession(gender.text);
              }}
            >
              <GenderCard {...gender} />
            </div>
          ))}
        </GenderDiv>
      )}

      {step === 2 && (
        <ReasonDiv>
          {reasons.map((reason: Item) => (
            <div
              key={reason.text}
              onClick={() => {
                saveSession(reason.text);
              }}
            >
              <ReasonCard {...reason} />
            </div>
          ))}
        </ReasonDiv>
      )}

      {step === 3 && (
        <EmotionDiv>
          {emotions.map((emotion, idx) => (
            <div
              key={emotion.text}
              onClick={() => {
                saveSession(emotion.text);
              }}
            >
              <EmotionCard {...emotion} />
            </div>
          ))}
        </EmotionDiv>
      )}

      {step === 4 && (
        <FieldDiv>
          {fields.map((field: string, idx) => (
            <div
              key={idx}
              onClick={() => {
                saveSession(field);
              }}
            >
              <FieldCard field={field} />
            </div>
          ))}
        </FieldDiv>
      )}

      {step === 5 && (
        <InputDiv>
          <Input
            value={book}
            onChange={(e) => {
              setBook(e.target.value);
            }}
            placeholder="책 제목을 입력해주세요."
          />
          <Button onClick={handleSubmitBook}>북,돋움 시작하기</Button>
        </InputDiv>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10%;
`;

const GenderDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  margin-top: 15%;
`;

const ReasonDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`;

const EmotionDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`;

const FieldDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`;

const InputDiv = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1.5px solid #5c5649;
  font-size: 1.05rem;

  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Gowun Batang", serif;
  width: 80%;
  font-weight: 600;
`;

const Button = styled.button`
  position: absolute;
  width: 100%;
  left: 50%;
  transform: translate(-50%, 0%);
  bottom: 0;
  background-color: #f7f3eb;
  border: none;
  padding: 4%;
  font-size: 1.05rem;
  font-family: "Gowun Batang", serif;
  font-weight: 600;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;
