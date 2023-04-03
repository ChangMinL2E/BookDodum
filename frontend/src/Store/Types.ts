export interface Book {
  imageUrl: string;
  title: string;
  category: string[];
  publisher: string;
  isbn: number;
}

// bookId 있는 버전
export interface BookInfo {
  bookId: number;
  imageUrl: string;
  publisher: string;
  title: string;
  category: string[];
  isbn: number;
}

// user의 book
export interface UserBook {
  bookId: number;
  imageUrl: string;
  title: string;
  publisher: string;
  category: string[];
  convertedImageUrl?: string;
}

// 도서관 정보
export interface LibraryType {
  libCode: number;
  libName: string;
  address: string;
  latitude: number;
  longitude: number;
  homepage: string;
  closed: string;
  operatingTime: string;
  tel: string;
}

// 도서관의 해당 도서 분류/위치 정보
export interface LibInfo {
  bookName: string;
  classNum: string;
  bookCode: string;
  locName: string;
}

// 지역 도서관 추천 도서
export interface LibraryBook  {
    imageUrl: string;
    ISBN: number;
    ranking: string;
    title: string;
  }

// 독서 모임 정보
export interface MeetingInfo {
    meetingId: number;
    title: string;
    content: string;
    leaderUserName: string;
    leaderUserId: number;
    commentCnt: number;
    imageUrl: string;
}

// 독서 모임 댓글 정보
export interface CommentInfo {
  commentId: number;
  userId: number;
  userName: string;
  leader_content: string | null;
  content: string;
}

export interface User {
  nickname: string;
}
