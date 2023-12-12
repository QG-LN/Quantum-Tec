package com.project.quantumtec.Model.dto.Response.dashboard;

import lombok.Data;

@Data
public class UserActivityLogDTO {
    private String tableEngName;
    private String tableName;
    private String operationType;
    private String operatedBy;
    private String timestamp;
    private String oldValue;
    private String newValue;
    private String metaData;
    private String columnName;
    private int userIndex; 
}
