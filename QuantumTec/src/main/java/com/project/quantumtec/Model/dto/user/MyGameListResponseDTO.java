package com.project.quantumtec.Model.dto.user;
import lombok.Data;

@Data
public class MyGameListResponseDTO {
    private int usetIndex;
    private String gameName;
    private String gameImageLocation;
    private String usergameplayTotalPlayTime;
    private String gameCategoryName;
}
