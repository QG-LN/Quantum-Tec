package com.project.quantumtec.Model.dto.Response.board;

import com.project.quantumtec.Model.dto.Response.avatar.AvatarInventoryDTO;
import com.project.quantumtec.Model.vo.board.TutoringPostVO;

import lombok.Data;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;

import java.util.ArrayList;
import java.util.List;

@Data
public class TutoringListResponseDTO {
    private int postIndex;              // 게시글 번호
    private String userNickname;        // 작성자 닉네임
    private String postTitle;           // 게시글 제목
    private String postDate;            // 게시글 등록일
    private int maxUserCount ;          // 튜터링 참여 최대 인원
    private int userCount;              // 튜터링 참여 인원
    private boolean postState;          // 게시글 상태
    private String[] category;          // 튜터링 카테고리
    private String[] tags;              // 게시글 태그
    private List<AvatarInventoryDTO> avatarItemList;      // 아바타 아이템 리스트

    private String postIntro;           // 게시글 소개글
    private String postContent;         // 게시글 내용
    private boolean runningType;        // 튜터링 진행 방식 [온라인 - 1 / 오프라인 - 0]
    private String link;                // 튜터링 링크
    private String expectedTime;        // 튜터링 예상 소요 시간
    private String startDate;           // 튜터링 시작 날짜


    /**
     * 튜터링 게시글 VO를 DTO로 변환
     * @param tutoringPostVO 튜터링 게시글 VO
     * @return TutoringListResponseDTO
     */
    public TutoringListResponseDTO mapTutoringPostVOToDTO (TutoringPostVO tutoringPostVO){
        TutoringListResponseDTO dto = new TutoringListResponseDTO();
        dto.postIndex = tutoringPostVO.getPostTutoringIndex();
        dto.userNickname = tutoringPostVO.getAuthorNickname();
        dto.postTitle = tutoringPostVO.getPostTutoringTitle();
        dto.postDate = tutoringPostVO.getPostCreatedDate();
        dto.maxUserCount = tutoringPostVO.getPostTutoringMaxUserCount();
        dto.userCount = tutoringPostVO.getPostTutoringUserCount();
        dto.postState = tutoringPostVO.isPostTutoringState();
        dto.category = tutoringPostVO.getGameCategories().split(",");
        dto.tags = tutoringPostVO.getTags().split(",");
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            if (tutoringPostVO.getAvatarItemList() != null) {
                List<AvatarInventoryDTO> items = objectMapper.readValue(tutoringPostVO.getAvatarItemList(), new TypeReference<List<AvatarInventoryDTO>>() {});
                dto.avatarItemList = items;
            } else {
                // avatarItemList가 null인 경우를 처리.
                dto.avatarItemList = new ArrayList<>();
}
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return dto;
    }

    /**
     * @todo 추후 추가해야할 내용이지만 임시로 재워두기
     */
//    private String postIcon;            // 튜터링 게시물 아이콘
//    private String userIcon;            // 작성자 아이콘
}
