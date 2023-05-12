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
}