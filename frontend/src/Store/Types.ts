export interface Book {
    imageUrl: string;
    title: string;
    categories: string[];
    publisher: string;
    ISBN:number
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
    tel : string;
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
  }
