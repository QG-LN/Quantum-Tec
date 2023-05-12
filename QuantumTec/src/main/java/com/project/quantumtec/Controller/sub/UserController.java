package com.project.quantumtec.Controller.sub;

import com.project.quantumtec.DTO.user.LoginRequestDTO;
import com.project.quantumtec.DTO.user.LoginResponseDTO;
import com.project.quantumtec.DTO.user.UserDTO;
import com.project.quantumtec.Service.user.UserService;
import com.project.quantumtec.VO.user.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    // UserService 의 login 메소드를 호출하여 회원정보를 반환하는 메소드
    public LoginResponseDTO login(LoginRequestDTO user) throws Exception {
        LoginResponseDTO loginResponseDTO = userService.login(user.getUserID(), user.getUserPW());
        return loginResponseDTO;
//        if(loginResponseDTO != null) {
//            return loginResponseDTO;
//        }else {
//            return null;
//        }
    }

    public UserVO signupAdd(@RequestBody UserVO user) throws Exception {
        UserVO checkUser = userService.signup(user);
        if(checkUser != null) {
            return checkUser;
        }else {
            return null;
        }
    }

    public boolean checkDuplicateId(@RequestBody UserVO user) throws Exception {
        // true: 중복, false: 중복아님
        return userService.checkDuplicateId(user);
    }

    public boolean checkDuplicateNickname(@RequestBody UserVO user) throws Exception {
        // true: 중복, false: 중복아님
        return userService.checkDuplicateNickname(user);
    }

    public void sendEmailAuth(@RequestBody UserVO user) throws Exception {
        userService.sendEmailAuth(user);
    }
}