package com.project.quantumtec.Controller;

import com.project.quantumtec.Service.login.LoginService;
import com.project.quantumtec.VO.user.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private LoginService loginService;


    public UserVO login(String userID, String userPW) throws Exception {
        UserVO checkUser = loginService.login(userID, userPW);

        if(checkUser != null) {
            return checkUser;
        }else {
            return null;
        }

    }
}
