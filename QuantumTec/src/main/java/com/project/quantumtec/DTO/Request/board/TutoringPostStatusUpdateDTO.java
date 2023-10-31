package com.project.quantumtec.DTO.Request.board;

import lombok.Data;

@Data
public class TutoringPostStatusUpdateDTO {
    private int postIndex;                  // 게시글 번호
    private boolean postStatus;             // 게시글 활성화 상태
}
