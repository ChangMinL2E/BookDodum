package com.sasatech.bookdodum.service.api;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;


@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class ExternalApiService {

    String LIBRARY_API_URL = "http://data4library.kr/api";
    String LIBRARY_API_KEY = "8d68d2128616bfdd1da6626c700be7582d734f42a805a55b497eea79cca5f424";

    RestTemplate restTemplate;

    public ResponseEntity getBestKeywordAPI(String year, String month) {
        restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        HttpEntity<String> entity = new HttpEntity<>(headers);

        // 이달의 키워드 조회
        String url = LIBRARY_API_URL + "/monthlyKeywords?authKey=" + LIBRARY_API_KEY + "&month=" + year + "-" + month + "&format=json";

        System.out.println(url);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        System.out.println("======== getBestKeywordAPI ======");
        System.out.println(response);
        System.out.println("========  ======");

        return response;
    }

    public ResponseEntity getLibraryAPI(String isbn, String regionCode) {
        restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // 도서 소장 도서관 정보 불러오기
        String url = LIBRARY_API_URL + "/libSrchByBook?authKey=" + LIBRARY_API_KEY + "&isbn=" + isbn + "&region=" + regionCode +"&format=json";
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return response;
    }

    public ResponseEntity getItemSrchAPI(String isbn, String libCode) {
        restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // 도서관별 장서/대출 데이터 조회
        String url = LIBRARY_API_URL + "/itemSrch?authKey=" + LIBRARY_API_KEY + "&type=ALL&libCode=" + libCode + "&isbn13=" + isbn + "&format=json";
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return response;
    }

    public ResponseEntity getBookExistAPI(String isbn, String libCode) {
        restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // 도서관별 도서 소장여부 및 대출 가능여부 조회
        String url = LIBRARY_API_URL + "/bookExist?authKey=" + LIBRARY_API_KEY + "&libCode=" + libCode + "&isbn13="+ isbn + "&format=json";
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return response;
    }

    public ResponseEntity getRegionCodeAPI(String longitude, String latitude) {
        restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK 478bf2d6060b924f62f3dd80e053b26d");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ////

        // 현재 좌표를 기준으로 지역코드 불러오기
        String url = "https://dapi.kakao.com/v2/local/geo/coord2address.json?x=" + longitude + "&y=" + latitude + "&input_coord=WGS84";

        System.out.println(url);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        String responseBody = response.getBody();
        JsonElement jsonElement = JsonParser.parseString(responseBody);
        String region1DepthName = jsonElement.getAsJsonObject()
                .getAsJsonArray("documents")
                .get(0)
                .getAsJsonObject()
                .getAsJsonObject("address")
                .get("region_1depth_name")
                .getAsString();

        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("region_1depth_name", region1DepthName);
        ResponseEntity<JsonObject> response2 = new ResponseEntity<>(jsonObject, HttpStatus.OK);

        System.out.println(response2.getBody());

        return response2;
    }

    public ResponseEntity<?> getLibraryBooksAPI(String regionCode) {
        restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // 내 지역 도서관 인기 대출 도서 목록 조회
        String url = LIBRARY_API_URL + "/loanItemSrchByLib?authKey=" + LIBRARY_API_KEY + "&region=" + regionCode + "&format=json";

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return response;
    }
}