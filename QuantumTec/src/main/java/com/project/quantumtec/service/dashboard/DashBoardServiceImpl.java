package com.project.quantumtec.service.dashboard;

import com.project.quantumtec.Model.dto.Request.dashboard.board.PostIdDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.game.GameDeveloperDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.game.GameIdDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.game.GameInfoUpdateDTO;
import com.project.quantumtec.Model.dto.Response.board.CommentListResponseDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.board.BoardListDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.board.BoardModifyLogDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.game.*;
import com.project.quantumtec.Model.dto.game.GameCommentDTO;
import com.project.quantumtec.Model.vo.dashboard.GameDateVO;
import com.project.quantumtec.Model.vo.dashboard.GameListVO;
import com.project.quantumtec.Model.vo.dashboard.GameTimeVO;
import com.project.quantumtec.dao.dashboard.DashBoardDAO;
import com.project.quantumtec.Model.dto.Request.dashboard.UserBanDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.UserIdDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.UserIndexDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.UserInfoUpdateDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.UserItemSearchDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.UserActivityLogDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.UserInfoDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.UserItemDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.UserListDTO;
import com.project.quantumtec.global.DatabaseColumnName;
import com.project.quantumtec.global.ExpToLevel;
import com.project.quantumtec.Model.vo.dashboard.UserListVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

@Service("DashBoardServiceImpl")
public class DashBoardServiceImpl implements DashBoardService{

    @Autowired
    private ExpToLevel expToLevel;
    @Autowired
    private DatabaseColumnName databaseColumnName;
    @Autowired
    private DashBoardDAO dashBoardDAO;

    @Override
    public UserInfoDTO getUserInfo(UserIndexDTO user) {
        return dashBoardDAO.getUserInfo(user);
    }

    @Override
    public boolean updateUserInfo(UserInfoUpdateDTO user) {
        // 성별 남자, 여자, 비공개를 각각 m, f, p로 변환
        String gender = user.getUserGender();
        switch (gender) {
            case "남자":
                user.setUserGender("m");
                break;
            case "여자":
                user.setUserGender("f");
                break;
            case "비공개":
                user.setUserGender("p");
                break;
            default:
                break;
        }
        return dashBoardDAO.updateUserInfo(user);
    }

    @Override
    public boolean convertUserStatus(UserBanDTO userBanDTO) {
        return dashBoardDAO.convertUserStatus(userBanDTO);
    }

    @Override
    public List<UserItemDTO> getUserItemList(UserItemSearchDTO userItemSearchDTO) {
        return dashBoardDAO.getUserItemList(userItemSearchDTO);
    }

    @Override
    public List<UserActivityLogDTO> getUserActivityLog(UserIndexDTO user) {
        return dashBoardDAO.getUserActivityLog(user);
    }

    @Override
    public List<UserActivityLogDTO> getUserActivityLogDetail(UserIdDTO userIdDTO) {

        List<UserActivityLogDTO> oldDto = dashBoardDAO.getUserActivityLogDetail(userIdDTO);
        List<UserActivityLogDTO> newDto = new ArrayList<>();
        for(int i = 0; i < oldDto.size(); i++){
            UserActivityLogDTO dto = oldDto.get(i);
            dto.setColumnName(databaseColumnName.getColumnNameList(dto.getTableEngName()));

            newDto.add(dto);
        }
        return newDto;
    }

    @Override
    public List<UserListDTO> getUserList() {
        List<UserListDTO> userListDTO = new ArrayList<>();
        List<UserListVO> userListVO = dashBoardDAO.getUserList();
        for(int i = 0; i < userListVO.size(); i++){
            UserListDTO dto = new UserListDTO(expToLevel);
            dto = dto.mapUserListVOToDTO(userListVO.get(i));

            userListDTO.add(dto);

        }
        return userListDTO;
    }

    @Override
    public List<UserListDTO> getUserList(GameIdDTO gameIdDTO) {
        List<UserListDTO> userListDTO = new ArrayList<>();
        List<UserListVO> userListVO = dashBoardDAO.getUserList(gameIdDTO);
        for(int i = 0; i < userListVO.size(); i++){
            UserListDTO dto = new UserListDTO(expToLevel);
            dto = dto.mapUserListVOToDTO(userListVO.get(i));

            userListDTO.add(dto);

        }
        return userListDTO;
    }

