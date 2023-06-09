package com.sasatech.bookdodum.controller;


import com.sasatech.bookdodum.service.api.ExternalApiService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "External", description = "외부 API 관련")
@RestController
@RequestMapping("/external")
@RequiredArgsConstructor
public class ExternalApiController {

    // 변경사항 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // 변경사항 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // 변경사항 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // 변경사항 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // 씨발
    // 씨개

    private final ExternalApiService externalApiService;


    // 이달의 키워드 조회
    @GetMapping("/bestkeyword")
    @Operation(summary = "이달의 키워드 조회")
    public ResponseEntity<?> getBestKeywordAPI(@RequestParam("year") String year,
                                               @RequestParam("month") String month){
        return externalApiService.getBestKeywordAPI(year, month);
    }

    // 도서 소장 도서관 정보 불러오기
    @GetMapping("/library")
    @Operation(summary = "도서 소장 도서관 정보 불러오기")
    public ResponseEntity<?> getLibraryAPI(@RequestParam("isbn") String isbn,
                                           @RequestParam("regioncode") String regionCode){
        return externalApiService.getLibraryAPI(isbn, regionCode);
    }

    // 도서관별 장서/대출 데이터 조회
    @GetMapping("/itemsrch")
    @Operation(summary = "도서관별 장서/대출 데이터 조회")
    public ResponseEntity<?> getItemSrchAPI(@RequestParam("isbn") String isbn,
                                            @RequestParam("libcode") String libCode){
        return externalApiService.getItemSrchAPI(isbn, libCode);
    }

    // 도서관별 도서 소장여부 및 대출 가능여부 조회
    @GetMapping("/bookexist")
    @Operation(summary = "도서관별 도서 소장여부 및 대출 가능여부 조회")
    public ResponseEntity<?> getBookExistAPI(@RequestParam("isbn") String isbn,
                                             @RequestParam("libcode") String libCode){
        return externalApiService.getBookExistAPI(isbn, libCode);
    }

    // 현재 좌표를 기준으로 지역코드 불러오기
    @GetMapping("/regioncode")
    @Operation(summary = "현재 좌표를 기준으로 지역코드 불러오기")
    public String getRegionCodeAPI(@RequestParam("longitude") String longitude,
                                              @RequestParam("latitude") String latitude){
        System.out.println(longitude + ", " +latitude);
        return externalApiService.getRegionCodeAPI(longitude, latitude);
    }

    // 내 지역 도서관 인기 대출 도서 목록 조회
    @GetMapping("/librarybooks")
    @Operation(summary = "내 지역 도서관 인기 대출 도서 목록 조회")
    public ResponseEntity<?> getLibraryBooksAPI(@RequestParam("regioncode") String regionCode) {

        return externalApiService.getLibraryBooksAPI(regionCode);
    }

}
