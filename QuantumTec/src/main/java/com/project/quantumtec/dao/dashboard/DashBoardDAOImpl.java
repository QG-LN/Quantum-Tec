package com.project.quantumtec.dao.dashboard;

import com.project.quantumtec.Model.dto.Request.dashboard.UserBanDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.UserIdDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.UserIndexDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.UserInfoUpdateDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.UserItemSearchDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.avatar.AvatarIdDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.board.PostIdDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.game.GameDeveloperDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.game.GameIdDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.game.GameInfoUpdateDTO;
import com.project.quantumtec.Model.dto.Response.board.CommentListResponseDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.UserActivityLogDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.UserInfoDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.UserItemDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.avatar.*;
import com.project.quantumtec.Model.dto.Response.dashboard.board.BoardListDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.board.BoardModifyLogDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.game.GameInfoDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.game.GameListDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.game.GamePaymentListDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.payments.PaymentsListDTO;
import com.project.quantumtec.Model.dto.game.GameCommentDTO;
import com.project.quantumtec.Model.vo.dashboard.*;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DashBoardDAOImpl implements DashBoardDAO{

    @Autowired
    private SqlSession sqlSession;

    // 사용자 상세정보 페이지에 담길 프로필 정보를 받아오는 메소드
    @Override
    public UserInfoDTO getUserInfo(UserIndexDTO user) {
        try {
            return sqlSession.selectOne("DashBoardService.getUserInfo", user);
        }catch (Exception e){
            return null;
        }
    }

    // 사용자 프로필 정보를 수정하고 결과값을 boolean 자료형으로 반환하는 메소드
    @Override
    public boolean updateUserInfo(UserInfoUpdateDTO user) {
        try {
            sqlSession.selectOne("DashBoardService.updateUserInfo", user);
            return user.getUpdate_result() == 1;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    // 사용자 상태 조회 후 그에 반대 되는 상태로 변경 후 결과를 String 으로 반환 (성공시 변경된 상태, 실패시 "fail")
    @Override
    public boolean convertUserStatus(UserBanDTO userBanDTO) {
        try {
            if(userBanDTO.getBanReason() == null || userBanDTO.getBanReason().equals("")){
                // 밴 취소
                sqlSession.delete("DashBoardService.cancelUserBan", userBanDTO);
                return true;
            }
            else{
                return sqlSession.insert("DashBoardService.insertUserBan", userBanDTO) == 1;
            }

        }catch (Exception e){
            return false;
        }
    }

    // 사용자 보유 항목(전체)을 반환하는 메소드
    @Override
    public List<UserItemDTO> getUserItemList(UserItemSearchDTO userItemSearchDTO) {
        return sqlSession.selectList("DashBoardService.getUserItemList", userItemSearchDTO);
    }

    //사용자 활동 로그를 항목별 한가지씩만 불러오기
    @Override
    public List<UserActivityLogDTO> getUserActivityLog(UserIndexDTO user) {
        return sqlSession.selectList("DashBoardService.getUserActivityLog", user);
    }

    // 사용자 활동 로그를 전부 불러오기
    @Override
    public List<UserActivityLogDTO> getUserActivityLogDetail(UserIdDTO userIdDTO) {
        return sqlSession.selectList("DashBoardService.getUserActivityLogDetail", userIdDTO);
    }

    // 사용자 목록 페이지에 담길 사용자 리스트를 받아오는 메소드
    @Override
    public List<UserListVO> getUserList() {
        try {
            return sqlSession.selectList("DashBoardService.getUserList");
        }catch (Exception e){
            return null;
        }
    }

    // 특정 게임 사용자 목록을 받아오는 메소드
    @Override
    public List<UserListVO> getUserList(GameIdDTO gameIdDTO) {
        try {
            return sqlSession.selectList("DashBoardService.getGameUserList");
        }catch (Exception e){
            return null;
        }
    }

    // 게임 목록 페이지에 담길 게임 리스트를 받아오는 메소드
    @Override
    public List<GameListVO> getGameList() {
        try {
            return sqlSession.selectList("DashBoardService.getGameList");
        }catch (Exception e){
            return null;
        }
    }

    // 게임 상세정보 페이지에 담길 게임 정보를 받아오는 메소드
    @Override
    public GameInfoDTO getGameInfo(GameIdDTO gameIdDTO) {
        try {
            return sqlSession.selectOne("DashBoardService.getGameInfo", gameIdDTO);
        } catch (Exception e) {
            return null;
        }
    }

    // 게임 결제 리스트를 받아오는 메소드
    @Override
    public List<GamePaymentListDTO> getGamePaymentList(GameIdDTO gameIdDTO) {
        try {
            return sqlSession.selectList("DashBoardService.getGamePaymentList", gameIdDTO);
        } catch (Exception e) {
            return null;
        }
    }

    // 게임 정보를 수정하는 메소드
    @Override
    public boolean updateGameInfo(GameInfoUpdateDTO gameInfoUpdateDTO) {
        try {

            return sqlSession.update("DashBoardService.updateGameInfo", gameInfoUpdateDTO) == 1;
        } catch (Exception e) {
            return false;
        }
    }

    // 특정 개발사(개발자)의 게임 리스트를 불러오는 메소드
    @Override
    public List<GameListDTO> getDevGameList(GameDeveloperDTO gameDeveloperDTO) {
        return sqlSession.selectList("DashBoardService.getDevGameList", gameDeveloperDTO);
    }

    // 특정 게임의 접속 시간대별 접속자 수를 불러오는 메소드 (0~23시)
    @Override
    public List<GameTimeVO> getGameAccessByTime(GameIdDTO gameIdDTO) {
        return sqlSession.selectList("DashBoardService.getGameAccessByTime", gameIdDTO);
    }

    // 특정 게임의 접속일자별 접속자 수를 불러오는 메소드 (최근 30일)
    @Override
    public List<GameDateVO> getGameAccessByDay(GameIdDTO gameIdDTO) {
        return sqlSession.selectList("DashBoardService.getGameAccessByDay", gameIdDTO);
    }
    // 특정 게임의 최근 댓글 작성량을 불러오는 메소드 (최근 7일동안 댓글 수)
    @Override
    public int getGameCommentCount(GameIdDTO gameIdDTO) {
        return sqlSession.selectOne("DashBoardService.getGameCommentCount", gameIdDTO);
    }

    // 게임별 댓글 리스트를 모두 불러오는 메소드
    @Override
    public List<GameCommentDTO> getGameComment(GameIdDTO request) {
        return sqlSession.selectList("DashBoardService.getGameComment", request);
    }


    /////////////////////////// 페이먼츠 관련 메소드 ///////////////////////////

    // 페이먼츠 리스트 불러오기
    @Override
    public List<PaymentsListDTO> getPaymentList() {
        return sqlSession.selectList("DashBoardService.getPaymentList");
    }

    // 페이먼츠 캐시 환불
    @Override
    public String refundCash(PaymentsListDTO paymentsListDTO) {
        sqlSession.selectOne("DashBoardService.refundCash", paymentsListDTO);
        String result;
        int update_result = paymentsListDTO.getUpdate_result();
        if(update_result == 1){
            result = "성공";
        }
        else if(update_result == 0){
            result = "실패";
        }
        else{
            result = "캐시 부족";
        }
        return result;
    }

    // 페이먼츠 캐시 환불 취소
    @Override
    public String cancelRefundCash(PaymentsListDTO paymentsListDTO) {
        sqlSession.selectOne("DashBoardService.cancelRefundCash", paymentsListDTO);
        String result;
        int update_result = paymentsListDTO.getUpdate_result();
        if(update_result == 1){
            result = "성공";
        }
        else{
            result = "실패";
        }
        return result;
    }


    // 페이먼츠 게임 환불
    @Override
    public String refundGame(PaymentsListDTO paymentsListDTO) {
        sqlSession.selectOne("DashBoardService.refundGame", paymentsListDTO);
        String result;
        int update_result = paymentsListDTO.getUpdate_result();
        if(update_result == 1){
            result = "성공";
        }
        else{
            result = "실패";
        }
        return result;
    }

    // 페이먼츠 게임 환불 취소
    @Override
    public String cancelRefundGame(PaymentsListDTO paymentsListDTO) {
        sqlSession.selectOne("DashBoardService.cancelRefundGame", paymentsListDTO);
        String result;
        int update_result = paymentsListDTO.getUpdate_result();
        if(update_result == 1){
            result = "성공";
        }
        else if(update_result == 0){
            result = "실패";
        }
        else{
            result = "캐시 부족";
        }
        return result;
    }

    // 페이먼츠 아바타 환불
    @Override
    public String refundAvatar(PaymentsListDTO paymentsListDTO) {
        sqlSession.selectOne("DashBoardService.refundAvatar", paymentsListDTO);
        String result;
        int update_result = paymentsListDTO.getUpdate_result();
        if(update_result == 1){
            result = "성공";
        }
        else{
            result = "실패";
        }
        return result;
    }

    // 페이먼츠 아바타 환불 취소
    @Override
    public String cancelRefundAvatar(PaymentsListDTO paymentsListDTO) {
        sqlSession.selectOne("DashBoardService.cancelRefundAvatar", paymentsListDTO);
        String result;
        int update_result = paymentsListDTO.getUpdate_result();
        if(update_result == 1){
            result = "성공";
        }
        else if(update_result == 0){
            result = "실패";
        }
        else{
            result = "캐시 부족";
        }
        return result;
    }

    // 게시글 리스트를 불러오는 메소드
    @Override
    public List<BoardListDTO> getBoardList() {
        return sqlSession.selectList("DashBoardService.getBoardList");
    }

    // 특정 게시글의 댓글 리스트를 불러오는 메소드
    @Override
    public List<CommentListResponseDTO> getCommentList(PostIdDTO request) {
        return sqlSession.selectList("DashBoardService.getCommentList", request);
    }

    // 특정 게시글의 수정 로그를 불러오는 메소드
    @Override
    public List<BoardModifyLogDTO> getPostModifyLog(PostIdDTO request) {
        return sqlSession.selectList("DashBoardService.getPostModifyLog", request);
    }

    // 특정 게시글의 댓글/조회수 활동량을 불러오는 메소드
    @Override
    public List<PostDateVO> getPostCommentActivity(PostIdDTO request) {
        return sqlSession.selectList("DashBoardService.getPostActivityByDate", request);
    }

    // 아바타 목록을 불러오는 메소드
    @Override
    public List<AvatarListDTO> getAvatarList() {
        return sqlSession.selectList("DashBoardService.getAvatarLists");
    }

    // 아바타 상세 정보를 불러오는 메소드
    @Override
    public AvatarDetailDTO getAvatarInfo(AvatarIdDTO request) {
        return sqlSession.selectOne("DashBoardService.getAvatarDetail", request);
    }

    // 아바타 결제 내역을 불러오는 메소드
    @Override
    public List<AvatarPaymentHistoryDTO> getAvatarPaymentHistory(AvatarIdDTO request) {
        return sqlSession.selectList("DashBoardService.getAvatarPaymentHistory", request);
    }

    // 아바타 판매량을 불러오는 메소드
    @Override
    public List<AvatarSalesVolumeVO> getAvatarSalesVolume(AvatarIdDTO request) {
        return sqlSession.selectList("DashBoardService.getAvatarPaymentSalesVolumeByMonth", request);
    }

    // 아바타 사용량을 불러오는 메소드
    @Override
    public List<AvatarUsageVolumeDTO> getAvatarUsage(AvatarIdDTO request) {
        return sqlSession.selectList("DashBoardService.getAvatarUsageVolume", request);
    }

    // 아바타 상세정보를 수정하는 메소드
    @Override
    public boolean updateAvatarItem(AvatarItemUpdateDTO request) {
        return sqlSession.update("DashBoardService.updateAvatarItem", request) == 1;
    }
}
