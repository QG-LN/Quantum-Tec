package com.project.quantumtec.DAO.user;

import com.project.quantumtec.DTO.user.LoginResponseDTO;
import com.project.quantumtec.DTO.user.UserDTO;
import com.project.quantumtec.DTO.user.UserInfoResponseDTO;
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
        try {
            System.out.println("dao: " + sqlSession.selectList("UserService.getUserListAll"));
            return sqlSession.selectList("UserService.getUserListAll");
        } catch (Exception e) {
           return null;
        }
    }

    // 사용자의 아이디와 비밀번호를 입력받아 그 값이 존재하는지 확인하고 인덱스를 반환하는 메소드
    @Override
    public int getUserExist(String userID, String userPW) throws Exception {
        try {
            UserDTO userDTO = new UserDTO();
            userDTO.setUserID(userID);
            userDTO.setUserPW(userPW);
            Integer result = sqlSession.selectOne("UserService.getUserExist", userDTO);
            return (result == null) ? 0 : result;
        } catch (Exception e) {
            return 0;
        }
    }

    // 사용자의 아이디를 입력받아 그 값이 존재하는지 확인하고 불린을 반환하는 메소드
    @Override
    public boolean isIdDuplicate(UserVO user) throws Exception {
        try {
            return (((Integer) sqlSession.selectOne("UserService.selectCountById", user)) == null)? false : true;
        } catch (Exception e) {
            return false;
        }
    }

    // 사용자의 닉네임을 입력받아 그 값이 존재하는지 확인하고 불린을 반환하는 메소드
    @Override
    public boolean isNicknameDuplicate(UserVO user) throws Exception {
        try {
            return (((Integer) sqlSession.selectOne("UserService.selectCountByNickname", user)) == null)? false : true;
        } catch (Exception e) {
            return false;
        }
    }
    // 사용자의 이메일을 입력받아 값이 존재할 경우 true, 존재하지 않을 경우 false를 반환하는 메소드
    @Override
    public boolean isEmailDuplicate(UserVO user) throws Exception {
        try {
            return (((Integer) sqlSession.selectOne("UserService.selectCountByEmail", user)) == null)? false : true;
        } catch (Exception e) {
            return false;
        }
    }

    // 유저 인덱스를 입력받아 사용자 정보를 가져오는 함수
    @Override
    public UserInfoResponseDTO getUserInfo(int userIdx) throws Exception {
        try {
            return sqlSession.selectOne("UserService.getUserInfo", userIdx);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public LoginResponseDTO getLoginInfo(int userIdx) throws Exception {
        try {
            return sqlSession.selectOne("UserService.getLoginInfo", userIdx);
        } catch (Exception e) {
            return null;
        }
    }

    // 사용자 정보를 입력받아 DB에 저장하는 함수
    @Override
    public int setUser(UserVO user) throws Exception {
        try {
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
        } catch (Exception e) {
            return 0;
        }
    }

    @Override
    public boolean deleteUser(int userIdx) throws Exception {
        try {
            int deleteResult = sqlSession.delete("UserService.deleteUser", userIdx);
            return deleteResult > 0;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateUser(UserVO user) throws Exception {
        try {
            int updateResult = sqlSession.update("UserService.updateUser", user);
            return updateResult > 0;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public String findId(String userName, String userEmail) throws Exception {
        try {
            UserDTO userDTO = new UserDTO();
            userDTO.setUserName(userName);
            userDTO.setUserEmail(userEmail);
            return sqlSession.selectOne("UserService.findId", userDTO);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public boolean findPw(String userName, String userEmail, String userID) throws Exception {
        try {
            UserDTO userDTO = new UserDTO();
            userDTO.setUserName(userName);
            userDTO.setUserEmail(userEmail);
            userDTO.setUserID(userID);
            return sqlSession.selectOne("UserService.findPw", userDTO) != null;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean changePw(String userName, String userEmail, String userID, String userPW) throws Exception {
        try {
            UserDTO userDTO = new UserDTO();
            userDTO.setUserName(userName);
            userDTO.setUserEmail(userEmail);
            userDTO.setUserID(userID);
            userDTO.setUserPW(userPW);
            return sqlSession.update("UserService.changePw", userDTO) > 0;
        } catch (Exception e) {
            return false;
        }
    }
}
