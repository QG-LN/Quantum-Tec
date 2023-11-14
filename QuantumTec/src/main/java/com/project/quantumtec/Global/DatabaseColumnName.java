package com.project.quantumtec.Global;

import java.util.List;

import org.springframework.stereotype.Component;

import com.project.quantumtec.Model.db.DatabaseColumnNameModel;


@Component
public class DatabaseColumnName {
    private List<DatabaseColumnNameModel> columnNameList;

    public synchronized String getColumnNameList(String name) {
        // 리스트가 비어있거나 null이면 -1 또는 예외를 반환할 수 있습니다.
        if (columnNameList == null || columnNameList.isEmpty()) {
            // 여기서는 예외를 던지는 것으로 처리하겠습니다.
            throw new IllegalStateException("Experience to colunmName list is not set or empty.");
        }
    
        // 리스트를 순회하면서 주어진 테이블과 매칭되는 이름을 찾습니다.
        for (DatabaseColumnNameModel model : columnNameList) {
            if (name.equals(model.getTableName()+"_LOG")) {
                return model.getColumnName();
            }
        }
    
        // 없을 경우 null을 반환합니다.
        return null;
    }
    

    public synchronized void setColumnNameList(List<DatabaseColumnNameModel> columnNameList) {
        this.columnNameList = columnNameList;
    }
}
