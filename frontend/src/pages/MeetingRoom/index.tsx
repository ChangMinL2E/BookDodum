import React from 'react';
import { useParams } from 'react-router';
import List from './List';

export default function MeetingRoom() {
  const id: number = Number(useParams().meetid);

  return (
    <>
      <List />
    </>
  );
}

