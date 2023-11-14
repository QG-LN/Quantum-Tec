package com.project.quantumtec.dao.event;

import java.util.List;
import com.project.quantumtec.Model.db.DatabaseColumnNameModel;

public interface DatabaseDAO {
    public List<DatabaseColumnNameModel> getColumnName() throws Exception;
}
