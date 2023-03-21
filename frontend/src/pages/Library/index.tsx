import React from 'react';
import NavBack from '../../Components/Contents/NavBack';
import LibraryList from './LibraryList';

export default function Library() {
    return (
        <>
            <NavBack text="'불편한 편의점' 도서관 정보" link="-1" />
            <LibraryList/>
        </>
    );
}



