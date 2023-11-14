package com.project.quantumtec.DAO.user;

import com.project.quantumtec.Model.DTO.Request.myinfo.PaymentMyInfoDTO;
import com.project.quantumtec.Model.DTO.Response.myInfo.PaymentHistoryListDTO;
import com.project.quantumtec.Model.DTO.user.UserStatusDTO;
import com.project.quantumtec.Model.DTO.user.UserWithdrawalDTO;

public interface UserPageDAO {
    public PaymentHistoryListDTO getPaymentHistory(PaymentMyInfoDTO user) throws Exception;

    /**
     * 회원 탈퇴 사유를 DB에 저장하는 메소드
     * @param user 회원 탈퇴를 진행한 회원의 정보
     * @return 회원 탈퇴 성공 여부
     */
    public boolean insertUserWithdrawal(UserWithdrawalDTO user) throws Exception;

    /**
     * 회원 탈퇴를 진행한 회원의 State를 inActive로 변경하는 메소드
     * @param user 회원 탈퇴를 진행한 회원의 정보
     * @return 회원 탈퇴 성공 여부
     */
    public boolean updateUserState(UserStatusDTO user) throws Exception;
}
