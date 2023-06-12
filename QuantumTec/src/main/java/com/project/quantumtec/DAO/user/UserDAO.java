package com.project.quantumtec.DAO.user;

import com.project.quantumtec.DTO.user.LoginResponseDTO;
import com.project.quantumtec.DTO.user.MyGameListResponseDTO;
import com.project.quantumtec.DTO.user.UserInfoResponseDTO;
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
    // 사용자 존재 여부 확인
    public int getUserExist(String userID, String userPW) throws Exception;

    // 사용자 정보 가져오기
    public UserInfoResponseDTO getUserInfo(int userIdx) throws Exception;

    // 로그인 정보 가져오기
    public LoginResponseDTO getLoginInfo(int userIdx) throws Exception;

    // 사용자 추가
    public int setUser(UserVO user) throws Exception;

    // ID 중복 확인
    public boolean isIdDuplicate(UserVO user) throws Exception;

    // 닉네임 중복 확인
    public boolean isNicknameDuplicate(UserVO user) throws Exception;

    // 사용자 정보를 삭제하고, 삭제된 정보를 별도의 테이블에 보관함
    public boolean deleteUser(int userIdx) throws Exception;

    // 사용자 정보 수정
    public boolean updateUser(UserVO user) throws Exception;
    // 이메일 중복 확인
    public boolean isEmailDuplicate(UserVO user) throws Exception;

    // 사용자 아이디 조회
    public String findId(String userName, String userEmail) throws Exception;

    // 비밀번호 초기화를 위한 사용자 정보 확인
    public boolean findPw(String userName, String userEmail, String userID) throws Exception;

    // 사용자 비밀번호 초기화
    public boolean changePw(String userName, String userEmail, String userID, String userPW) throws Exception;

    // 사용자의 게임 목록 가져오기
    public List<MyGameListResponseDTO> getMyGameList(String userID) throws Exception;
}
