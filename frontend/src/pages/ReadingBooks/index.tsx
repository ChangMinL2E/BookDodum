import React from 'react';
import BookBanner from '../../Components/Contents/BookBanner';
import UserProfile from '../../Components/Contents/UserProfile';
import picture from '../../Assets/Images/userprofile.png';



export default function Mybook() {
    return (
        <>
         <BookBanner/>
         <UserProfile imageUrl={picture} username={'혜씌'}/>
        </>
    );
}
