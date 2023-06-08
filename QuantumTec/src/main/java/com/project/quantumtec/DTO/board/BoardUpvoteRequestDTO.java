package com.project.quantumtec.DTO.board;

import lombok.Data;

@Data
public class BoardUpvoteRequestDTO {

    private int postIndex; // 게시글 번호
    private int userIndex; // 유저 번호
}