    @Override
    public List<GameListDTO> getGameList() {
        List<GameListDTO> gameListDTO = new ArrayList<>();
        List<GameListVO> gameListVO = dashBoardDAO.getGameList();
        for (int i = 0; i < gameListVO.size(); i++){
            GameListDTO dto = new GameListDTO();
            dto = dto.mapGameListVOToDTO(gameListVO.get(i));

            gameListDTO.add(dto);
        }
        return gameListDTO;
    }

    @Override
    public GameInfoDTO getGameInfo(GameIdDTO gameIdDTO) {
        GameInfoDTO gameInfoDTO = new GameInfoDTO();
        gameInfoDTO = dashBoardDAO.getGameInfo(gameIdDTO);
        // TODO: 게임 댓글 작성량을 가져오는 쿼리가 없어서 주석처리
        // gameInfoDTO.setGameCommentCount(dashBoardDAO.getGameCommentCount(gameIdDTO));
        return gameInfoDTO;
    }

    @Override
    public List<GamePaymentListDTO> getGamePaymentList(GameIdDTO gameIdDTO) {
        return dashBoardDAO.getGamePaymentList(gameIdDTO);
    }

    @Override
    public boolean updateGameInfo(GameInfoUpdateDTO gameInfoUpdateDTO) {
        return dashBoardDAO.updateGameInfo(gameInfoUpdateDTO);
    }

    @Override
    public List<GameListDTO> getDevGameList(GameDeveloperDTO gameDeveloperDTO) {
        return dashBoardDAO.getDevGameList(gameDeveloperDTO);
    }

    @Override
    public GameTimeDTO getGameAccessByTime(GameIdDTO gameIdDTO) {
        // List<GameTimeVO> gameTimeVOList = dashBoardDAO.getGameAccessByTime(gameIdDTO);
        // GameTimeDTO gameTimeDTO = new GameTimeDTO();
        // gameTimeDTO.init();
        // for(GameTimeVO vo : gameTimeVOList){
        //     int time = vo.getTime();
        //     int count = vo.getCount();
        //     gameTimeDTO.setTime(time, count);
        // }
        List<GameTimeVO> gameTimeVO = dashBoardDAO.getGameAccessByTime(gameIdDTO);
        GameTimeDTO gameTimeDTO = new GameTimeDTO();
        int[] accessCount = new int[24];
        for(int i = 0; i < gameTimeVO.size(); i++){
            accessCount[i] = gameTimeVO.get(i).getAccessCount();
        }
        gameTimeDTO.setAccessCount(accessCount);
        return gameTimeDTO;
    }

    @Override
    public GameDateDTO getGameAccessByDay(GameIdDTO gameIdDTO) {
        List<GameDateVO> gameDateVOList = dashBoardDAO.getGameAccessByDay(gameIdDTO);
        GameDateDTO gameDateDTO = new GameDateDTO();
        // gameDateDTO.init();
        int[] accessCount = new int[30];
        // for(GameDateVO vo : gameDateVOList){
        //     int date = vo.getDate();
        //     int count = vo.getCount();
        //     gameDateDTO.setDate(date, count);
        // }
        for(int i = 0; i < gameDateVOList.size(); i++){
            accessCount[i] = gameDateVOList.get(i).getAccessCount();
        }
        gameDateDTO.setAccessCount(accessCount);
        return gameDateDTO;
    }

    @Override
    public List<GameCommentDTO> getGameComment(GameIdDTO request) {
        return dashBoardDAO.getGameComment(request);
    }

    @Override
    public List<BoardListDTO> getBoardList() {
        return dashBoardDAO.getBoardList();
    }

    @Override
    public List<CommentListResponseDTO> getCommentList(PostIdDTO request) {
        return dashBoardDAO.getCommentList(request);
    }

    @Override
    public List<BoardModifyLogDTO> getPostModifyLog(PostIdDTO request) {
        return dashBoardDAO.getPostModifyLog(request);
    }
}
