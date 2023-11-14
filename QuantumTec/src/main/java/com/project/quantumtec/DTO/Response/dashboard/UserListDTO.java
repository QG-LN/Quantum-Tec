package com.project.quantumtec.DTO.Response.dashboard;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.project.quantumtec.DTO.Response.avatar.AvatarInventoryDTO;
import com.project.quantumtec.Global.ExpToLevel;
import com.project.quantumtec.VO.dashboard.UserListVO;

@Data
public class UserListDTO {

    private ExpToLevel expToLevel;
    public UserListDTO(ExpToLevel expToLevel) {
        this.expToLevel = expToLevel;
    }

    // 목록 내에 표시될 정보
    private int userIndex;   // 번호
    private int userLevel;   // 레벨
    private int userLevelExp;   // 경험치
    private String userNickname;   // 닉네임
    private String userName;   // 사용자명
    private String userStatus;   // 사용자 상태
    private int userCash;   // 보유 캐시
    private int userAttendance; // 사용자 출석 일수

    // 클릭 시 우측 정보란에 추가적으로 표시될 정보
    private String userID;    // 사용자 아이디
    private String userBirth;    // 사용자 생일
    private String userEmail;    // 사용자 이메일
    private String userGender;    // 사용자 성별
    private String userAddress;    // 사용자 기본주소
    private String userAddressDetail;    // 사용자 상세주소
    private String userCreateAt;    // 사용자 가입일
    private String userMemo;    // 사용자 메모

    // 착용중인 아바타 정보
    private List<AvatarInventoryDTO> avatarItemList; // 착용중인 아바타 아이템 리스트

    public UserListDTO mapUserListVOToDTO(UserListVO userListVO){
        UserListDTO dto = new UserListDTO(this.expToLevel);
        dto.userIndex = userListVO.getUserIndex();
        dto.userLevel = expToLevel.getExpToLevel(userListVO.getUserLevelExp());
        dto.userLevelExp = userListVO.getUserLevelExp();

        dto.userNickname = userListVO.getUserNickname();
        dto.userName = userListVO.getUserName();
        dto.userStatus = userListVO.getUserStatus();
        dto.userCash = userListVO.getUserCash();
        dto.userAttendance = userListVO.getUserAttendance();
        dto.userID = userListVO.getUserID();
        dto.userBirth = userListVO.getUserBirth();
        dto.userEmail = userListVO.getUserEmail();
        dto.userGender = userListVO.getUserGender();
        dto.userAddress = userListVO.getUserAddress();
        dto.userAddressDetail = userListVO.getUserAddressDetail();
        dto.userCreateAt = userListVO.getUserCreatedAt();
        dto.userMemo = userListVO.getUserMemo();

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            if (userListVO.getAvatarItemList() != null) {
                List<AvatarInventoryDTO> items = objectMapper.readValue(userListVO.getAvatarItemList(), new TypeReference<List<AvatarInventoryDTO>>() {});
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
}
