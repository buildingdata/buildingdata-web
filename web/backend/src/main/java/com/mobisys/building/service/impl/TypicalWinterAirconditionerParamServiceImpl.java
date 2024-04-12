package com.mobisys.building.service.impl;

import com.mobisys.building.dao.TypicalWinterAirconditionerParamDao;
import com.mobisys.building.entity.TypicalWinterAirconditionerParamInfo;
import com.mobisys.building.service.TypicalWinterAirconditionerParamService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TypicalWinterAirconditionerParamServiceImpl implements TypicalWinterAirconditionerParamService {
    @Resource
    private TypicalWinterAirconditionerParamDao typicalWinterAirconditionerParamDao;
    @Override
    public List<TypicalWinterAirconditionerParamInfo> findTWAPById(int stationId) {
        return typicalWinterAirconditionerParamDao.queryTWAPById(stationId);
    }

}
