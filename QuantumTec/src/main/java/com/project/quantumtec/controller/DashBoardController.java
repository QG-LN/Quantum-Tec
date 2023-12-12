package com.project.quantumtec.controller;

import com.project.quantumtec.Model.dto.Request.board.*;
import com.project.quantumtec.Model.dto.Request.dashboard.UserBanDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.UserIdDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.UserIndexDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.UserInfoUpdateDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.UserItemSearchDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.avatar.AvatarIdDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.board.PostIdDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.game.GameIdDTO;
import com.project.quantumtec.Model.dto.Request.dashboard.game.GameInfoUpdateDTO;
import com.project.quantumtec.Model.dto.Response.board.CommentListResponseDTO;
import com.project.quantumtec.Model.dto.Response.board.ViewResponseDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.UserActivityLogDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.UserInfoDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.UserItemDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.UserListDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.avatar.AvatarDetailDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.avatar.AvatarListDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.board.BoardPostActivityDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.board.BoardListDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.board.BoardModifyLogDTO;
import com.project.quantumtec.Model.dto.Response.dashboard.game.*;
import com.project.quantumtec.Model.dto.Response.dashboard.payments.PaymentsListDTO;
import com.project.quantumtec.Model.dto.game.GameCommentDTO;
import com.project.quantumtec.service.board.BoardService;
import com.project.quantumtec.service.dashboard.DashBoardService;
import com.project.quantumtec.service.user.UserService;
import com.project.quantumtec.Model.vo.user.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class DashBoardController {

    @Autowired
    private DashBoardService dashBoardService;

    @Autowired
    private UserService userService;

    @Autowired
    private BoardService boardService;

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
        return dashBoardService.getGameList();
    }

    // 게임 상세정보 불러오기
    @RequestMapping("/gameinfo")
    public GameInfoDTO getGameInfo(@RequestBody GameIdDTO gameIdDTO) throws Exception{
        return dashBoardService.getGameInfo(gameIdDTO);
    }

    // 게임 댓글 불러오기
    @PostMapping("/gamecomment")
    public List<GameCommentDTO> getGameComment(@RequestBody GameIdDTO request) throws Exception{
        // 게임 id와 게임 이름을 받아서 게임 댓글들을 불러옴
        return dashBoardService.getGameComment(request);
    }

    // 게임 결제 리스트 불러오기
    @RequestMapping("/gamepaymentlist")
    public List<GamePaymentListDTO> getGamePaymentList(@RequestBody GameIdDTO gameIdDTO) throws Exception{
        return dashBoardService.getGamePaymentList(gameIdDTO);
    }

    // 동일한 개발사(개발자) 게임 리스트 불러오기 (테스트 형태)
    // @RequestMapping("/devgamelist")
    // public List<GameListDTO> getDevGameList(@RequestBody GameDeveloperDTO gameDeveloperDTO) throws Exception{
    //     return dashBoardService.getDevGameList(gameDeveloperDTO);
    // }

    // 짜짠! 그거 아시나요? 게임 삭제랑 등록 기능이 미구현이라는 사실을!

    // 게임 상세정보를 변경하는 메소드
    @PostMapping("/gameinfo/update")
    public boolean updateGameInfo(@RequestBody GameInfoUpdateDTO gameInfoUpdateDTO) throws Exception{
        System.out.println(gameInfoUpdateDTO.getGameMemo());
        return dashBoardService.updateGameInfo(gameInfoUpdateDTO);
    }

    // 게임 삭제 (GameService에 추가해서 불러다 쓸 예정)
    // @DeleteMapping("/gameinfo/delete")

    // 게임 시간별 접속량 불러오기
    @PostMapping("/gameinfo/accessbytime")
    public GameTimeDTO getGameAccessByTime(@RequestBody GameIdDTO gameIdDTO) throws Exception{
        System.out.println(gameIdDTO.getGameIndex());
        return dashBoardService.getGameAccessByTime(gameIdDTO);
    }

    // 게임 일별 접속량 불러오기
    @PostMapping("/gameinfo/accessbyday")
    public GameDateDTO getGameAccessByDay(@RequestBody GameIdDTO gameIdDTO) throws Exception{
        // index가 높아질 수록 최근 날짜
        // 마지막 index는 오늘 날짜
        return dashBoardService.getGameAccessByDay(gameIdDTO);
    }

    /////////////////////////// 페이먼츠 관련 메소드 ///////////////////////////

    // 페이먼츠 리스트 불러오기
    @RequestMapping("/paymentlist")
    public List<PaymentsListDTO> getPaymentList() throws Exception{
        return dashBoardService.getPaymentList();
    }

    // 페이먼츠 캐시 환불
    @PostMapping("/payment/refund/cash")
    public String refundCash(@RequestBody PaymentsListDTO paymentsListDTO) throws Exception{
        return dashBoardService.refundCash(paymentsListDTO);
    }

    // 페이먼츠 캐시 환불 취소
    @PostMapping("/payment/refund/cash/cancel")
    public String cancelRefundCash(@RequestBody PaymentsListDTO paymentsListDTO) throws Exception{
        return dashBoardService.cancelRefundCash(paymentsListDTO);
    }

    // 페이먼츠 게임 환불
    @PostMapping("/payment/refund/game")
    public String refundGame(@RequestBody PaymentsListDTO paymentsListDTO) throws Exception{
        return dashBoardService.refundGame(paymentsListDTO);
    }

    // 페이먼츠 게임 환불 취소
    @PostMapping("/payment/refund/game/cancel")
    public String cancelRefundGame(@RequestBody PaymentsListDTO paymentsListDTO) throws Exception{
        return dashBoardService.cancelRefundGame(paymentsListDTO);
    }

    // 페이먼츠 아바타 환불
    @PostMapping("/payment/refund/avatar")
    public String refundAvatar(@RequestBody PaymentsListDTO paymentsListDTO) throws Exception{
        return dashBoardService.refundAvatar(paymentsListDTO);
    }

    // 페이먼츠 아바타 환불 취소
    @PostMapping("/payment/refund/avatar/cancel")
    public String cancelRefundAvatar(@RequestBody PaymentsListDTO paymentsListDTO) throws Exception{
        return dashBoardService.cancelRefundAvatar(paymentsListDTO);
    }

    // 게시판 관리
    // 게시판 리스트 불러오기
    @PostMapping("/boardlist")
    public List<BoardListDTO> getBoardList() throws Exception{
        return dashBoardService.getBoardList();
    }

    // 게시글 상세정보 불러오기 (유저 아이디(mapper 확인하니 미사용중), 게시글 번호)
    @PostMapping("/postinfo")
    public ViewResponseDTO getPostInfo(@RequestBody ViewDTO request) throws Exception{
        CommentCountDTO count = new CommentCountDTO();              // 댓글 수를 불러올때 쓰는 Request DTO
        count.setPostIndex(request.getPostIndex());                 // ViewDTO 내부에서 postIndex를 받아와서 count에 넣어줌
        ViewResponseDTO view = new ViewResponseDTO();               // 게시글 상세정보를 담을 Response DTO
        view = boardService.getPost(request);                       // 게시글 상세정보를 불러옴
        view.setPostComments(boardService.getCommentCount(count));  // 댓글 수를 불러옴
        return view;
    }

    // 게시글 댓글 불러오기 (게시글 번호)
    @PostMapping("/postcomment")
    public List<CommentListResponseDTO> getCommentList(@RequestBody PostIdDTO request) throws Exception{
        return dashBoardService.getCommentList(request);
    }

    // 게시글 삭제 (유저 아이디, 게시글 번호)
    @DeleteMapping("/postinfo/delete")
    public boolean deletePost(@RequestBody DeleteDTO request) throws Exception{
        return boardService.deletePost(request);
    }

    // 게시글 수정
    @PostMapping("/postinfo/modify")
    public boolean modifyPost(@RequestBody ModifyDTO request) throws Exception{
        return boardService.modifyPost(request);
    }

    // 게시글 추천 수 변화 그래프
    // 있을뻔했다 없었어요

    // 게시글 수정 로그 불러오기
    @PostMapping("/postinfo/modifylog")
    public List<BoardModifyLogDTO> getPostModifyLog(@RequestBody PostIdDTO request) throws Exception{
        return dashBoardService.getPostModifyLog(request);
    }

    // 게시글 내 댓글/조회수 작성 증가량
    @PostMapping("/postcomment/activity")
    public List<BoardPostActivityDTO> getPostCommentActivity(@RequestBody PostIdDTO request) throws Exception{
        return dashBoardService.getPostCommentActivity(request);
    }

    // 아바타 관리
    // 아바타 리스트를 불러오는 메소드
    @PostMapping("/avatarlist")
    public List<AvatarListDTO> getAvatarList() throws Exception{
        return dashBoardService.getAvatarList();
    }

    // 아바타 상세정보 불러오는 메소드
    @PostMapping("/avatarinfo")
    public AvatarDetailDTO getAvatarInfo(@RequestBody AvatarIdDTO request) throws Exception{
        return dashBoardService.getAvatarInfo(request);
    }

}
