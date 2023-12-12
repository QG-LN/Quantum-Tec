package com.project.quantumtec.Model.dto.Response.dashboard.board;

import lombok.Data;

@Data
public class BoardPostActivityDTO {
    private int PostViewCount; // 게시글 조회수
    private int PostCommentCount; // 게시글 댓글 수
}
