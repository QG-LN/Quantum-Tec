package com.project.quantumtec.Controller;

import com.project.quantumtec.DTO.Request.dashboard.UserIdDTO;
import com.project.quantumtec.DTO.Request.dashboard.UserItemSearchDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserActivityLogDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserInfoDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserItemDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserListDTO;
import com.project.quantumtec.Service.dashboard.DashBoardService;
import com.project.quantumtec.Service.user.UserService;
import com.project.quantumtec.VO.user.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class DashBoardController {

    @Autowired
    private DashBoardService dashBoardService;
    private UserService userService;

    //프로필 정보 조회
    @PostMapping("/userinfo")
    public UserInfoDTO getUserInfo(@RequestBody UserIdDTO user){
        return dashBoardService.getUserInfo(user);
    }

    //프로필 정보 변경
    @PostMapping("/userinfo/update")
    public boolean updateUserInfo(@RequestBody UserInfoDTO user) throws Exception{
        return dashBoardService.updateUserInfo(user);
    }
    //계정 활성화/비활성화 변환
    @PostMapping("/userinfo/convertuserstatus")
    public String convertUserStatus(@RequestBody UserIdDTO user) throws Exception{
        return dashBoardService.convertUserStatus(user);
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
    public List<UserItemDTO> getUserItemList(@RequestBody UserItemSearchDTO user) throws Exception{
        return dashBoardService.getUserItemList(user);
    }

    //사용자 활동 로그 항목별 일부 불러오기
    @PostMapping("/userinfo/activitylog")
    public List<UserActivityLogDTO> getUserActivityLog(@RequestBody UserIdDTO user) throws Exception{
        return dashBoardService.getUserActivityLog(user);
    }

    //사용자 활동 로그 전체 불러오기
    @PostMapping("/userinfo/activitylogdetail")
    public List<UserActivityLogDTO> getUserActivityLogDetail(@RequestBody UserIdDTO user) throws Exception{
        return dashBoardService.getUserActivityLogDetail(user);
    }

    //사용자 리스트 조회
    @RequestMapping("/userlist")
    public List<UserListDTO> getUserList() throws Exception{
        return dashBoardService.getUserList();
    }
}
