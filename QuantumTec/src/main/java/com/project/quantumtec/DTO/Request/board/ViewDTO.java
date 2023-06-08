package com.project.quantumtec.DTO.Request.board;

import lombok.Data;

@Data
public class ViewDTO {  // 게시글 조회 요청 DTO
    private int userIndex;           // 유저 인덱스
    private int postIndex;           // 게시글 인덱스
}
