package com.project.quantumtec.DTO.Response.board;

import com.project.quantumtec.VO.board.TutoringPostVO;
import lombok.Data;

import java.util.List;

@Data
public class TutoringListResponseDTO {
    private int postIndex;              // 게시글 번호
    private String userNickname;        // 작성자 닉네임
    private String postTitle;           // 게시글 제목
    private String postDate;            // 게시글 등록일
    private int maxUserCount ;          // 튜터링 참여 최대 인원
    private int userCount;              // 튜터링 참여 인원
    private String[] category;          // 튜터링 카테고리
    private String[] tags;              // 게시글 태그


    /**
     * 튜터링 게시글 VO를 DTO로 변환
     * @param tutoringPostVO 튜터링 게시글 VO
     * @return TutoringListResponseDTO
     */
    public TutoringListResponseDTO mapTutoringPostVOToDTO (TutoringPostVO tutoringPostVO){
        TutoringListResponseDTO dto = new TutoringListResponseDTO();
        this.postIndex = tutoringPostVO.getPostTutoringIndex();
        this.userNickname = tutoringPostVO.getAuthorNickname();
        this.postTitle = tutoringPostVO.getPostTutoringTitle();
        this.postDate = tutoringPostVO.getPostCreatedDate();
        this.maxUserCount = tutoringPostVO.getPostTutoringMaxUserCount();
        this.userCount = tutoringPostVO.getPostTutoringUserCount();
        this.category = tutoringPostVO.getGameCategories().split(",");
        this.tags = tutoringPostVO.getTags().split(",");
        return dto;
    }

    /**
     * @todo 추후 추가해야할 내용이지만 임시로 재워두기
     */
//    private String postIcon;            // 튜터링 게시물 아이콘
//    private String userIcon;            // 작성자 아이콘
}
