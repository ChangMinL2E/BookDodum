package com.sasatech.bookdodum.service.book;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.zxing.*;

import com.sasatech.bookdodum.dto.resposne.book.*;
import org.springframework.http.*;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;
import com.sasatech.bookdodum.dto.request.book.BookConvertRequestDto;
import com.sasatech.bookdodum.dto.resposne.user.UserResponseDto;
import com.sasatech.bookdodum.entity.book.Book;
import com.sasatech.bookdodum.entity.book.Category;
import com.sasatech.bookdodum.entity.user.User;
import com.sasatech.bookdodum.entity.user.UserBook;
import com.sasatech.bookdodum.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import javax.imageio.ImageIO;

import java.awt.image.BufferedImage;
import java.io.*;
import java.util.*;


@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final UserBookRepository userBookRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final UserBookQdslRepositoryImpl userBookQdslRepositoryImpl;


    public boolean addBook(Long bookId, Long userId) {
        Book book = bookRepository.findById(bookId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();

        // 이미 등록한 책이 있다면?
        if (userBookRepository.findByBook_IdAndUser_Id(bookId, userId) != null) {
            return false;
        }

        userBookRepository.save(UserBook.builder()
                .book(book)
                .user(user)
                .endTime(null)
                .build());

        return true;
    }


    public List<BookListResponseDto> listBook(Long userId, boolean fin) {
        List<BookListResponseDto> list = new ArrayList<>();
        List<UserBook> listUserBook = userBookQdslRepositoryImpl.findUserBook(userId, fin);

        return getBookListResponseDtos(list, listUserBook);
    }


    public List<BookListResponseDto> listAllBook(Long userId) {
        List<BookListResponseDto> list = new ArrayList<>();
        List<UserBook> listUserBook = userBookRepository.findAllByUser_Id(userId);

        return getBookListResponseDtos(list, listUserBook);
    }


    public List<BookListResponseDto> listRecommendBook(Long bookId, Long userId) {
        // 1번 책을 읽은 모든 유저들을 가져온다.
        List<UserBook> userBookListByBookId = userBookRepository.findAllByBook_Id(bookId);

        // 내가 읽은 책 List 들을 가져온다.
        List<UserBook> myBookList = userBookRepository.findAllByUser_Id(userId);

        HashMap<Long, Long> bookCntMap = new HashMap<>();
        List<Book> bookList = new ArrayList<>();

        // 내가 가지고있는 책들은 제외한다.
        for (UserBook userBook : myBookList) {
            Book book = userBook.getBook();
            bookList.add(book);
        }



        // 유저들 중에서 나와 가장 읽은책이 많이 겹치는 유저들을 우선순위로 정렬한다.
        for (UserBook userBook : userBookListByBookId) {

            // 나는 제외
            if (userBook.getUser().getId() == userId) {
                continue;
            }

            Long cnt = 0L;

            // 해당 유저가 읽은 책 목록을 가져온다.
            User user = userBook.getUser();
            List<UserBook> userBookListByUserId = userBookRepository.findAllByUser_Id(user.getId());

            // 내 책들을 기준으로 겹치는 다른 유저의 책 개수를 구하자.
            for (UserBook myBook : myBookList) {
                for (UserBook otherBook : userBookListByUserId) {
                    if (myBook.getBook().getId() == otherBook.getBook().getId()) {
                        cnt++;
                    }
                }
            }

            bookCntMap.put(user.getId(), cnt);
        }


        List<Long> keySet = new ArrayList<>(bookCntMap.keySet());

        // Value 값으로 오름차순 정렬
        keySet.sort(new Comparator<Long>() {
            @Override
            public int compare(Long o1, Long o2) {
                return bookCntMap.get(o2).compareTo(bookCntMap.get(o1));
            }
        });

        System.out.println(bookCntMap.size());

        List<BookListResponseDto> recommendBookList = new ArrayList<>();
        
        for (Long key : keySet) {
            System.out.println("KEY: " + key);
            // 10권 이하의 책 개수만 추천을 받는다.
            if (recommendBookList.size() == 10) {
                break;
            }

            // 정렬된 유저 Id
            Long userIdSorted = key;
            List<UserBook> userBookList = userBookRepository.findAllByUser_Id(userIdSorted);

            UserBook userBook = null;
            Book book = null;

            for (UserBook uB : userBookList) {
                // 내 책과 이미 추천받은 책을 제외하고 추천받겠다.
                if (bookList.contains(uB.getBook())) {
                    continue;
                }

                // 한 권만 받으셈 ㅋㅋ
                userBook = uB;
                System.out.println(userBook.getBook().getId());
                break;
            }

            if (userBook != null) {
                book = userBook.getBook();
            }

            // 중복되는 책이 아닌 경우에만..
            if (book != null && !bookList.contains(book)) {
                System.out.println(book.getId() + " 추가!");
                bookList.add(book);

                List<Category> categoryList = categoryRepository.findAllByBook_Id(book.getId());
                List<String> categories = new ArrayList<>();

                for (Category category : categoryList) {
                    categories.add(category.getKind());
                }

                recommendBookList.add(BookListResponseDto.builder()
                        .bookId(book.getId())
                        .isbn(book.getIsbn())
                        .imageUrl(book.getImageUrl())
                        .title(book.getTitle())
                        .publisher(book.getPublisher())
                        .category(categories)
                        .convertedImageUrl(userBook.getConvertedImageUrl())
                        .build());
            }
        }
        return recommendBookList;
    }

    private List<BookListResponseDto> getBookListResponseDtos(List<BookListResponseDto> list, List<UserBook> listUserBook) {
        for (UserBook userBook : listUserBook) {
            Long bookId = userBook.getBook().getId();
            Book myBook = bookRepository.findById(bookId).orElseThrow();

            List<Category> categoryList = categoryRepository.findAllByBook_Id(myBook.getId());
            List<String> categories = new ArrayList<>();
            for (Category category : categoryList) {
                categories.add(category.getKind());
            }

            list.add(BookListResponseDto.builder()
                    .bookId(myBook.getId())
                    .imageUrl(myBook.getImageUrl())
                    .title(myBook.getTitle())
                    .publisher(myBook.getPublisher())
                    .category(categories)
                    .convertedImageUrl(userBook.getConvertedImageUrl())
                    .build());
        }

        return list;
    }


    public BookResponseDto readIsbn(String path, User user) {

        Book book = null;
        String isbn = null;

        try {
            // base64 데이터 추출
            String base64Data = path.split(",")[1];
            base64Data = base64Data.replaceAll(" ", "+");
            base64Data = base64Data.replaceAll("[^A-Za-z0-9+/=]", "");

            byte[] decodedBytes = Base64.getDecoder().decode(base64Data);

            // 이미지 파일로 저장
            FileOutputStream outputStream = new FileOutputStream("isbn.png");
            outputStream.write(decodedBytes);
            outputStream.close();

//            FileUtils.writeByteArrayToFile(new File("isbn.png"), decodedBytes, true);


            BufferedImage bf = ImageIO.read(new FileInputStream("isbn.png"));

            BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(
                    new BufferedImageLuminanceSource(bf)
            ));

            Map<DecodeHintType, Object> hints = new EnumMap<>(DecodeHintType.class);
            hints.put(DecodeHintType.PURE_BARCODE, true);

            Result result = new MultiFormatReader().decode(bitmap, hints);

            isbn = result.getText();

            // ISBN 기반으로 책 정보 찾기
            book = bookRepository.findByIsbn(isbn);


            if (book == null) {
                RestTemplate restTemplate = new RestTemplate();
                HttpHeaders headersNaver = new HttpHeaders();
                headersNaver.add("X-Naver-Client-Id", "iNmjOGNhSotP8VhR1gxo");
                headersNaver.add("X-Naver-Client-Secret", "wruKOyBChg");

                HttpEntity<String> entity = new HttpEntity<String>(headersNaver);
                // 공공 네이버 API 를 통해 책을 찾아서 return
                String url = "https://openapi.naver.com/v1/search/book.json?query=" + isbn;
                ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

                String body = response.getBody();
                System.out.println(body);

                ObjectMapper mapper = new ObjectMapper();
                JsonNode root = mapper.readTree(response.getBody());


                String title = root.path("items").get(0).path("title").asText();
                String image = root.path("items").get(0).path("image").asText();
                String author = root.path("items").get(0).path("author").asText();
                String publisher = root.path("items").get(0).path("publisher").asText();
                String content = root.path("items").get(0).path("description").asText();
                String siteUrl = root.path("items").get(0).path("link").asText();

                book = bookRepository.save(Book.builder()
                        .title(title)
                        .author(author)
                        .publisher(publisher)
                        .imageUrl(image)
                        .isbn(isbn)
                        .siteUrl(siteUrl)
                        .category(null)
                        .content(content)
                        .build());


                NewBookDetailResponseDto build = NewBookDetailResponseDto.builder()
                        .name(user.getName())
                        .isbn(isbn)
                        .data(BookDataResponseDto.builder()
                                .title(title)
                                .image_url(image)
                                .author(author)
                                .publisher(publisher)
                                .isbn(isbn)
                                .category(null)
                                .content(content)
                                .build())
                        .build();

                ObjectMapper objectMapper = new ObjectMapper();
                String jsonString = objectMapper.writeValueAsString(build);


                // =================================================================================================== //

                // Django 서버 add_book 에 요청
                ResponseEntity<String> request = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

                // 요청 헤더 설정
                HttpHeaders headersDjango = new HttpHeaders();
                headersDjango.setContentType(MediaType.APPLICATION_JSON);

                // 요청 엔티티 설정
                HttpEntity<String> requestEntity = new HttpEntity<>(jsonString, headersDjango);

                // 요청 보내기
                String addBookPath = "http://43.201.102.210:8000/books/add_book";
                ResponseEntity<String> responseEntity = restTemplate.postForEntity(addBookPath, requestEntity, String.class);

                // 응답 받은 데이터 출력
                String responseBody = responseEntity.getBody();
                System.out.println(responseBody);
            }

            return BookResponseDto.builder()
                    .id(book.getId())
                    .author(book.getAuthor())
                    .category(book.getCategory())
                    .content(book.getContent())
                    .imageUrl(book.getImageUrl())
                    .isbn(book.getIsbn())
                    .publisher(book.getPublisher())
                    .siteUrl(book.getSiteUrl())
                    .title(book.getTitle())
                    .build();

        } catch (Exception e) {
            e.printStackTrace();

            // 책을 인식하지 못한경우..

            return null;
        }
    }


    public boolean deleteBook(Long bookId, Long userId) {
        // userId 와 bookId를 FK로 가진 userBook row 삭제
        try {
            userBookRepository.deleteByBook_IdAndUser_Id(bookId, userId);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    public boolean finishBook(Long bookId, Long userId) {

        try {
            // 다 읽은 책의 id를 통해 userBook 을 찾는다.
            UserBook userBook = userBookRepository.findByBook_IdAndUser_Id(bookId, userId);

            Date date = new Date();

            // endTime 을 제외하고 Update
            userBookRepository.save(UserBook.builder()
                    .id(userBook.getId())
                    .book(userBook.getBook())
                    .user(userBook.getUser())
                    .startTime(userBook.getStartTime())
                    .endTime(date)
                    .build());

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public BookDetailResponseDto detailBook(Long bookId, Long userId) {

        Book book = userBookRepository.findByBook_IdAndUser_Id(bookId, userId).getBook();

        return BookDetailResponseDto.builder()
                .imageUrl(book.getImageUrl())
                .title(book.getTitle())
                .author(book.getAuthor())
                .publisher(book.getPublisher())
                .content(book.getContent())
                .build();
    }

    public List<UserResponseDto> listReadWith(Long bookId, Long userId) {

        // userBook 테이블에서 아직 책을 읽고있는 (endTime 과 startTime 이 다른..),
        // 나의 bookId 와 같은 row들을 구하자.
        // 그 row 에서 userId만 뽑아서 return 하셈 ㅋㅋ
        List<UserBook> list = userBookQdslRepositoryImpl.findUserByReadWith(bookId, userId);
        List<UserResponseDto> dtoList = new ArrayList<>();

        for (UserBook userBook : list) {
            Long readWithUserId = userBook.getUser().getId();
            User readWithUser = userRepository.findById(readWithUserId).orElseThrow();

            // 내 아이디를 제외하고 가져오기
            if (readWithUser.getId() != userId) {
                dtoList.add(UserResponseDto.builder()
                        .name(readWithUser.getName())
                        .build());
            }
        }

        return dtoList;
    }

    public boolean convertBook(BookConvertRequestDto bookConvertRequestDto, Long userId) {
        // userBook 에 convertedImageUrl 를 update
        try {

            System.out.println(bookConvertRequestDto.getConvertedImageUrl());
            System.out.println(bookConvertRequestDto.getBookId());

            UserBook userBook = userBookRepository.findByBook_IdAndUser_Id(bookConvertRequestDto.getBookId(), userId);

            String path = bookConvertRequestDto.getConvertedImageUrl();

            System.out.println(userBook.getId());

            userBookRepository.save(UserBook.builder()
                    .id(userBook.getId())
                    .startTime(userBook.getStartTime())
                    .endTime(userBook.getEndTime())
                    .book(userBook.getBook())
                    .user(userBook.getUser())
                    .convertedImageUrl(path)
                    .build());
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean searchBook(String isbn) {
        if(bookRepository.existsByIsbn(isbn)){
            return true;
        }else{
            return false;
        }
    }

    //도서관에서 책 isbn 넘어오면 책 정보 return
    public BookResponseDto infoBook(String isbn) {
        Book infoBook = bookRepository.findByIsbn(isbn);

        return BookResponseDto.builder()
                .id(infoBook.getId())
                .title(infoBook.getTitle())
                .author(infoBook.getAuthor())
                .publisher(infoBook.getPublisher())
                .imageUrl(infoBook.getImageUrl())
                .isbn(infoBook.getIsbn())
                .siteUrl(infoBook.getSiteUrl())
                .content(infoBook.getContent())
                .category(infoBook.getCategory())
                .build();

    }
}







//    public List<Book> convertCategory() {
//        List<Book> books = bookRepository.findAll();
//        Pattern pattern = Pattern.compile("[\\w가-힣]+");
//
//        for (Book book : books) {
//            String category = book.getCategory();
//            Matcher matcher = pattern.matcher(category);
//
//            while (matcher.find()) {
//                String kind = matcher.group();
//
//                categoryRepository.save(Category.builder()
//                        .book(book)
//                        .kind(kind)
//                        .build()
//                );
//            }
//        }
//
//        return null;
//    }