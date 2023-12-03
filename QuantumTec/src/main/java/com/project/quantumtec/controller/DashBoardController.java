package com.project.quantumtec.controller;

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
import com.project.quantumtec.Model.dto.Response.dashboard.UserListDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.game.GameInfoDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.game.GameListDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.game.GamePaymentListDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.game.GameTimeDTO;
import com.project.quantumtec.Model.dto.game.GameCommentDTO;
import com.project.quantumtec.Model.dto.game.GameCommentListDTO;
import com.project.quantumtec.service.dashboard.DashBoardService;
import com.project.quantumtec.service.game.GameService;
import com.project.quantumtec.service.user.UserService;
import com.project.quantumtec.Model.vo.user.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class DashBoardController {

    @Autowired
    private DashBoardService dashBoardService;
    private UserService userService;
    private GameService gameService;

    //프로필 정보 조회
    @PostMapping("/userinfo")
    public UserInfoDTO getUserInfo(@RequestBody UserIndexDTO user){
        return dashBoardService.getUserInfo(user);
    }

    //프로필 정보 변경
    @PostMapping("/userinfo/update")
    public boolean updateUserInfo(@RequestBody UserInfoUpdateDTO user) throws Exception{
        return dashBoardService.updateUserInfo(user);
    }
    //계정 활성화/비활성화 변환
    //비활성화 할 때는 기간과 사유까지 입력받아야함
    @PostMapping("/userinfo/convertuserstatus")
    public boolean convertUserStatus(@RequestBody UserBanDTO userBanDTO) throws Exception{
        return dashBoardService.convertUserStatus(userBanDTO);
    }
    //계정 삭제
    @DeleteMapping("/userinfo/delete")
    public boolean deleteUser(@RequestParam int userIdx)throws Exception{
        return userService.deleteUser(userIdx);
    }

    //계정 비밀번호 초기화
    @PostMapping("/userinfo/resetpassword")
    public boolean resetPassword(@RequestBody UserVO user)throws Exception{
        return userService.findPw(user.getUserName(), user.getUserEmail(),  user.getUserID());
    }

    //사용자 보유 항목 리스트 불러오기 (모든 아이템)
    @PostMapping("/userinfo/itemlist")
    public List<UserItemDTO> getUserItemList(@RequestBody UserItemSearchDTO userItemSearchDTO) throws Exception{
        return dashBoardService.getUserItemList(userItemSearchDTO);
    }

    //사용자 활동 로그 항목별 일부 불러오기
    @PostMapping("/userinfo/activitylog")
    public List<UserActivityLogDTO> getUserActivityLog(@RequestBody UserIndexDTO user) throws Exception{
        return dashBoardService.getUserActivityLog(user);
    }

    //사용자 활동 로그 전체 불러오기
    @PostMapping("/userinfo/activitylogdetail")
    public List<UserActivityLogDTO> getUserActivityLogDetail(@RequestBody UserIdDTO userIdDto) throws Exception{
        return dashBoardService.getUserActivityLogDetail(userIdDto);
    }

    //사용자 리스트 조회
    @RequestMapping("/userlist")
    public List<UserListDTO> getUserList() throws Exception{
        return dashBoardService.getUserList();
    }

//    //특정 게임 사용자 리스트 조회
//    @RequestMapping("/userlist")
//    public List<UserListDTO> getUserList(@RequestBody GameIdDTO gameIdDTO) throws Exception{
//        return dashBoardService.getUserList(gameIdDTO);
//    }

    // 게임 관리 기능

    // 게임 리스트 불러오기
    @RequestMapping("/gamelist")
    public List<GameListDTO> getGameList() throws Exception{
        for(int i = 0; i < dashBoardService.getGameList().size(); i++){
            System.out.println(dashBoardService.getGameList().get(i).getGameName());
        }
        return dashBoardService.getGameList();
    }

    // 게임 상세정보 불러오기
    @RequestMapping("/gameinfo")
    public GameInfoDTO getGameInfo(@RequestBody GameIdDTO gameIdDTO) throws Exception{
        return dashBoardService.getGameInfo(gameIdDTO);
    }

    // 게임 댓글 불러오기
    @PostMapping("/gamecomment")
    public List<GameCommentDTO> getPostGameComment(@RequestBody GameCommentListDTO request){
        // 게임 id와 게임 이름을 받아서 게임 댓글들을 불러옴
        return gameService.getPostGameComment(request);
    }

    // 게임 결제 리스트 불러오기
    @RequestMapping("/gamepaymentlist")
    public List<GamePaymentListDTO> getGamePaymentList(@RequestBody GameIdDTO gameIdDTO) throws Exception{
        return dashBoardService.getGamePaymentList(gameIdDTO);
    }

    // 동일한 개발사(개발자) 게임 리스트 불러오기 (테스트 형태)
    @RequestMapping("/devgamelist")
    public List<GameListDTO> getDevGameList(@RequestBody GameDeveloperDTO gameDeveloperDTO) throws Exception{
        return dashBoardService.getDevGameList(gameDeveloperDTO);
    }

    // 짜짠! 그거 아시나요? 게임 삭제랑 등록 기능이 미구현이라는 사실을!

    // 게임 상세정보를 변경하는 메소드
    @PostMapping("/gameinfo/update")
    public boolean updateGameInfo(@RequestBody GameInfoUpdateDTO gameInfoUpdateDTO) throws Exception{
        return dashBoardService.updateGameInfo(gameInfoUpdateDTO);
    }

    // 게임 삭제 (GameService에 추가해서 불러다 쓸 예정)
    // @DeleteMapping("/gameinfo/delete")

    // 게임 시간별 접속량 불러오기
    @PostMapping("/gameinfo/accessbytime")
    public GameTimeDTO getGameAccessByTime(@RequestBody GameIdDTO gameIdDTO) throws Exception{
        return dashBoardService.getGameAccessByTime(gameIdDTO);
    }
}
