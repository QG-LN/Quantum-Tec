package com.project.quantumtec.Service.dashboard;

import com.project.quantumtec.DAO.dashboard.DashBoardDAO;
import com.project.quantumtec.DTO.Request.dashboard.UserIdDTO;
import com.project.quantumtec.DTO.Request.dashboard.UserSearchDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserInfoDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserListDTO;
import com.project.quantumtec.Global.ExpToLevel;
import com.project.quantumtec.VO.dashboard.UserListVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

@Service("DashBoardServiceImpl")
public class DashBoardServiceImpl implements DashBoardService{

    @Autowired
    private ExpToLevel expToLevel;
    @Autowired
    private DashBoardDAO dashBoardDAO;

    @Override
    public UserInfoDTO getUserInfo(UserIdDTO user) {
        return dashBoardDAO.getUserInfo(user);
    }

    @Override
    public List<UserListDTO> getUserList() {
        List<UserListDTO> userListDTO = new ArrayList<>();
        List<UserListVO> userListVO = dashBoardDAO.getUserList();
        for(int i = 0; i < userListVO.size(); i++){
            UserListDTO dto = new UserListDTO(expToLevel);
            dto = dto.mapUserListVOToDTO(userListVO.get(i));

            userListDTO.add(dto);
            
        }
        return userListDTO;
    }
}
