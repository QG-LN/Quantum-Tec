package com.project.quantumtec.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.project.quantumtec.dao.event.DatabaseDAO;
import com.project.quantumtec.dao.event.ExpDAO;
import com.project.quantumtec.global.DatabaseColumnName;
import com.project.quantumtec.global.ExpToLevel;

/**
 * 스프링 컨텍스트가 초기화 및 새로고침 된 이후 실행되는 초기화 코드
 */
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

    /**
     * ContextRefreshedEvent 이벤트가 발생하면 실행되는 메소드
     * @param event 발생 이벤트
     */
    @EventListener
    public void onApplicationEvent(ContextRefreshedEvent event) throws Exception {
        expToLevel.setExpToLevel(expDAO.getExpToLevel());                       // 경험치 테이블을 불러와서 저장
        databaseColunmName.setColumnNameList(databaseDAO.getColumnName());      // 데이터베이스 컬럼 이름을 불러와서 저장
    }
}
