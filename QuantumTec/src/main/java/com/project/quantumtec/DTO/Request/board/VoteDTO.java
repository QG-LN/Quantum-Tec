package com.project.quantumtec.DTO.Request.board;

import lombok.Data;

@Data
public class VoteDTO {  // 게시글 추천/비추천 요청 DTO

    private int postIndex; // 게시글 번호
    private String userID; // 유저 아이디
}
