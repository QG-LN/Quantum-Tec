package com.project.quantumtec.Service.login;

import com.project.quantumtec.VO.user.UserVO;

public interface LoginService {
    //
    public UserVO login(String userID, String userPW) throws Exception;;
}
