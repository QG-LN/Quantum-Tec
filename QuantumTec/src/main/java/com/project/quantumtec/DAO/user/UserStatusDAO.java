package com.project.quantumtec.DAO.user;

import com.project.quantumtec.VO.user.UserStatusVO;

/**
 * PackageName : com.project.quantumtec.DAO.user
 * FileName : UserStatusDAO
 * Author : MayoneJY
 * Date : 2023-05-09
 * Description :
 */
public interface UserStatusDAO {
    
    public UserStatusVO getUserStatus(int userIdx) throws Exception;
    
}
