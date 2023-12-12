package com.project.quantumtec.service.dashboard;

import com.project.quantumtec.Model.dto.Request.dashboard.UserBanDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.UserIdDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.UserIndexDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.UserInfoUpdateDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.UserItemSearchDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.board.PostIdDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.game.GameDeveloperDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.game.GameIdDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.game.GameInfoUpdateDTO;
import com.project.quantumtec.Model.dto.Response.board.CommentListResponseDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.UserActivityLogDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.UserInfoDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.UserItemDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.UserListDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.avatar.AvatarListDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.board.BoardPostActivityDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.board.BoardListDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.board.BoardModifyLogDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.game.*;
import com.project.quantumtec.Model.dto.Response.dashboard.payments.PaymentsListDTO;
import com.project.quantumtec.Model.dto.game.GameCommentDTO;

import java.util.List;

public interface DashBoardService {

    // 사용자 상세 정보를 불러오는 메서드 (사용자 프로필만)
    public UserInfoDTO getUserInfo(UserIndexDTO user);

    // 사용자 프로필 정보를 변경하는 메서드
    boolean updateUserInfo(UserInfoUpdateDTO user);

    // 사용자 계정 활성화/비활성화를 변경하고 결과를 문자열로 반환하는 메서드
    boolean convertUserStatus(UserBanDTO userBanDTO);

    //사용자 보유 항목 리스트 불러오기 (모든 아이템)
    List<UserItemDTO> getUserItemList(UserItemSearchDTO user);

    //사용자 활동 로그 항목별 일부 불러오기
    List<UserActivityLogDTO> getUserActivityLog(UserIndexDTO user);

    //사용자 활동 로그 전체 불러오기
    List<UserActivityLogDTO> getUserActivityLogDetail(UserIdDTO userIdDTO);

    // 사용자 목록에 표시할 정보들을 불러오는 메서드 (사용자 리스트 & 추가 정보)
    List<UserListDTO> getUserList();

    // 특정 게임 사용자 리스트 불러오는 메소드
    List<UserListDTO> getUserList(GameIdDTO gameIdDTO);

    // 게임 목록에 표시할 정보들을 불러오는 메소드
    List<GameListDTO> getGameList();

    // 게임 상세 정보들을 불러오는 메소드
    GameInfoDTO getGameInfo(GameIdDTO gameIdDTO);

    // 게임 결제 리스트를 불러오는 메소드
    List<GamePaymentListDTO> getGamePaymentList(GameIdDTO gameIdDTO);

    // 게임 정보를 수정하는 메소드
    boolean updateGameInfo(GameInfoUpdateDTO gameInfoUpdateDTO);

    // 특정 개발사(개발자)의 게임 리스트를 불러오는 메소드
    List<GameListDTO> getDevGameList(GameDeveloperDTO gameDeveloperDTO);

    // 시간별 게임 접속량을 불러오는 메소드
    GameTimeDTO getGameAccessByTime(GameIdDTO gameIdDTO);

    // 일별 게임 접속량을 불러오는 메소드
    GameDateDTO getGameAccessByDay(GameIdDTO gameIdDTO);

    // 게임별 댓글 리스트를 모두 불러오는 메소드
    List<GameCommentDTO> getGameComment(GameIdDTO request);

    /////////////////////////// 페이먼츠 관련 메소드 ///////////////////////////

    // 페이먼츠 리스트 불러오기
    List<PaymentsListDTO> getPaymentList();

    // 페이먼츠 캐시 환불
    String refundCash(PaymentsListDTO paymentsListDTO);

    // 페이먼츠 캐시 환불 취소
    String cancelRefundCash(PaymentsListDTO paymentsListDTO);

    // 페이먼츠 게임 환불
    String refundGame(PaymentsListDTO paymentsListDTO);

    // 페이먼츠 게임 환불 취소
    String cancelRefundGame(PaymentsListDTO paymentsListDTO);

    // 페이먼츠 아바타 환불
    String refundAvatar(PaymentsListDTO paymentsListDTO);

    // 페이먼츠 아바타 환불 취소
    String cancelRefundAvatar(PaymentsListDTO paymentsListDTO);


    // 모든 게시글 정보를 불러오는 메소드
    List<BoardListDTO> getBoardList();

    // 특정 게시글의 댓글 리스트를 불러오는 메소드
    List<CommentListResponseDTO> getCommentList(PostIdDTO request);

    // 특정 게시글의 수정 로그를 불러오는 메소드
    List<BoardModifyLogDTO> getPostModifyLog(PostIdDTO request);

    // 특정 게시글의 댓글/조회수 활동량을 불러오는 메소드
    List<BoardPostActivityDTO> getPostCommentActivity(PostIdDTO request);

    // 아바타 리스트를 불러오는 메소드
    List<AvatarListDTO> getAvatarList();
}
