package com.mobisys.building.dao;
import com.mobisys.building.entity.TypicalMeteoroLogicalInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;
public interface TypicalMeteoroLogicalDao {
    /*
     * 根据台站号查询典型气象年参数
     * */
    List<TypicalMeteoroLogicalInfo> queryTypicalMeteoroLogicalById(int id);
    boolean insertTypical(TypicalMeteoroLogicalInfo typicalMeteoroLogicalInfo);
    boolean insertTypicalList10(@Param("typicalMeteoroLogicalInfolist") List<TypicalMeteoroLogicalInfo> typicalMeteoroLogicalInfolist);
}
