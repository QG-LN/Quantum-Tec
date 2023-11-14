package com.project.quantumtec.Service.user;

import com.project.quantumtec.Model.DTO.Request.myinfo.PaymentMyInfoDTO;
import com.project.quantumtec.Model.DTO.Response.myInfo.PaymentHistoryListDTO;
import com.project.quantumtec.Model.DTO.Request.user.UserWithdrawalRequestDTO;

public interface UserPageService {

    public PaymentHistoryListDTO getPaymentHistory(PaymentMyInfoDTO user) throws Exception;

    // 회원탈퇴를 진행한 경우의 서비스
    public boolean setUserWithdrawal(UserWithdrawalRequestDTO user) throws Exception;
}
