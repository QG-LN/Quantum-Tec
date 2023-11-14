package com.project.quantumtec.Service.user;

import com.project.quantumtec.DAO.user.UserDAO;
import com.project.quantumtec.DAO.user.UserPageDAO;
import com.project.quantumtec.Model.DTO.Request.myinfo.PaymentMyInfoDTO;
import com.project.quantumtec.Model.DTO.Response.myInfo.PaymentHistoryListDTO;
import com.project.quantumtec.Model.DTO.Request.user.UserWithdrawalRequestDTO;
import com.project.quantumtec.Model.DTO.user.UserStatusDTO;
import com.project.quantumtec.Model.DTO.user.UserWithdrawalDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("UserPageServiceImpl")
public class UserPageServiceImpl implements UserPageService{

    @Autowired
    private UserPageDAO userPageDAO;

    @Autowired
    private UserDAO userDAO;

    @Override
    public PaymentHistoryListDTO getPaymentHistory(PaymentMyInfoDTO user) throws Exception {
        int itemMaxNum = 10; // 한 페이지 당 게시글 수
        user.setStartNum((user.getCurrentPage()-1)*itemMaxNum); // 페이지에 따른 시작 게시글 인덱스 계산
        user.setEndNum(itemMaxNum); // 한 페이지 당 게시글 수
        if(user.getSearchKeyword().equals("")){
            user.setSearchKeyword(null);
        }

        PaymentHistoryListDTO dto = userPageDAO.getPaymentHistory(user);    // 결제 내역 리스트
        dto.setItemMaxCount(itemMaxNum);                                // 한 페이지 당 게시글 수 세팅

        return dto;
    }

    /**
     * 회원 탈퇴를 한 경우의 서비스
     * @param user 회원 탈퇴를 진행한 회원의 정보
     * @return 회원 탈퇴 성공 여부
     */
    @Override
    public boolean setUserWithdrawal(UserWithdrawalRequestDTO user) throws Exception {
        int checkUserIndex = userDAO.getUserExist(user.getUserID(), user.getUserPW()); // 회원 존재 여부 확인

        UserWithdrawalDTO withdrawalDTO = new UserWithdrawalDTO();
        UserStatusDTO statusDTO = new UserStatusDTO();

        // 회원 존재 여부 확인
        if(checkUserIndex > 0){

            // 1.회원 탈퇴 사유를 DB에 저장
            withdrawalDTO.setWithdrawalUserIndex(checkUserIndex);               // 회원 탈퇴를 진행한 회원의 인덱스
            withdrawalDTO.setWithdrawalListIndex(user.getUserReasonCode());     // 회원 탈퇴 사유 코드
            withdrawalDTO.setWithdrawalOtherReason(user.getUserReason());       // 회원 탈퇴 사유
            boolean insertResult = userPageDAO.insertUserWithdrawal(withdrawalDTO);   // 회원 탈퇴 사유를 DB에 저장

            // 2. 회원 탈퇴를 진행한 회원의 State를 inActive로 변경
            statusDTO.setUserIndex(checkUserIndex);                             // 회원 탈퇴를 진행한 회원의 인덱스
            statusDTO.setUserStatus("inactive");                                // 회원 탈퇴를 진행한 회원의 State
            boolean updateResult = userPageDAO.updateUserState(statusDTO);      // 회원 탈퇴를 진행한 회원의 State를 inActive로 변경

            return insertResult && updateResult;
        }
        else{
            return false;
        }
    }
}
