import React, { useState } from 'react';
import styled from 'styled-components';
import BookCover from './BookCover';
import { Book } from '../../Store/Types'
import DetailModal from './DetailModal';

// 타입선언
interface Props {
  book: Book
}

export default function BookCard({ book }: Props) {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const openModal = (): void => {
    setModalOpen(!modalOpen)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeModal = (): void => {
    setModalOpen(false);
  }

  return (
    <Container>
      {modalOpen && <DetailModal ISBN={book?.isbn} closeModal={closeModal} modalOpen={modalOpen} /> }
      <BookCover imageUrl={book?.imageUrl} size={130} />
      <Contents onClick={openModal}>
        <BookTitle >{book?.title.length > 8? book?.title.slice(0 ,8)+"..." : book.title}</BookTitle>
        <Categories>
          <>
            {
              book.category.map((text) => {
                return (
                  <Category key={text} >{text}</Category>
                )
              })
            }
          </>
        </Categories>
        <Company>{book?.publisher}</Company>
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  width: 130px;
  margin: auto 4% 15% 4%;
`;

const Contents = styled.div`
`

const BookTitle = styled.div`
  font-size: 14;
  font-weight: bold;
  margin-top: 10%;
`;

const Categories = styled.div`
  display: flex;
 flex-wrap: wrap;
`;

const Category = styled.div`
  border: solid #5c5649 1px;
  border-radius: 20px;
  margin: 3% 2% 1% 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  padding: 3% 4%;
  `;

const Company = styled.div`
  font-size: 11px;
  color: #9b9b9b;
  margin-top:4%;
`;
