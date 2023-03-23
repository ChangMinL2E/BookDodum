import React from 'react';
import List from './List';
import TextInput from './TextInput';

export default function GroupRoom() {
  const title = "구의 증명을 읽고난 후,"

  return (
    <>
      <List title={title} />
      <TextInput />
    </>
  );
}

