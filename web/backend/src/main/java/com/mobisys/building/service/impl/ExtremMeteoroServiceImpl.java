package com.mobisys.building.service.impl;
import com.mobisys.building.dao.ExtremeMeteoroLogicalDao;
import com.mobisys.building.entity.ExtremMeteoroLogicalInfo;
import com.mobisys.building.service.ExtremMeteoroLogicalService;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;

@Service
public class ExtremMeteoroServiceImpl implements ExtremMeteoroLogicalService{
    @Resource
    private ExtremeMeteoroLogicalDao extremeMeteoroLogicalDao;
    @Override
    public List<ExtremMeteoroLogicalInfo> getExtremMeteoroLogicalById(int stationId, Date date) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String[] format = simpleDateFormat.format(date).split("-");
        String year = format[0];
        String month = format[1];
        String day = format[2];
        return extremeMeteoroLogicalDao.queryExtremMeteoroLogicalById(stationId,Integer.valueOf(month),Integer.valueOf(day));
    }
    @Override
    public boolean addExtrem(ExtremMeteoroLogicalInfo extremMeteoroLogicalInfo) {
        return extremeMeteoroLogicalDao.insertExtrem(extremMeteoroLogicalInfo);
    }

    @Override
    public List<ExtremMeteoroLogicalInfo> getExtremMeteoroLogicalInnerById(int stationId, Date date) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String[] format = simpleDateFormat.format(date).split("-");
        String year = format[0];
        String month = format[1];
        String day = format[2];
        return extremeMeteoroLogicalDao.queryExtremMeteoroLogicalInnerById(stationId,Integer.valueOf(month),Integer.valueOf(day));
    }

    /**
     * 空调负荷数据
     * @param extremMeteoroLogicalInfoList
     * @return
     */
    @Override
    public boolean addExtremAirList(@Param("extremMeteoroLogicalInfoList") List<ExtremMeteoroLogicalInfo> extremMeteoroLogicalInfoList) {
        return extremeMeteoroLogicalDao.insertExtremAirList(extremMeteoroLogicalInfoList);
    }

    /**
     * 室内过热数据
     * @param extremMeteoroLogicalInfoList
     * @return
     */
    @Override
    public boolean addExtremInnerList(@Param("extremMeteoroLogicalInfoList") List<ExtremMeteoroLogicalInfo> extremMeteoroLogicalInfoList) {
        return extremeMeteoroLogicalDao.insertExtremInnerList(extremMeteoroLogicalInfoList);
    }
    @Override
    public boolean update_t_extreme_meteorological_inner(ExtremMeteoroLogicalInfo extremMeteoroLogicalInfo){
        return extremeMeteoroLogicalDao.update_t_extreme_meteorological_inner(extremMeteoroLogicalInfo);
    }
    @Override
    public boolean update_t_extreme_meteorological_air(ExtremMeteoroLogicalInfo extremMeteoroLogicalInfo){

        return update_t_extreme_meteorological_air(extremMeteoroLogicalInfo);
    }

}
