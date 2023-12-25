package com.mobisys.building.service.impl;

import com.mobisys.building.dao.TypicalSummerDehumidificationParamDao;
import com.mobisys.building.entity.TypicalSummerAirconditionerParamInfo;
import com.mobisys.building.entity.TypicalSummerDehumidificationParamInfo;
import com.mobisys.building.service.TypicalSummerDehumidificationParamService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TypicalSummerDehumidificationParamServiceImpl implements TypicalSummerDehumidificationParamService {
    @Resource
    private TypicalSummerDehumidificationParamDao typicalSummerDehumidificationParamDao;
    @Override
    public List<TypicalSummerDehumidificationParamInfo> findTSDPById(int stationId) {
        return typicalSummerDehumidificationParamDao.queryTSDPById(stationId);
    }
    @Override
    public boolean addTypicalSummerDehumidificationParam(TypicalSummerDehumidificationParamInfo typicalSummerDehumidificationParamInfo) {
        return typicalSummerDehumidificationParamDao.insertTypicalSummerDehumidificationParam(typicalSummerDehumidificationParamInfo);
    }
    @Override
    public boolean updateTypicalSummerDehumidificationParam(TypicalSummerDehumidificationParamInfo typicalSummerDehumidificationParamInfo) {
        return typicalSummerDehumidificationParamDao.updateTypicalSummerDehumidificationParam(typicalSummerDehumidificationParamInfo);
    }
}
