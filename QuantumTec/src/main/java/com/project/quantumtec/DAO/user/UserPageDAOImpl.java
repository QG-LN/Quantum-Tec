package com.project.quantumtec.DAO.user;

import com.project.quantumtec.DTO.Request.myinfo.PaymentMyInfoDTO;
import com.project.quantumtec.DTO.Response.myInfo.PaymentHistoryDTO;
import com.project.quantumtec.DTO.Response.myInfo.PaymentHistoryListDTO;
import com.project.quantumtec.VO.user.UserPaymentVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class UserPageDAOImpl implements UserPageDAO{

    @Autowired
    private SqlSession sqlSession;

    @Override
    public PaymentHistoryListDTO getPaymentHistory(PaymentMyInfoDTO user) {
        List<UserPaymentVO> list = sqlSession.selectList("UserPageService.getPaymentHistory", user);
        int listCount =  sqlSession.selectOne("UserPageService.getPaymentHistoryCount", user);


        // 결제 내역 리스트 반환 DTO 객체 생성
        PaymentHistoryListDTO paymentHistoryListDTO = new PaymentHistoryListDTO();
        paymentHistoryListDTO.setPaymentHistoryList(new ArrayList<>());    // 결제 내역 리스트 초기화
        paymentHistoryListDTO.setPaymentHistoryCount(listCount);    // 결제 내역 개수 설정

        // 결제 내역 리스트에 결제 내역 추가
        for(UserPaymentVO vo : list){
            PaymentHistoryDTO dto = new PaymentHistoryDTO();
            dto.setPaymentIndex(vo.getPaymentIndex());
            dto.setPaymentDesc(vo.getItemName());
            dto.setPaymentAmount(vo.getPaymentAmount());
            dto.setPaymentDate(vo.getPaymentDate());
            dto.setPaymentType(vo.getPaymentMethod());
            dto.setPaymentStatus(vo.getPaymentStatus());
            paymentHistoryListDTO.getPaymentHistoryList().add(dto);
        }

        return paymentHistoryListDTO;
    }
}
