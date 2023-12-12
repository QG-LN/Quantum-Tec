package com.project.quantumtec.Model.dto.Response.dashboard.board;

import lombok.Data;

@Data
public class BoardPostActivityDTO {
    private int viewCount; // 게시글 조회수
    private int commentCount; // 게시글 댓글 수
}
