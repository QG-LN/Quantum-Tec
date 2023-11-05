package com.project.quantumtec.Global;

import java.util.List;

import org.springframework.stereotype.Component;

import com.project.quantumtec.Model.exp.ExpToLevelModel;

@Component
public class ExpToLevel {
    private List<ExpToLevelModel> expToLevelList;

    public synchronized int getExpToLevel(int exp) {
        // 리스트가 비어있거나 null이면 -1 또는 예외를 반환할 수 있습니다.
        if (expToLevelList == null || expToLevelList.isEmpty()) {
            // 여기서는 예외를 던지는 것으로 처리하겠습니다.
            throw new IllegalStateException("Experience to level list is not set or empty.");
        }
    
        // 리스트를 순회하면서 주어진 경험치와 매칭되는 레벨을 찾습니다.
        for (ExpToLevelModel model : expToLevelList) {
            if (exp < model.getGameRequiredExperience()) {
                // 경험치가 필요한 값보다 작을 때 바로 이전 레벨을 반환합니다.
                // expToLevelList가 required_exp 기준으로 오름차순 정렬되어 있다고 가정합니다.
                return model.getGameLevel() - 1;
            }
        }
    
        // 모든 레벨의 필요 경험치보다 크거나 같은 경우, 리스트의 마지막 레벨을 반환합니다.
        // 이는 주어진 경험치가 리스트에 있는 모든 레벨의 필요 경험치를 초과하는 경우입니다.
        return expToLevelList.get(expToLevelList.size() - 1).getGameLevel();
    }
    

    public synchronized void setExpToLevel(List<ExpToLevelModel> expToLevelList) {
        this.expToLevelList = expToLevelList;
    }
}
