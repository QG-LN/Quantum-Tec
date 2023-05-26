package com.project.quantumtec.Service.user;

import com.project.quantumtec.DTO.user.LoginResponseDTO;
import com.project.quantumtec.DTO.user.UserInfoResponseDTO;
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

    public UserInfoResponseDTO getUserInfo(String userID, String userPW) throws Exception;
    // 새로운 로그인 친구
    public LoginResponseDTO login(String userID, String userPW)  throws Exception;

    // 회원가입
    public UserInfoResponseDTO signup(UserVO user) throws Exception;

    // 아이디 중복 확인
    public boolean checkDuplicateId(UserVO user) throws Exception;

    // 닉네임 중복 확인
    public boolean checkDuplicateNickname(UserVO user) throws Exception;

    // 이메일 중복 확인
    public boolean checkDuplicateEmail(UserVO user) throws Exception;

    // 이메일 중복을 확인하고 인증키 보내기
    public boolean sendEmailAuth(UserVO user) throws Exception;

    // 이메일 인증키 확인
    public boolean checkEmailAuth(singupEmailCodeDTO key) throws Exception;

    // 사용자 정보를 삭제하고, 삭제된 정보를 별도의 테이블에 보관함
    public boolean deleteUser(int userIdx) throws Exception;

    // 사용자 정보 수정
    public boolean updateUser(UserVO user) throws Exception;

    // 사용자 아이디 찾기
    public String findId(String userName, String userEmail) throws Exception;

    // 임시 비밀번호 전송을 위한 사용자 정보 확인후 이메일로 전송
    public boolean findPw(String userName, String userEmail, String userID) throws Exception;

    // 이름과 이메일, 아이디, 비밀번호를 입력받아 해당 정보와 일치하는 회원의 비밀번호를 변경한 후, 성공적으로 초기화 되었음을 반환하는 메소드
    public boolean changePw(String userName, String userEmail, String userID, String userPW) throws Exception;
}
