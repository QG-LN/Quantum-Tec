package com.project.quantumtec.Service.login;

import com.project.quantumtec.DAO.user.UserDAO;
import com.project.quantumtec.DAO.user.UserStatusDAO;
import com.project.quantumtec.VO.user.UserStatusVO;
import com.project.quantumtec.VO.user.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

@Service("LoginServiceImpl")
public class LoginServiceImpl implements LoginService{

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private UserStatusDAO userStatusDAO;

    @Override
    public UserVO login(String inputId, String inputPw)  throws Exception {
        int checkUser = userDAO.getUserExist(inputId, inputPw);

        if(checkUser >= 1) {
            return userDAO.getUserInfo(checkUser);
        }else {
            return null;
        }
    }

    @Override
    public UserStatusVO getUserStatus(int userIdx) throws Exception {
        return userStatusDAO.getUserStatus(userIdx);
    }
}
