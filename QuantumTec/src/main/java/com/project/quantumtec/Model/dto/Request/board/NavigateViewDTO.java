package com.project.quantumtec.Model.dto.Request.board;

import lombok.Data;

@Data
public class NavigateViewDTO {

    private int boardIndex; // 게시판 번호

    private int postIndex; // 게시글 번호

    private String userID; // 유저 아이디
}
