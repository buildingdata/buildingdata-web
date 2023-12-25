package com.mobisys.building.service.impl;

import com.mobisys.building.dao.simultaneousDao;
import com.mobisys.building.entity.SimultaneousParamInfo;
import com.mobisys.building.service.simultaneousParamService;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class simultaneousParamImpl implements simultaneousParamService {
    @Resource
    private simultaneousDao simultaneousDao;

    @Override
    public List<SimultaneousParamInfo> getSimuParamById(int stationId) {
        return simultaneousDao.queryParamById(stationId);
    }

    @Override
    public boolean addSimultaneousParamList(@Param("simultaneousParamInfoList") List<SimultaneousParamInfo> simultaneousParamInfoList) {
        return simultaneousDao.insertSimultaneousParamList(simultaneousParamInfoList);
    }
    @Override
    public boolean updateSimultaneousParamList(@Param("simultaneousParamInfoList") List<SimultaneousParamInfo> simultaneousParamInfoList) {
        return simultaneousDao.updateSimultaneousParamList(simultaneousParamInfoList);
    }

    @Override
    public boolean addSimultaneousParam(SimultaneousParamInfo simultaneousParamInfo) {
        return simultaneousDao.insertSimultaneousParam(simultaneousParamInfo);
    }
    @Override
    public boolean updateSimultaneousParam(SimultaneousParamInfo simultaneousParamInfo) {
        return simultaneousDao.updateSimultaneousParam(simultaneousParamInfo);
    }
}
