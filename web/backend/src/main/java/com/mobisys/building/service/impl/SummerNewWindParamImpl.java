package com.mobisys.building.service.impl;

import com.mobisys.building.dao.SummerNewWindParamDao;
import com.mobisys.building.entity.SummerNewWindParamInfo;
import com.mobisys.building.entity.TypicalSummerAirconditionerParamInfo;
import com.mobisys.building.service.SummerNewWindParamService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class SummerNewWindParamImpl implements SummerNewWindParamService{
    @Resource
    private SummerNewWindParamDao summerNewWindParamDao;

    @Override
    public List<SummerNewWindParamInfo> getSummerNewWindParamById(int id) {
        return summerNewWindParamDao.querysummerNewWindParamById(id);
    }
    @Override
    public boolean addSummerNewWindParam(SummerNewWindParamInfo summerNewWindParamInfo) {
        return summerNewWindParamDao.insertSummerNewWindParam(summerNewWindParamInfo);
    }
    @Override
    public boolean updateSummerNewWindParam(SummerNewWindParamInfo summerNewWindParamInfo) {
        return summerNewWindParamDao.updateSummerNewWindParam(summerNewWindParamInfo);
    }
}
