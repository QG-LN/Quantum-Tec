package com.project.quantumtec.Service.user;

import com.project.quantumtec.DAO.user.UserDAO;
import com.project.quantumtec.DTO.Request.myinfo.PaymentMyInfoDTO;
import com.project.quantumtec.DTO.Response.myInfo.PaymentHistoryListDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("UserPageServiceImpl")
public class UserPageServiceImpl implements UserPageService{

    @Autowired
    private UserDAO userDAO;
    @Override
    public PaymentHistoryListDTO getPaymentHistory(PaymentMyInfoDTO user) throws Exception {
        return userDAO.getPaymentHistory(user);
    }
}
