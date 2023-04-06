package com.sasatech.bookdodum.service.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


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

    public String getRegionCodeAPI(String longitude, String latitude) {
        restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK a2fdc2709cf221f727ad494fbeae1392");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ////

        // 현재 좌표를 기준으로 지역코드 불러오기
        String url = "https://dapi.kakao.com/v2/local/geo/coord2address.json?x=" + longitude + "&y=" + latitude + "&input_coord=WGS84";

        System.out.println(url);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            JsonNode jsonNode = objectMapper.readTree(response.getBody());
            String region1DepthName = jsonNode.get("documents")
                    .get(0)
                    .get("address")
                    .get("region_1depth_name")
                    .asText();

            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("region_1depth_name", region1DepthName);
            ResponseEntity<JsonObject> response2 = new ResponseEntity<>(jsonObject, HttpStatus.OK);

            System.out.println("====================");
            System.out.println(response2.getBody());
            System.out.println("====================");


            String responseString = response2.getBody().toString(); // 응답 문자열 예시
            String parsed = "";

            // 정규 표현식을 사용하여 "광주"라는 문자열 추출
            Pattern pattern = Pattern.compile("'([^']*)'");
            Matcher matcher = pattern.matcher(responseString);

            parsed = matcher.group(1);
            System.out.println(parsed); // "광주" 출력

            if (matcher.find()) {
                parsed = matcher.group(1);
                System.out.println(parsed); // "광주" 출력
            }

            System.out.println("======");
            System.out.println(parsed); // "광주" 출력
            System.out.println("======");

            return parsed;

        } catch (Exception e) {
            e.printStackTrace();

            return null;
        }
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