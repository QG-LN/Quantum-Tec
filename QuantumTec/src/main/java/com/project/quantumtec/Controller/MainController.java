package com.project.quantumtec.Controller;

import com.project.quantumtec.Controller.sub.UserController;
import com.project.quantumtec.DTO.user.LoginRequestDTO;
import com.project.quantumtec.DTO.user.LoginResponseDTO;
import com.project.quantumtec.DTO.user.singupEmailCodeDTO;
import com.project.quantumtec.VO.user.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MainController
{
    @Autowired
    private UserController userController;

    //UserController 의 login 메소드를 호출하고, 회원 정보를 반환하는 메소드
    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO user) throws Exception
    {
        return userController.login(user);
    }

    @PostMapping("/add")
    public UserVO signupAdd(@RequestBody UserVO user) throws Exception {
        return userController.signupAdd(user);
    }

    @PostMapping("/checkDuplicateId")
    public boolean checkDuplicateId(@RequestBody UserVO user) throws Exception {
        // true: 중복, false: 중복아님
        return userController.checkDuplicateId(user);
    }

    @PostMapping("/checkDuplicateNickname")
    public boolean checkDuplicateNickname(@RequestBody UserVO user) throws Exception {
        // true: 중복, false: 중복아님
        return userController.checkDuplicateNickname(user);
    }

    @PostMapping("/sendEmailAuth")
    public void sendEmailAuth(@RequestBody UserVO user) throws Exception {
        userController.sendEmailAuth(user);
    }

    @PostMapping("/checkEmailAuth")
    public boolean checkEmailAuth(@RequestBody singupEmailCodeDTO key) throws Exception {
        return userController.checkEmailAuth(key);
    }
}