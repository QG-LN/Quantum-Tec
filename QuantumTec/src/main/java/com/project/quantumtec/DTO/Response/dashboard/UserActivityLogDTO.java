package com.project.quantumtec.DTO.Response.dashboard;

import lombok.Data;

@Data
public class UserActivityLogDTO {
    private String tableName;
    private String operationType;
    private String operatedBy;
    private String timestamp;
    private String oldValue;
    private String newValue;
    private String metaData;
}
