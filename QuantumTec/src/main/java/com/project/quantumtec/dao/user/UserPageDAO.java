package com.project.quantumtec.dao.user;

import com.project.quantumtec.Model.dto.Request.myinfo.PaymentMyInfoDTO;
import com.project.quantumtec.Model.dto.Response.myInfo.PaymentHistoryListDTO;
import com.project.quantumtec.Model.dto.user.UserStatusDTO;
import com.project.quantumtec.Model.dto.user.UserWithdrawalDTO;

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
