package com.project.quantumtec.DTO.Request.board;

import lombok.Data;

@Data
public class ViewDTO {  // 게시글 조회 요청 DTO
    private String userID; // 유저 아이디
    private int postIndex;           // 게시글 인덱스
}
