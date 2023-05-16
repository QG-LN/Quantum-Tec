package com.project.quantumtec.DAO.user;

import com.project.quantumtec.DTO.user.LoginRequestDTO;
import com.project.quantumtec.DTO.user.LoginResponseDTO;
import com.project.quantumtec.DTO.user.UserDTO;
import com.project.quantumtec.VO.user.UserVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.FlashMap;

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
        Integer result = sqlSession.selectOne("UserService.getUserExist", userDTO);
        return (result == null) ? 0 : result;
    }

    // 사용자의 아이디를 입력받아 그 값이 존재하는지 확인하고 불린을 반환하는 메소드
    @Override
    public boolean isIdDuplicate(UserVO user) throws Exception {
        return (((Integer) sqlSession.selectOne("UserService.selectCountById", user)) == null)? false : true;
    }

    // 사용자의 닉네임을 입력받아 그 값이 존재하는지 확인하고 불린을 반환하는 메소드
    @Override
    public boolean isNicknameDuplicate(UserVO user) throws Exception {
        return (((Integer) sqlSession.selectOne("UserService.selectCountByNickname", user)) == null)? false : true;
    }

    @Override
    public boolean isEmailDuplicate(UserVO user) throws Exception {
        return (((Integer) sqlSession.selectOne("UserService.selectCountByEmail", user)) == null)? false : true;
    }

    // 유저 인덱스를 입력받아 사용자 정보를 가져오는 함수
    @Override
    public UserVO getUserInfo(int userIdx) throws Exception {
        return sqlSession.selectOne("UserService.getUserInfo", userIdx);
    }

    @Override
    public LoginResponseDTO getLoginInfo(int userIdx) throws Exception {
        return sqlSession.selectOne("UserService.getLoginInfo", userIdx);
    }
    
    // 사용자 정보를 입력받아 DB에 저장하는 함수
    @Override
    public int setUser(UserVO user) throws Exception {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserID(user.getUserID());
        userDTO.setUserPW(user.getUserPW());
        userDTO.setUserNickname(user.getUserNickname());
        userDTO.setUserName(user.getUserName());
        userDTO.setUserBirth(user.getUserBirth());
        userDTO.setUserAddress(user.getUserAddress());
        userDTO.setUserAddressDetail(user.getUserAddressDetail());
        userDTO.setUserPostal(user.getUserPostal());
        userDTO.setUserEmail(user.getUserEmail());
        userDTO.setUserRole(user.getUserRole());
        Integer result = sqlSession.insert("UserService.setUser", userDTO);        
        return (result == null) ? 0 : result;
    }
}
