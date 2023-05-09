package com.project.quantumtec.DAO.user;

import com.project.quantumtec.DTO.user.UserDTO;
import com.project.quantumtec.VO.user.UserVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * PackageName : com.project.quantumtec.DAO.user
 * FileName : UserDAOImpl
 * Author : Argonaut
 * Date : 2023-05-07
 * Description :
 */
@Repository
public class UserDAOImpl implements UserDAO{

    @Autowired
    private SqlSession sqlSession;
    @Override
    public List<UserVO> getUserListAll() throws Exception {
        System.out.println("dao: " + sqlSession.selectList("UserService.getUserListAll"));
        return sqlSession.selectList("UserService.getUserListAll");
    }

    // 사용자의 아이디와 비밀번호를 입력받아 그 값이 존재하는지 확인하고 인덱스를 반환하는 메소드
    @Override
    public int getUserExist(String userID, String userPW) throws Exception {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserID(userID);
        userDTO.setUserPW(userPW);
        if (sqlSession.selectOne("UserService.getUserExist", userDTO) == null) {
            return 0;
        } else {
            return sqlSession.selectOne("UserService.getUserExist", userDTO);
        }
    }
    // 유저 인덱스를 입력받아 사용자 정보를 가져오는 함수
    @Override
    public UserVO getUserInfo(int userIdx) throws Exception {
        return sqlSession.selectOne("UserService.getUserInfo", userIdx);
    }
}
