package com.project.quantumtec.DTO.board;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Data;
import lombok.Getter;

@Data
public class BoardCommentListRequestDTO {
    private int pageNum;                   // 페이지(로딩 단위)
    private int startIndex;             // 페이지(로딩 단위) 당 시작 댓글 번호
    private int endIndex;                // 페이지(로딩 단위) 당 표시할 댓글 수
    private int postIndex; // 게시글 번호
    private SortType sortType; // 정렬 기준


    private enum SortType{
        DATE("date"), // 등록순
        UPVOTE("upvote"), // 추천순
        DOWNVOTE("downvote"), // 비추천순
        RATING("rating"); // 평점순

        @Getter
        private final String value;

        SortType(String value) {
            this.value = value;
        }

        // 역 직렬화
        @JsonCreator
        public static BoardListRequestDTO.SortType from(String value) {
            for (BoardListRequestDTO.SortType sortType1 : BoardListRequestDTO.SortType.values()) {
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
}
