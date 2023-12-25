package com.mobisys.building.service.impl;

import com.mobisys.building.dao.TypicalWinterAirconditionerTimeDao;
import com.mobisys.building.entity.TypicalWinterAirconditionerTimeInfo;
import com.mobisys.building.service.TypicalWinterAirconditionerTimeService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TypicalWinterAirconditionerTimeServiceImpl implements TypicalWinterAirconditionerTimeService {
    @Resource
    private TypicalWinterAirconditionerTimeDao typicalWinterAirconditionerTimeDao;
    @Override
    public List<TypicalWinterAirconditionerTimeInfo> findTWATById(int stationId) {
        return typicalWinterAirconditionerTimeDao.queryTWATById(stationId);
    }
}
