package com.mobisys.building.dao;

import com.mobisys.building.entity.StationInfo;
import com.mobisys.building.entity.TSpecialDataInfo;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;
import java.util.Map;

/**
 * @Author blankjee
 * @Date 2020/8/31 20:04
 */
public interface OnlineAnalysisDao {

    ArrayList<Double> drawPoint(@Param("i") int i, @Param("beginMonth") String beginMonth, @Param("toMonth") String toMonth, @Param("city2") String city2);

    ArrayList<Double> drawPoint2(@Param("i") int i, @Param("beginMonth") String beginMonth, @Param("toMonth") String toMonth, @Param("city2") String city2);

    Double drawPoint3(@Param("i") int i, @Param("beginTime") String beginTime, @Param("toTime") String toTime, @Param("beginMonth") String beginMonth, @Param("toMonth") String toMonth, @Param("city") String city);

    StationInfo drawCity(String city2);
}
