package com.project.quantumtec.Model.dto.Request.board;

import lombok.Data;

@Data
public class TutoringDeleteDTO {
    private int postIndex; // 게시글 번호
    private String userID; // 유저 아이디
}
