import React from 'react';
import { useParams } from 'react-router';
import List from './List';
import TextInput from './TextInput';

export default function MeetingRoom() {
  const id: number = Number(useParams().meetid);

  return (
    <>
      <List />
      <TextInput id={id}/>
    </>
  );
}

