import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import useSelectorTyped from "../../Store";
import bookside from "../../Assets/Images/bookside.png";
import booktop from "../../Assets/Images/booktop.png";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
// APIs
import { getContentsRecommendAPI } from "../../apis/recommend";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper";
import { Pagination } from "swiper";
import Loading from "../../Components/Common/Loading";
import { useNavigate } from "react-router-dom";

interface ImageProps {
  imageUrl: string;
}

interface Book {
  imageUrl: string;
  title: string;
  category: string[];
  publisher: string;
  author: string;
  isbn: string;
}

export default function Result() {
  const navigate = useNavigate();
  const nickname = useSelectorTyped((state) => state.user.name);
  const userId = useSelectorTyped((state) => state.user.userid);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getConentsRecommend();
  }, []);

  setTimeout(() => {
    setIsLoading(false);
  }, 4000);

  const getConentsRecommend = async () => {
    const data = await getContentsRecommendAPI(userId);

    let tmp: Book[] = [];
    data?.forEach((book: any) => {
      let test = book.category.replaceAll("'", '"');
      let category = JSON.parse(test);
      tmp.push({
        title: book.title,
        category: category,
        imageUrl: book.image_url,
        publisher: book.publisher,
        author: book.author,
        isbn: book.isbn,
      });
    });
    setBooks(tmp);
  };

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Title>
            {nickname}님을 위한 <br />
            추천도서
          </Title>
          <Tags>#취향분석 #맞춤추천</Tags>
          <Contents>
            <SwiperWrap>
              <Swiper
                style={{ height: "100%" }}
                modules={[Pagination, Autoplay]}
                direction={"vertical"}
                pagination={{
                  clickable: true,
                }}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="mySwiper"
              >
                {books?.map((book) => {
                  return (
                    <SwiperSlide key={book.title}>
                      <BookInfo>
                        <BookShape>
                          <Top></Top>
                          <Side></Side>
                          <Front imageUrl={book.imageUrl}></Front>
                        </BookShape>
                        <Info>
                          <BookTitle>
                            {book.title.length > 15
                              ? book.title.slice(0, 15) + "..."
                              : book.title}
                          </BookTitle>
                          <Categories>
                            {book?.category.map((item, idx) => (
                              <Category key={idx}>{item}</Category>
                            ))}
                          </Categories>
                          <InfoBottom>
                            <Author>글: {book.author}</Author>
                            <Publisher>출판사: {book.publisher}</Publisher>
                          </InfoBottom>
                        </Info>
                      </BookInfo>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </SwiperWrap>
          </Contents>
          <Btn onClick={() => navigate("/")}>
            <div>북돋움 시작하기</div>
            <ArrowRightIcon width="20px" style={{ marginLeft: "2%" }} />
          </Btn>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  z-index: 5;
  width: 100%;
  height: 100vh;
  background-color: #e3e3cf;
  max-width: 35rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-family: "Gowun Dodum", sans-serif;
  font-weight: 800;
  font-size: 25px;
  text-align: center;
  margin: 5% auto 5% auto;
`;

const Tags = styled.div`
  font-family: "Nanum Gothic Coding", monospace;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 2%;
  font-style: italic;
  color: #787878;
`;

const Contents = styled.div`
  width: 90%;
  height: 60%;
  margin: 10% 0 5% 0;
  border-radius: 200px 200px 0 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SwiperWrap = styled.div`
  margin: auto;
  width: 100%;
  height: 95%;
`;

const BookInfo = styled.div`
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BookShape = styled.div`
  margin: 6% 0 0 0;
  transform-style: preserve-3d;
  transform: rotateX(20deg) rotateY(20deg);
  height: 270px;
  width: 180px;
  > div {
    position: absolute;
  }
`;
const Top = styled.div`
  transform: rotateX(90deg) translateZ(18px) translateX(-7px) translateY(45px);
  width: 180px;
  height: 50px;
  background-image: url(${booktop});
  background-size: cover;
`;

const Side = styled.div`
  width: 50px;
  height: 270px;
  background-image: url(${bookside});
  background-size: cover;
  transform: rotateY(90deg) translateZ(346px) translateX(500px)
    translateY(-205px);
`;
const Front = styled.div<ImageProps>`
  width: 180px;
  height: 270px;
  background-size: cover;
  background-image: url(${(props: ImageProps) => props.imageUrl});
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5% 0 0 0;
`;

const BookTitle = styled.div`
  font-size: 19px;
  margin: 5% 0 4% 0;
  font-family: "Nanum Gothic Coding", monospace;
  font-weight: bold;
  color: #65625e;
`;
const Categories = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Category = styled.div`
  padding: 0.5% 2%;
  font-size: 13px;
  margin: 0 1%;
  border: 1px solid black;
  height: 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoBottom = styled.div`
  display: flex;
  font-size: 12px;
  color: #6c6c6c;
  width: 100%;
  justify-content: center;
  > div {
    margin: 3% 2%;
  }
`;
const Author = styled.div``;
const Publisher = styled.div``;

const Btn = styled.div`
  margin: 3% 0 0 0;
  width: 80%;
  padding: 4%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-name: ${keyframes`
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-7px);
      }
    `};
  > div {
    font-size: 1.1rem;
    font-family: "Gowun Batang", serif;
    font-weight: 600;
  }
`;
