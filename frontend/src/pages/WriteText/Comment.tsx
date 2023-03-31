import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { deleteCommentAPI } from "../../apis/write";

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
      <CommentBox
        style={{
          backgroundColor:
            Math.round(Math.random()) + 1 === 1 ? "#DBD4C3" : "#F7F3EB",
        }}
      >
        {content}
        <Icon onClick={handleClickDelete}>
          <XMarkIcon width={10} />
        </Icon>
      </CommentBox>
    </>
  );
}

const CommentBox = styled.div`
  padding: 0.5rem;
  overflow: auto;
  /* height: fit-content; */
  margin: 1rem 0.2rem 0rem;
  display: flex;
  position: relative;
  overflow: visible;
  border-radius: 0.5rem;
`;

const Icon = styled.div`
  position: absolute;
  top: 0px;
  right: 10px;
`;
