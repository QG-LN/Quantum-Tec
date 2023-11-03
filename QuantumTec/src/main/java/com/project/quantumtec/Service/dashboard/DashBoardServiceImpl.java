package com.project.quantumtec.Service.dashboard;

import com.project.quantumtec.DAO.dashboard.DashBoardDAO;
import com.project.quantumtec.DTO.Request.dashboard.UserDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserInfoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("DashBoardServiceImpl")
public class DashBoardServiceImpl implements DashBoardService{

    @Autowired
    private DashBoardDAO dashBoardDAO;

    @Override
    public UserInfoDTO getUserInfo(UserDTO user) {
        return dashBoardDAO.getUserInfo(user);
    }
}
