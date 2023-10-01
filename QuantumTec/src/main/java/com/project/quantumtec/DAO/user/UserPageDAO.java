package com.project.quantumtec.DAO.user;

import com.project.quantumtec.DTO.Request.myinfo.PaymentMyInfoDTO;
import com.project.quantumtec.DTO.Response.myInfo.PaymentHistoryListDTO;

public interface UserPageDAO {
    public PaymentHistoryListDTO getPaymentHistory(PaymentMyInfoDTO user) throws Exception;
}
