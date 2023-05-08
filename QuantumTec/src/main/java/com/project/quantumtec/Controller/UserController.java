package com.project.quantumtec.Controller;

import com.project.quantumtec.Service.login.LoginService;
import com.project.quantumtec.VO.user.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@Controller
public class UserController {

    @Autowired
    private LoginService loginService;


    @PostMapping("/login")
    public UserVO login(@RequestBody UserVO user) throws Exception {
        UserVO checkUser = loginService.login(user.getUserID(), user.getUserPW());
        if(checkUser != null) {
            return checkUser;
        }else {
            return null;
        }
    }


}
