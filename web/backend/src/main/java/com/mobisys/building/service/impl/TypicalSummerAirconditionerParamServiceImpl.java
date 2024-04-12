package com.mobisys.building.service.impl;

import com.mobisys.building.dao.TypicalSummerAirconditionerParamDao;
import com.mobisys.building.entity.TypWinAirParamInfo;
import com.mobisys.building.entity.TypicalSummerAirconditionerParamInfo;
import com.mobisys.building.service.TypicalSummerAirconditionerParamService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TypicalSummerAirconditionerParamServiceImpl implements TypicalSummerAirconditionerParamService {
    @Resource
    private TypicalSummerAirconditionerParamDao typicalSummerAirconditionerParamDao;
    @Override
    public List<TypicalSummerAirconditionerParamInfo> findTSAPById(int stationId) {
        return typicalSummerAirconditionerParamDao.queryTSAPById(stationId);
    }
    @Override
    public boolean addTypicalSummerAirconditionerParam(TypicalSummerAirconditionerParamInfo typicalSummerAirconditionerParamInfo) {
        return typicalSummerAirconditionerParamDao.insertTypicalSummerAirconditionerParam(typicalSummerAirconditionerParamInfo);
    }
    @Override
    public boolean updateTypicalSummerAirconditionerParam(TypicalSummerAirconditionerParamInfo typicalSummerAirconditionerParamInfo) {
        return typicalSummerAirconditionerParamDao.updateTypicalSummerAirconditionerParam(typicalSummerAirconditionerParamInfo);
    }
}
