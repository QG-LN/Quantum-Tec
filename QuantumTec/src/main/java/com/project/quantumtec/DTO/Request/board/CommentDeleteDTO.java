package com.project.quantumtec.DTO.Request.board;

import lombok.Data;

@Data
public class CommentDeleteDTO { // 댓글 삭제 요청 DTO
    private int commentIndex; // 댓글 번호
    private int postIndex; // 게시글 번호
    private int userIndex; // 유저 번호
}
