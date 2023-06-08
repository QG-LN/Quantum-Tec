package com.project.quantumtec.DTO.board;

import lombok.Data;

@Data
public class BoardViewRequestDTO {
    private int userIndex;           // 유저 인덱스
    private int postIndex;           // 게시글 인덱스
}
