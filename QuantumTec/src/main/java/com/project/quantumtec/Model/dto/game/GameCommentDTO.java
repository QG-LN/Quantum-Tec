package com.project.quantumtec.Model.dto.game;

import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.quantumtec.Model.dto.Response.avatar.AvatarInventoryDTO;
import com.project.quantumtec.Model.vo.game.GameCommentVO;

import lombok.Data;

/**
 * PackageName : com.project.quantumtec.DTO.game
 * FileName : GameCommentDTO
 * Author : Argonaut
 * Date : 2023-06-11
 * Description : 게임 속 댓글 정보를 담고 있는 DTO
 */
@Data
public class GameCommentDTO {
    private String userId;              // 댓글 작성자 ID
    private String userName;            // 댓글 작성자 이름
    private String commentContent;      // 댓글 내용
    private String commentCreatedDate;  // 댓글 작성일자
    private int commentUpvote;          // 댓글 추천수
    private int commentDownvote;        // 댓글 비추천수
    private int commentRating;          // 댓글 평점
    private int userIndex;              // 댓글 작성자 번호

    // 착용중인 아바타 정보
    private List<AvatarInventoryDTO> avatarItemList; // 착용중인 아바타 아이템 리스트

    public GameCommentDTO mapGameCommentVOToDTO(GameCommentVO gameCommentVO){
        GameCommentDTO dto = new GameCommentDTO();
        dto.userId = gameCommentVO.getUserId();
        dto.userName = gameCommentVO.getUserName();
        dto.commentContent = gameCommentVO.getCommentContent();
        dto.commentCreatedDate = gameCommentVO.getCommentCreatedDate();
        dto.commentUpvote = gameCommentVO.getCommentUpvote();
        dto.commentDownvote = gameCommentVO.getCommentDownvote();
        dto.commentRating = gameCommentVO.getCommentRating();
        
        ObjectMapper mapper = new ObjectMapper();
        try {
            if (gameCommentVO.getAvatarItemList() != null) {
                List<AvatarInventoryDTO> items = mapper.readValue(gameCommentVO.getAvatarItemList(), new TypeReference<List<AvatarInventoryDTO>>() {});
                dto.avatarItemList = items;
            } else {
                dto.avatarItemList = null;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return dto;
    }
}
