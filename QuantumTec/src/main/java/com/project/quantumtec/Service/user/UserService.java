package com.project.quantumtec.Service.user;

import com.project.quantumtec.DTO.user.LoginResponseDTO;
import com.project.quantumtec.DTO.user.singupEmailCodeDTO;
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
//    public UserVO login(String userID, String userPW) throws Exception;

    public UserVO getUserInfo(String userID, String userPW) throws Exception;
    // 새로운 로그인 친구
    public LoginResponseDTO login(String userID, String userPW)  throws Exception;

    // 회원가입
    public UserVO signup(UserVO user) throws Exception;

    // 아이디 중복 확인
    public boolean checkDuplicateId(UserVO user) throws Exception;

    // 닉네임 중복 확인
    public boolean checkDuplicateNickname(UserVO user) throws Exception;

    // 이메일 인증키 보내기
    public void sendEmailAuth(UserVO user) throws Exception;

    // 이메일 인증키 확인
    public boolean checkEmailAuth(singupEmailCodeDTO key) throws Exception;

    // 사용자 정보를 삭제하고, 삭제된 정보를 별도의 테이블에 보관함
    public boolean deleteUser(int userIdx) throws Exception;

    // 사용자 정보 수정
    public boolean updateUser(UserVO user) throws Exception;
}
