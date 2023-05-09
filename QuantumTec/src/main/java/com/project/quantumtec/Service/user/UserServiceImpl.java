package com.project.quantumtec.Service.user;

import com.project.quantumtec.DAO.user.UserDAO;
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
    @Override
    public List<UserVO> getUserListAll() throws Exception {
        System.out.println("service: " + userDAO.getUserListAll());
        return userDAO.getUserListAll();
    }

    @Override
    public UserVO login(String inputId, String inputPw)  throws Exception {
        int checkUser = userDAO.getUserExist(inputId, inputPw);

        if(checkUser >= 1) {
            return userDAO.getUserInfo(checkUser);
        }else {
            return null;
        }
    }
}
