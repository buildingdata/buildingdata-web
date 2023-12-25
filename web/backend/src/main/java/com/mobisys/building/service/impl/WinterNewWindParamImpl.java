package com.mobisys.building.service.impl;

import com.mobisys.building.dao.WinterNewWindParamDao;
import com.mobisys.building.entity.TypicalSummerAirconditionerParamInfo;
import com.mobisys.building.entity.WinterNewWindParamInfo;
import com.mobisys.building.service.WinterNewWindParamService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class WinterNewWindParamImpl implements WinterNewWindParamService {
    @Resource
    private WinterNewWindParamDao winterNewWindParamDao;

    @Override
    public List<WinterNewWindParamInfo> getWinterNewWindParamById(int id) {
        return winterNewWindParamDao.querywinterNewWindParamById(id);
    }
    @Override
    public boolean addWinterNewWindParam(WinterNewWindParamInfo winterNewWindParamInfo) {
        return winterNewWindParamDao.insertWinterNewWindParam(winterNewWindParamInfo);
    }
    @Override
    public boolean updateWinterNewWindParam(WinterNewWindParamInfo winterNewWindParamInfo) {
        return winterNewWindParamDao.updateWinterNewWindParam(winterNewWindParamInfo);
    }
}
