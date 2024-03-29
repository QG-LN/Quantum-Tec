package com.project.quantumtec.service.user;

import com.project.quantumtec.dao.user.UserDAO;
import com.project.quantumtec.Model.dto.Request.avatar.CashChargeDTO;
import com.project.quantumtec.Model.dto.user.*;
import com.project.quantumtec.service.auth.KeyService;
import com.project.quantumtec.service.auth.PasswordService;
import com.project.quantumtec.Model.vo.user.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * PackageName : com.project.quantumtec.Service.user
 * FileName : UserServiceImpl
 * Author : Argonaut
 * Date : 2023-05-07
 * Description :
 */
@Service("UserServiceImpl")
public class UserServiceImpl implements UserService{

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private KeyService keyService;
    @Autowired
    private PasswordService passwordService;

    @Override
    public List<UserVO> getUserListAll() throws Exception {
        System.out.println("service: " + userDAO.getUserListAll());
        return userDAO.getUserListAll();
    }

    @Override
    public LoginResponseDTO login(String userID, String userPW) throws Exception {
        int userIdx = userDAO.getUserExist(userID, userPW);
        if (userIdx <= 0){
            return null;
        }
        else{
            LoginResponseDTO dto = userDAO.getLoginInfo(userIdx);
            return dto;
        }
    }

    @Override
    public UserInfoResponseDTO getUserInfo(String userID, String userPW) throws Exception {
        int checkUser = checkUserExist(userID, userPW) ? userDAO.getUserExist(userID, userPW) : 0;

        if(checkUser >= 1) {
            return userDAO.getUserInfo(checkUser);
        }else {
            return null;
        }
    }

    /**
     * 사용자 존재여부 확인 [아이디 + 비밀번호]
     * @param userID 아이디
     * @param userPW 비밀번호
     * @return true: 사용자 존재, false: 사용자 미존재
     */
    @Override
    public boolean checkUserExist(String userID, String userPW) throws Exception {
        return userDAO.getUserExist(userID, userPW) > 0;
    }

    @Override
    public boolean signup(UserVO user) throws Exception {
        // 0: 회원가입 실패, 1: 회원가입 성공
        int checkSignUp = userDAO.setUser(user);
        boolean result = checkSignUp == 1;

        // 인증키 제거
        keyService.removeKey();

        return result;
    }

    @Override
    public boolean checkDuplicateId(UserVO user) throws Exception {
        // 0: 중복된 아이디 없음, 1: 중복된 아이디 있음
        return userDAO.isIdDuplicate(user);
    }

    @Override
    public boolean checkDuplicateNickname(UserVO user) throws Exception {
        // 0: 중복된 닉네임 없음, 1: 중복된 닉네임 있음
        return userDAO.isNicknameDuplicate(user);
    }

    
    // UserVO타입으로 user.email 의 값을 수신받아 이메일 중복체크
    public boolean checkDuplicateEmail(UserVO user) throws Exception {
        return userDAO.isEmailDuplicate(user);
    }

    @Override
    public boolean sendEmailAuth(UserVO user) throws Exception {
        keyService.createKey();
        return keyService.sendKeyEmail(user.getUserEmail(), "TestTitle", keyService.getKey());
    }
    @Override
    public boolean checkEmailAuth(singupEmailCodeDTO key) throws Exception {
        // 이메일 인증키 확인
        return keyService.getKey().equals(key.getKey());
    }

    @Override
    public boolean deleteUser(int userIdx) throws Exception{
        // 사용자 정보를 삭제하고, 삭제된 정보를 별도의 테이블에 보관함
        return userDAO.deleteUser(userIdx);
    }

    @Override
    public boolean updateUser(UserVO user) throws Exception {
        // 사용자 정보를 수정함
        return userDAO.updateUser(user);
    }

    @Override
    public String findId(String userName, String userEmail) throws Exception {
        return userDAO.findId(userName, userEmail);
    }

    @Override
    public boolean findPw(String userName, String userEmail, String userID) throws Exception {
        if (userDAO.findPw(userName, userEmail, userID)){
            String tmpPassword = passwordService.createRandomPassword(10);          // 임시 비밀번호 생성
            changePw(userName, userEmail, userID, tmpPassword);                           // 임시 비밀번호로 변경
            return passwordService.sendPasswordResetEmail(userEmail, tmpPassword);        // 임시 비밀번호 이메일 전송
        }
        else return false;
    }

    @Override
    public boolean changePw(String userName, String userEmail, String userID, String userPW) throws Exception {
        return userDAO.changePw(userName, userEmail, userID, userPW);
    }

    @Override
    public List<MyGameListResponseDTO> getMyGameList(String userID) throws Exception {
        return userDAO.getMyGameList(userID);
    }

    @Scheduled(cron = "0 0 * * * *")
    @Override
    public void checkUserGrace() throws Exception {
        // inactive인 사용자를 호출
        List<UserGraceDTO> graceList = userDAO.getGraceUserList();
        List userIndexList = new ArrayList();


        // 반복진행
        for(UserGraceDTO grace : graceList){

            // 포맷터
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

            // grace.getStatusUpdatedAt()를 Date타입으로 변환
            LocalDate date = LocalDate.parse(grace.getStatusUpdatedAt(),formatter);

            // 현재 날짜 구하기 (시스템 시계, 시스템 타임존)
            LocalDate now = LocalDate.now();

            // grace.getStatusUpdatedAt()와 현재 날짜의 차이 구하기
            Period diff = Period.between(date, now);

            // 5일 이상이면 graceUserIdx에 추가
            if(diff.getDays() >= 5){
                userIndexList.add(grace.getUserIndex());
            }

        }
        System.out.println(userIndexList);

        // graceUserIdx가 비어있지 않으면 graceUserIdx에 해당하는 사용자를 삭제
        if(userIndexList.size() > 0)
            userDAO.deleteUserAll(userIndexList);

    }
    
    // 캐시 충전
    @Override
    public int chargeCash(CashChargeDTO cashChargeDTO) throws Exception{
        return userDAO.chargeCash(cashChargeDTO);
    }

    
    // 유저 메타데이터
    @Override
    public void setLogMetadata(LogMetadata logMetadata) throws Exception{
        userDAO.setLogMetadata(logMetadata);
    }
}
