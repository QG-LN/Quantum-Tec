package com.project.quantumtec.DAO.user;

import com.project.quantumtec.VO.user.UserVO;

import java.util.List;

/**
 * PackageName : com.project.quantumtec.DAO.user
 * FileName : UserDAO
 * Author : Argonaut
 * Date : 2023-05-07
 * Description :
 */
public interface UserDAO {
    // 사용자리스트
    public List<UserVO> getUserListAll() throws Exception;
}
