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
        int itemMaxNum = 10; // 한 페이지 당 게시글 수
        user.setStartNum((user.getCurrentPage()-1)*itemMaxNum); // 페이지에 따른 시작 게시글 인덱스 계산
        user.setEndNum(itemMaxNum); // 한 페이지 당 게시글 수
        if(user.getSearchKeyword().equals("")){
            user.setSearchKeyword(null);
        }

        PaymentHistoryListDTO dto = userDAO.getPaymentHistory(user);    // 결제 내역 리스트
        dto.setItemMaxCount(itemMaxNum);                                // 한 페이지 당 게시글 수 세팅

        return dto;
    }
}
