package com.project.quantumtec.Controller;

import com.project.quantumtec.DTO.user.LoginRequestDTO;
import com.project.quantumtec.DTO.user.LoginResponseDTO;
import com.project.quantumtec.DTO.user.singupEmailCodeDTO;
import com.project.quantumtec.Service.user.UserService;
import com.project.quantumtec.VO.user.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    // UserService 의 login 메소드를 호출하여 회원정보를 반환하는 메소드
    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO user) throws Exception {
        LoginResponseDTO loginResponseDTO = userService.login(user.getUserID(), user.getUserPW());
        return loginResponseDTO;
    }

    // UserService 의 입력받은 회원정보를 DB에 저장하는 메소드
    @PostMapping("/signup")
    public UserVO signupAdd(@RequestBody UserVO user) throws Exception {
        UserVO checkUser = userService.signup(user);
        if(checkUser != null) {
            return checkUser;
        }else {
            return null;
        }
    }

    // UserService 의 입력받은 회원정보(아이디)가 중복되는지 확인하는 메소드
    @PostMapping("/signup/checkid")
    public boolean checkDuplicateId(@RequestBody UserVO user) throws Exception {
        // true: 중복, false: 중복아님
        return userService.checkDuplicateId(user);
    }

    // UserService 의 입력받은 회원정보(닉네임)가 중복되는지 확인하는 메소드
    @PostMapping("/signup/checknickname")
    public boolean checkDuplicateNickname(@RequestBody UserVO user) throws Exception {
        // true: 중복, false: 중복아님
        return userService.checkDuplicateNickname(user);
    }

    // UserService 의 입력받은 회원정보(이메일)에 인증코드를 전송하는 메소드
    @PostMapping("/signup/send-email-auth")
    public void sendEmailAuth(@RequestBody UserVO user) throws Exception {
        userService.sendEmailAuth(user);
    }

    // UserService 의 입력받은 회원정보(이메일)에 인증코드가 맞는지 확인하는 메소드
    @PostMapping("/signup/check-email-auth")
    public boolean checkEmailAuth(@RequestBody singupEmailCodeDTO key) throws Exception {
        return userService.checkEmailAuth(key);
    }

    // UserService 의 입력받은 회원정보를 삭제하는 메소드
    @DeleteMapping("/delete")
    public boolean deleteUser(@RequestParam int userIdx) throws Exception {
        return userService.deleteUser(userIdx);
    }

    // UserService 의 입력받은 회원정보를 수정하는 메소드
    @PutMapping("/update")
    public boolean updateUser(@RequestBody UserVO user) throws Exception {
        return userService.updateUser(user);
    }   
}