import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import NavBack from '../../Components/Contents/NavBack';
import LibraryList from './LibraryList';

export default function Library() {
   const title = useLocation().state.title;

   let text = ''
   if(title.length > 15) text = title.slice(0, 15) + '... 도서관 정보'
    else text = title + ' 도서관 정보'

    return (
        <>
            <NavBack text={text} link="-1" />
            <LibraryList/>
        </>
    );
}



