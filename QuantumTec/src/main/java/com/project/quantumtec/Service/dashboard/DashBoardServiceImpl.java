package com.project.quantumtec.Service.dashboard;

import com.project.quantumtec.DAO.dashboard.DashBoardDAO;
import com.project.quantumtec.DTO.Request.dashboard.UserDTO;
import com.project.quantumtec.DTO.Request.dashboard.UserSearchDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserInfoDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserListDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("DashBoardServiceImpl")
public class DashBoardServiceImpl implements DashBoardService{

    @Autowired
    private DashBoardDAO dashBoardDAO;

    @Override
    public UserInfoDTO getUserInfo(UserDTO user) {
        return dashBoardDAO.getUserInfo(user);
    }

    @Override
    public List<UserListDTO> getUserList(UserSearchDTO user) {
        return dashBoardDAO.getUserList(user);
    }
}
