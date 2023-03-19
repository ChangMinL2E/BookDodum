import React, { useState } from "react";
import { IMAGE_TYPES } from "react-html5-camera-photo";
import oilpainting from "../../Assets/Images/oilpainting.png";
import oneline from "../../Assets/Images/oneline.png";

// 입력값 받는 부분
interface InputProps {
  value: String;
  placeholder: String;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// 라디오버튼 옵션 이름
interface RadioOption {
  label: String;
  value: String;
}

//라디오 버튼

interface RadioProps {
  options: RadioOption[];
  selectedValue: String;
  onSelectionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ImageGalleyProps {
  images: String;
  selectedImageIndex: number;
}

const Form: React.FC = () => {
  const [text, setText] = useState("");
  const [type, setType] = useState("");
  const handleTextChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setText("");
    console.log(text);
  };
  const options = ["oilpainting", "one-line"];
  const [selectedOption, setSelectedOption] = useState("oilpainting");
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <h3>여러분의 생각을 그림으로 남겨드립니다.</h3>
      <form onSubmit={handelSubmit}>
        <input
          type="text"
          value={text}
          placeholder="책을 읽고 소감을 작성해 보세요.
        예시) 들판에 핀 안개 꽃"
          onChange={handleTextChnage}
        />
      </form>
      <div>
        <img src={oilpainting} width="40px" height="40px" />
        <img src={oneline} width="40px" height="40px" />
      </div>
      <div>
        {options.map((option) => (
          <label key={option}>
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            {option}
          </label>
        ))}
      </div>
      <button type="submit">변환하기</button>
    </>
  );
};

export default Form;
