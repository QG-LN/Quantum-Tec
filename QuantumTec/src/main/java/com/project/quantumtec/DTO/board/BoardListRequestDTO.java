package com.project.quantumtec.DTO.board;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Data;
import lombok.Getter;

@Data
public class BoardListRequestDTO {
    private int pageNum;                   // 페이지
    private int startIndex;             // 페이지 당 시작 게시글 번호
    private int endIndex;                // 페이지 당 표시할 게시글 수
    private int boardIndex;           // 게시판 종류, 전체는 0을 받음
    private SortType sortType;        // 정렬 타입
    private SearchType searchType;     // 검색 타입
    private String searchKeyword;  // 검색 키워드

    // 게시판 정렬 타입
    public enum SortType {
        LATEST("latest"),     // 최신순
        PAST("past"),       // 과거순
        UPVOTE("upvote");   // 추천순

        @Getter
        private final String value;

        SortType(String value) {
            this.value = value;
        }

        // 역 직렬화
        @JsonCreator
        public static SortType from(String value) {
            for (SortType sortType1 : SortType.values()) {
                if (sortType1.getValue().equals(value)) {
                    return sortType1;
                }
            }
            return null;
        }

        // 직렬화
        @JsonValue
        public String getValue() {
            return value;
        }
    }

    // 게시판 검색 타입
    public enum SearchType {
        TITLE("title"),      // 제목
        AUTHOR("author"),      // 작성자
        TITLE_AUTHOR("title_author"); // 제목 + 작성자

        @Getter
        private final String value;

        SearchType(String value) {
            this.value = value;
        }

        // 역 직렬화
        @JsonCreator
        public static SearchType from(String value) {
            for (SearchType searchType1 : SearchType.values()) {
                if (searchType1.getValue().equals(value)) {
                    return searchType1;
                }
            }
            return null;
        }

        // 직렬화
        @JsonValue
        public String getValue() {
            return value;
        }
    }


}
