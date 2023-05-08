package com.project.quantumtec.Service.login;

import com.project.quantumtec.VO.user.UserStatusVO;
import com.project.quantumtec.VO.user.UserVO;
import org.springframework.web.bind.annotation.RequestBody;

public interface LoginService {
    //
    public UserVO login(String userID, String userPW) throws Exception;

    public UserStatusVO getUserStatus(int userIdx) throws Exception;

}
