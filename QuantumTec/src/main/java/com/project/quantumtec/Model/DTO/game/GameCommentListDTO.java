package com.project.quantumtec.Model.DTO.game;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import com.project.quantumtec.Model.DTO.Request.board.ListDTO;
import lombok.Data;
import lombok.Getter;

/**
 * PackageName : com.project.quantumtec.DTO.game
 * FileName : GameCommentListDTO
 * Author : Argonaut
 * Date : 2023-06-13
 * Description :
 */
@Data
public class GameCommentListDTO {
    private int pageNum;                   // 페이지(로딩 단위)
    private int startIndex;             // 페이지(로딩 단위) 당 시작 댓글 번호
    private int endIndex;                // 페이지(로딩 단위) 당 표시할 댓글 수
    private int gameIndex;              // 게임 번호
    private GameCommentListDTO.SortType sortType; // 정렬 기준


    private enum SortType {
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
        public static ListDTO.SortType from(String value) {
            for (ListDTO.SortType sortType1 : ListDTO.SortType.values()) {
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
