package com.project.quantumtec.Service.user;

import com.project.quantumtec.DTO.Request.myinfo.PaymentMyInfoDTO;
import com.project.quantumtec.DTO.Response.myInfo.PaymentHistoryListDTO;

import java.util.List;

public interface UserPageService {

    public List<PaymentHistoryListDTO> getPaymentHistory(PaymentMyInfoDTO user) throws Exception;
}
