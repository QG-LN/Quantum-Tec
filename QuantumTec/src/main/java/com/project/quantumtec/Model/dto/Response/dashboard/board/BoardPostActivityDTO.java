package com.project.quantumtec.Model.dto.Response.dashboard.board;

import lombok.Data;

@Data
public class BoardPostActivityDTO {
    private int postViewCount; // 게시글 조회수
    private int postCommentCount; // 게시글 댓글 수
}
