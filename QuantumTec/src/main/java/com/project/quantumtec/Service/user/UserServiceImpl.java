package com.project.quantumtec.Service.user;

import com.project.quantumtec.DAO.user.UserDAO;
import com.project.quantumtec.DTO.user.LoginResponseDTO;
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
        return userDAO.isIdDuplicate(user);
    }

    @Override
    public boolean checkDuplicateNickname(UserVO user) throws Exception {
        return userDAO.isNicknameDuplicate(user);
    }

    @Override
    public void sendEmailAuth(UserVO user) throws Exception {
        emailApi.createKey();
        emailApi.sendEmail(user.getUserEmail(),"TestTitle" , emailApi.getKey());
    }
}
