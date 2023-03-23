export interface Book {
    imageUrl: string;
    title: string;
    categories: string[];
    company: string;
}

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
