package com.project.quantumtec.Service.user;

import com.project.quantumtec.VO.user.UserVO;

import java.util.List;

/**
 * PackageName : com.project.quantumtec.Service.user
 * FileName : UserService
 * Author : Argonaut
 * Date : 2023-05-07
 * Description :
 */
public interface UserService {

    // 사용자리스트
    public List<UserVO> getUserListAll() throws Exception;

    // 로그인
    public UserVO login(String userID, String userPW) throws Exception;
}
