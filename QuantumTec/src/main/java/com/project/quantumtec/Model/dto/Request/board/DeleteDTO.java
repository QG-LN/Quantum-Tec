package com.project.quantumtec.Model.dto.Request.board;

import lombok.Data;

@Data
public class DeleteDTO { // 게시글 삭제 요청 DTO
    private int postIndex; // 게시글 번호
    private String userID; // 유저 아이디
    private int update_result; // 게시글 삭제 결과
}
