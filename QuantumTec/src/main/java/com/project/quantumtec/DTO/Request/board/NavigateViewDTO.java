package com.project.quantumtec.DTO.Request.board;

import lombok.Data;

@Data
public class NavigateViewDTO {

    private int boardIndex; // 게시판 번호

    private int postIndex; // 게시글 번호

    private int userIndex; // 유저 번호
}
