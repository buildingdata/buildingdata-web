package com.mobisys.building.service.impl;

import com.mobisys.building.dao.TypicalSummerDehumidificationTimeDao;
import com.mobisys.building.entity.TypicalSummerAirconditionerTimeInfo;
import com.mobisys.building.entity.TypicalSummerDehumidificationTimeInfo;
import com.mobisys.building.service.TypicalSummerDehumidificationTimeService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TypicalSummerDehumidificationTimeServiceImpl implements TypicalSummerDehumidificationTimeService {

    @Resource
    private TypicalSummerDehumidificationTimeDao typicalSummerDehumidificationTimeDao;
    @Override
    public List<TypicalSummerDehumidificationTimeInfo> findTSDTById(int stationId) {
        return typicalSummerDehumidificationTimeDao.queryTSDTById(stationId);
    }
    @Override
    public List<TypicalSummerDehumidificationTimeInfo> findTSDTByIT(int stationId, int type) {
        return typicalSummerDehumidificationTimeDao.queryTSDTByIT(stationId,type);
    }
    @Override
    public boolean addTypicalSummerDehumidificationTime(TypicalSummerDehumidificationTimeInfo typicalSummerDehumidificationTimeInfo) {
        return typicalSummerDehumidificationTimeDao.insertTypicalSummerDehumidificationTime(typicalSummerDehumidificationTimeInfo);
    }
    @Override
    public boolean updateTypicalSummerDehumidificationTime(TypicalSummerDehumidificationTimeInfo typicalSummerDehumidificationTimeInfo) {
        return typicalSummerDehumidificationTimeDao.updateTypicalSummerDehumidificationTime(typicalSummerDehumidificationTimeInfo);
    }
}
