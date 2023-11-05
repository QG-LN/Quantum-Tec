package com.project.quantumtec.Controller;

import com.project.quantumtec.DTO.Request.dashboard.UserIdDTO;
import com.project.quantumtec.DTO.Request.dashboard.UserSearchDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserInfoDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserListDTO;
import com.project.quantumtec.Service.dashboard.DashBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class DashBoardController {

    @Autowired
    private DashBoardService dashBoardService;

    //프로필 정보 조회
    @PostMapping("/userinfo")
    public UserInfoDTO getUserInfo(@RequestBody UserIdDTO user){
        return dashBoardService.getUserInfo(user);
    }

    //사용자 리스트 조회
    @PostMapping("/userlist")
    public List<UserListDTO> getUserList(){
        return dashBoardService.getUserList();
    }
}
