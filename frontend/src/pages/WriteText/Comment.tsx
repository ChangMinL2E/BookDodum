import React from "react";
import styled from "styled-components";
import { PaperClipIcon } from "@heroicons/react/24/outline";

interface CommentProps {
  comment: string;
}

export default function Comment({ comment }: CommentProps) {
  return (
    <>
    <CommentBox
      style={{
        backgroundColor:
          Math.round(Math.random()) + 1 === 1 ? "#DBD4C3" : "#F7F3EB",
      }}
    >
      {comment}
      <Icon>
      <PaperClipIcon width={15}/>
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
`;

const Icon = styled.div`
position: absolute;
top: -10px;
left: 80px;
;

    
`