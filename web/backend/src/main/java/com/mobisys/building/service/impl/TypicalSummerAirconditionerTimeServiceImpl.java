package com.mobisys.building.service.impl;

import com.mobisys.building.dao.TypicalSummerAirconditionerTimeDao;
import com.mobisys.building.entity.TypicalSummerAirconditionerParamInfo;
import com.mobisys.building.entity.TypicalSummerAirconditionerTimeInfo;
import com.mobisys.building.service.TypicalSummerAirconditionerTimeService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TypicalSummerAirconditionerTimeServiceImpl implements TypicalSummerAirconditionerTimeService {
    @Resource
    private TypicalSummerAirconditionerTimeDao typicalSummerAirconditionerTimeDao;
    @Override
    public List<TypicalSummerAirconditionerTimeInfo> findTSATById(int stationId) {
        return typicalSummerAirconditionerTimeDao.queryTSATById(stationId);
    }
    @Override
    public List<TypicalSummerAirconditionerTimeInfo> findTSATByIT(int stationId,int type) {
        return typicalSummerAirconditionerTimeDao.queryTSATByIT(stationId,type);
    }
    @Override
    public boolean addTypicalSummerAirconditionerTime(TypicalSummerAirconditionerTimeInfo typicalSummerAirconditionerTimeInfo) {
        return typicalSummerAirconditionerTimeDao.insertTypicalSummerAirconditionerTime(typicalSummerAirconditionerTimeInfo);
    }
    @Override
    public boolean updateTypicalSummerAirconditionerTime(TypicalSummerAirconditionerTimeInfo typicalSummerAirconditionerTimeInfo) {
        return typicalSummerAirconditionerTimeDao.updateTypicalSummerAirconditionerTime(typicalSummerAirconditionerTimeInfo);
    }
}
