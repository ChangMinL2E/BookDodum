import React from "react";
import styled from "styled-components";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { deleteCommentAPI } from "../../apis/write";

interface CommentProps {
  content: string;
}



export default function Comment({ content}: CommentProps) {
  const deleteComment  = async () => {
    const data = await deleteCommentAPI()
  }
  return (
    <>
      <CommentBox
        style={{
          backgroundColor:
            Math.round(Math.random()) + 1 === 1 ? "#DBD4C3" : "#F7F3EB",
        }}
      >
        {content}
        <Icon onClick={deleteComment}>
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
  top:0px;
  right: 10px;
`;
