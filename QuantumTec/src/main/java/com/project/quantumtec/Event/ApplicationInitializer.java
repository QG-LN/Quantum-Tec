package com.project.quantumtec.Event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.project.quantumtec.DAO.event.DatabaseDAO;
import com.project.quantumtec.DAO.event.ExpDAO;
import com.project.quantumtec.Global.DatabaseColumnName;
import com.project.quantumtec.Global.ExpToLevel;

@Component
public class ApplicationInitializer {

    @Autowired
    private ExpDAO expDAO;
    @Autowired
    private DatabaseDAO databaseDAO;
    @Autowired
    private ExpToLevel expToLevel;
    @Autowired
    private DatabaseColumnName databaseColunmName;

    @EventListener
    public void onApplicationEvent(ContextRefreshedEvent event) throws Exception {
        expToLevel.setExpToLevel(expDAO.getExpToLevel());
        databaseColunmName.setColumnNameList(databaseDAO.getColumnName());
    }
}
