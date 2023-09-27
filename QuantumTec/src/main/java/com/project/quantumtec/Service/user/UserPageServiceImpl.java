package com.project.quantumtec.Service.user;

import com.project.quantumtec.DAO.user.UserDAO;
import com.project.quantumtec.DTO.Request.myinfo.PaymentMyInfoDTO;
import com.project.quantumtec.DTO.Response.myInfo.PaymentHistoryListDTO;
import com.project.quantumtec.VO.user.UserPaymentVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("UserPageServiceImpl")
public class UserPageServiceImpl implements UserPageService{

    @Autowired
    private UserDAO userDAO;
    @Override
    public List<PaymentHistoryListDTO> getPaymentHistory(PaymentMyInfoDTO user) throws Exception {
        List<UserPaymentVO> voList = userDAO.getPaymentHistory(user);
        List<PaymentHistoryListDTO> list = new ArrayList<>();

        for(UserPaymentVO vo : voList){
            PaymentHistoryListDTO dto = new PaymentHistoryListDTO();
            dto.setPaymentIndex(vo.getPaymentIndex());
            dto.setPaymentDesc(vo.getItemName());
            dto.setPaymentAmount(vo.getPaymentAmount());
            dto.setPaymentDate(vo.getPaymentDate());
            dto.setPaymentType(vo.getPaymentMethod());
            dto.setPaymentStatus(vo.getPaymentStatus());
            list.add(dto);
        }

        return list;
    }
}
