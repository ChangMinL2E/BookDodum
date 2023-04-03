import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { deleteCommentAPI } from "../../apis/write";
import tape from '../../Assets/Images/tape.png'


interface CommentProps {
  content: string;
  reviewId: number;
  getWrite: () => void;
}

export default function Comment({ content, reviewId, getWrite }: CommentProps) {
  const deleteComment = async () => {
    await deleteCommentAPI(reviewId);
    getWrite();
  };

  const handleClickDelete = () => {
    deleteComment();
  };

  return (
    <>
      <CommentBox>
        {content}
        <Icon onClick={handleClickDelete}>
          <XMarkIcon width={10} />
        </Icon>
        <TapeIcon>
        </TapeIcon>
      </CommentBox>
    </>
  );
}

const CommentBox = styled.div`
  padding: 0.5rem;
  overflow: auto;
  margin: 1rem 0.2rem 0rem;
  position: relative;
  overflow: visible;
  border-radius: 0.5rem;
  background-color: #F7F3EB;
`

const Icon = styled.div`
  position: absolute;
  top: 0px;
  right: 10px;
`

const TapeIcon = styled.div`
position: absolute;
left: 50%;
top : 0;
transform: translate(-50%, -50%);
width: 60px;
height: 30px;
background-image: url(${tape});
background-repeat: no-repeat;
background-size: contain;
background-position: center;


`