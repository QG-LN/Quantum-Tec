package com.project.quantumtec.Controller;

import com.project.quantumtec.DTO.user.LoginRequestDTO;
import com.project.quantumtec.DTO.user.LoginResponseDTO;
import com.project.quantumtec.DTO.user.UserInfoDTO;
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
    public UserInfoDTO signupAdd(@RequestBody UserVO user) throws Exception {
        UserInfoDTO checkUser = userService.signup(user);
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

    // UserService 의 입력받은 회원정보(이메일)가 중복되는지 확인하고 불린을 반환하는 메소드 (중복 true, 중복아님 false)
    @PostMapping("/signup/checkemail")
    public boolean checkDuplicateEmail(@RequestBody UserVO user) throws Exception {
        return userService.checkDuplicateEmail(user);
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

    // 아이디, 비밀번호를 조회하여 그에 해당하는 회원정보 페이지에 출력할 회원정보를 반환하는 메소드
    @PostMapping("/myinfo")
    public UserInfoDTO getUserInfo(@RequestBody UserVO user) throws Exception {
        return userService.getUserInfo(user.getUserID(), user.getUserPW());
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

    // 이름과 이메일을 입력받아 회원 아이디를 문자열로 반환하는 메소드
    @PostMapping("/findid")
    @ResponseBody
    public String findId(@RequestBody UserVO user) throws Exception {
        return userService.findId(user.getUserName(), user.getUserEmail());
    }

    // 이름과 이메일, 아이디를 입력받아 해당 정보와 일치하는 회원의 존재 여부를 반환하는 메소드
    @PostMapping("/findpw")
    public boolean findPw(@RequestBody UserVO user) throws Exception {
        return userService.findPw(user.getUserName(), user.getUserEmail(), user.getUserID());
    }

    // 이름과 이메일, 아이디, 비밀번호를 입력받아 해당 정보와 일치하는 회원의 비밀번호를 변경한 후, 성공적으로 초기화 되었음을 반환하는 메소드
    @PostMapping("/changepw")
    public boolean changePw(@RequestBody UserVO user) throws Exception {
        return userService.changePw(user.getUserName(), user.getUserEmail(), user.getUserID(), user.getUserPW());
    }
}