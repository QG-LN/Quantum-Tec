package com.project.quantumtec.DAO.event;

import java.util.List;

import com.project.quantumtec.Model.exp.ExpToLevelModel;

public interface ExpDAO {
    public List<ExpToLevelModel> getExpToLevel() throws Exception;
}
