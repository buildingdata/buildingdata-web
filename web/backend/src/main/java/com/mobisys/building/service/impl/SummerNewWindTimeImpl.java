package com.mobisys.building.service.impl;

import com.mobisys.building.dao.SummerNewWindTimeDao;
import com.mobisys.building.entity.SummerNewWindParamInfo;
import com.mobisys.building.entity.SummerNewWindTimeInfo;
import com.mobisys.building.service.SummerNewWindTimeService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class SummerNewWindTimeImpl implements SummerNewWindTimeService{
    @Resource
    private SummerNewWindTimeDao summerNewWindTimeDao;

    @Override
    public List<SummerNewWindTimeInfo> getSummerNewWindTimeById(int id) {
        return summerNewWindTimeDao.querysummerNewWindTimeById(id);
    }
    @Override
    public List<SummerNewWindTimeInfo> getSummerNewWindTimeByIT(int id,int type) {
        return summerNewWindTimeDao.querysummerNewWindTimeByIT(id,type);
    }
    @Override
    public boolean addSummerNewWindTime(SummerNewWindTimeInfo summerNewWindTimeInfo) {
        return summerNewWindTimeDao.insertSummerNewWindTime(summerNewWindTimeInfo);
    }
    @Override
    public boolean updateSummerNewWindTime(SummerNewWindTimeInfo summerNewWindTimeInfo) {
        return summerNewWindTimeDao.updateSummerNewWindTime(summerNewWindTimeInfo);
    }
}
