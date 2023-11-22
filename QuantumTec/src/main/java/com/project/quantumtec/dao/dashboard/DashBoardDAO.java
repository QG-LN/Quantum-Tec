package com.project.quantumtec.dao.dashboard;

import com.project.quantumtec.Model.dto.Request.dashboard.UserBanDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.UserIdDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.UserIndexDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.UserInfoUpdateDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.UserItemSearchDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.game.GameDeveloperDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.game.GameIdDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.game.GameInfoUpdateDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.UserActivityLogDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.UserInfoDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.UserItemDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.game.GameInfoDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.game.GameListDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.game.GamePaymentListDTO;
import com.project.quantumtec.Model.vo.dashboard.GameListVO;
import com.project.quantumtec.Model.vo.dashboard.UserListVO;

import java.util.List;

public interface DashBoardDAO {
    // 사용자 상세정보 요청시 프로필 영역 데이터를 가져오는 메소드
    public UserInfoDTO getUserInfo(UserIndexDTO user);

    // 사용자 프로필 정보를 변경하는 메서드
    public boolean updateUserInfo(UserInfoUpdateDTO user);

    // 사용자 계정 활성화/비활성화를 변경하는 메서드
    public boolean convertUserStatus(UserBanDTO userBanDTO);

    //사용자 보유 항목 리스트 불러오기 (모든 아이템)
    public List<UserItemDTO> getUserItemList(UserItemSearchDTO user);

    //사용자 활동 로그 항목별 일부 불러오기
    public List<UserActivityLogDTO> getUserActivityLog(UserIndexDTO user);

    //사용자 활동 로그 전체 불러오기
    public List<UserActivityLogDTO> getUserActivityLogDetail(UserIdDTO useriDto);

    // 사용자 목록 요청시 사용자 리스트 데이터를 가져오는 메소드
    public List<UserListVO> getUserList();

    // 특정 게임 사용자 목록을 가져오는 메소드
    public List<UserListVO> getUserList(GameIdDTO gameIdDTO);

    // 게임 목록 요청시 게임 리스트 데이터를 가져오는 메소드
    public List<GameListVO> getGameList();

    // 게임 상세정보 데이터를 가져오는 메소드
    public GameInfoDTO getGameInfo(GameIdDTO gameIdDTO);

    // 게임 결제 리스트를 가져오는 메소드
    List<GamePaymentListDTO> getGamePaymentList(GameIdDTO gameIdDTO);

    // 게임 정보를 수정하는 메소드
    boolean updateGameInfo(GameInfoUpdateDTO gameInfoUpdateDTO);

    // 특정 개발사(개발자)의 게임 리스트를 불러오는 메소드
    List<GameListDTO> getDevGameList(GameDeveloperDTO gameDeveloperDTO);
}
