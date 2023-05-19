package com.project.quantumtec.Service.user;

import com.project.quantumtec.DAO.user.UserDAO;
import com.project.quantumtec.DTO.user.LoginResponseDTO;
import com.project.quantumtec.DTO.user.singupEmailCodeDTO;
import com.project.quantumtec.Utils.user.emailApi.EmailApi;
import com.project.quantumtec.Utils.user.emailApi.EmailApiImpl;
import com.project.quantumtec.VO.user.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * PackageName : com.project.quantumtec.Service.user
 * FileName : UserServiceImpl
 * Author : Argonaut
 * Date : 2023-05-07
 * Description :
 */
@Service("UserServiceImpl")
public class UserServiceImpl implements UserService{

    @Autowired
    private UserDAO userDAO;
    @Autowired
    private EmailApi emailApi;

    @Override
    public List<UserVO> getUserListAll() throws Exception {
        System.out.println("service: " + userDAO.getUserListAll());
        return userDAO.getUserListAll();
    }

    @Override
    public LoginResponseDTO login(String userID, String userPW) throws Exception {
        int userIdx = userDAO.getUserExist(userID, userPW);
        if (userIdx <= 0){
            return null;
        }
        else{
            LoginResponseDTO dto = userDAO.getLoginInfo(userIdx);
            return dto;
        }
    }

    @Override
    public UserVO getUserInfo(String userID, String userPW) throws Exception {
        int checkUser = userDAO.getUserExist(userID, userPW);

        if(checkUser >= 1) {
            return userDAO.getUserInfo(checkUser);
        }else {
            return null;
        }
    }

    @Override
    public UserVO signup(UserVO user) throws Exception {
        // 0: 회원가입 실패, 1: 회원가입 성공
        int checkSignUp = userDAO.setUser(user);

        // 인증키 제거
        emailApi.removeKey();
        
        if(checkSignUp == 0) {
            // 회원가입 실패
            return null;
        }else {
            // 회원가입 성공
            return userDAO.getUserInfo(userDAO.getUserExist(user.getUserID(), user.getUserPW()));
        }
    }

    @Override
    public boolean checkDuplicateId(UserVO user) throws Exception {
        // 0: 중복된 아이디 없음, 1: 중복된 아이디 있음
        return userDAO.isIdDuplicate(user);
    }

    @Override
    public boolean checkDuplicateNickname(UserVO user) throws Exception {
        // 0: 중복된 닉네임 없음, 1: 중복된 닉네임 있음
        return userDAO.isNicknameDuplicate(user);
    }



    public boolean checkDuplicateEmail(UserVO user) throws Exception {
        return userDAO.isEmailDuplicate(user);
    }

    @Override
    public boolean sendEmailAuth(UserVO user) throws Exception {
        emailApi.createKey();
        return emailApi.sendEmail(user.getUserEmail(), "TestTitle", emailApi.getKey());
    }
    @Override
    public boolean checkEmailAuth(singupEmailCodeDTO key) throws Exception {
        // 이메일 인증키 확인
        return emailApi.getKey().equals(key.getKey());
    }

    @Override
    public boolean deleteUser(int userIdx) throws Exception{
        // 사용자 정보를 삭제하고, 삭제된 정보를 별도의 테이블에 보관함
        return userDAO.deleteUser(userIdx);
    }

    @Override
    public boolean updateUser(UserVO user) throws Exception {
        // 사용자 정보를 수정함
        return userDAO.updateUser(user);
    }
}