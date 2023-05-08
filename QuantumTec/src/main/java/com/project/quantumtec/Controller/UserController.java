package com.project.quantumtec.Controller;

import com.project.quantumtec.Service.login.LoginService;
import com.project.quantumtec.VO.user.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping ("/api/login")
public class UserController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/testo")
    public UserVO testo(@RequestParam String userID, @RequestParam String userPW) throws Exception {
        return login(userID, userPW);
    }

    public UserVO login(String userID, String userPW) throws Exception {
        UserVO checkUser = loginService.login(userID, userPW);

        if(checkUser != null) {
            return checkUser;
        }else {
            return null;
        }

    }
}
