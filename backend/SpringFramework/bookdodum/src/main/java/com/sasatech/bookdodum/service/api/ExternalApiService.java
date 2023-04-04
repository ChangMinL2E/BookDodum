package com.sasatech.bookdodum.service.api;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;


@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class ExternalApiService {

    String API = "http://data4library.kr/api/libSrchByBook?authKey=51a8da7baad88780d6babbd001a93462a79d0ba621c9b1cb06f620b0b5f766a4";
    RestTemplate restTemplate;

    public ResponseEntity getBestKeywordAPI(String year, String month) {
        restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // 이달의 키워드 조회
        String url = API + "&month=" + year + "-" + month;
        ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.GET, entity, JsonNode.class);

        return response;
    }

    public ResponseEntity getLibraryAPI(String isbn, String regionCode) {
        restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // 도서 소장 도서관 정보 불러오기
        String url = API + "&isbn=" + isbn + "&region=" + regionCode + "&format=json";
        ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.GET, entity, JsonNode.class);

        return response;
    }

    public ResponseEntity getItemSrchAPI(String isbn, String libCode) {
        restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // 도서관별 장서/대출 데이터 조회
        String url = API + "&type=ALL&libCode=" + libCode + "&isbn13=" + isbn + "&format=json";
        ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.GET, entity, JsonNode.class);

        return response;
    }

    public ResponseEntity getBookExistAPI(String isbn, String libCode) {
        restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // 도서관별 도서 소장여부 및 대출 가능여부 조회
        String url = API + "&libCode=" + libCode + "&isbn13=" + isbn + "&format=json";
        ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.GET, entity, JsonNode.class);

        return response;
    }

    public ResponseEntity getRegionCodeAPI(String longitude, String latitude) {
        restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK 478bf2d6060b924f62f3dd80e053b26d");
        HttpEntity<String> entity = new HttpEntity<>(headers);


        // 현재 좌표를 기준으로 지역코드 불러오기
        String url = "https://dapi.kakao.com/v2/local/geo/coord2address.json?x=" + longitude + "&y=" + latitude + "&input_coord=WGS84";

        ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.GET, entity, JsonNode.class);

        return response;
    }

    public ResponseEntity<?> getLibraryBooksAPI(String regionCode) {
        restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // 내 지역 도서관 인기 대출 도서 목록 조회
        String url = "http://data4library.kr/api/loanItemSrchByLib?authKey=51a8da7baad88780d6babbd001a93462a79d0ba621c9b1cb06f620b0b5f766a4&month&region=" + regionCode + "&format=json";

        ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.GET, entity, JsonNode.class);

        return response;
    }
}
