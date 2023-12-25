package com.mobisys.building.service.impl;

import com.mobisys.building.dao.IndoorComputeParamDao;
import com.mobisys.building.entity.IndoorComputeParamInfo;
import com.mobisys.building.service.IndoorComputeParamService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class IndoorComputeParamServiceImpl implements IndoorComputeParamService {

    @Resource
    private IndoorComputeParamDao indoorComputeParamDao;

    @Override
    public List<IndoorComputeParamInfo> getIndoorComputeParamById(int stationId) {
        return indoorComputeParamDao.queryIndoorComputeParamById(stationId);
    }
    @Override
    public boolean update_icap(IndoorComputeParamInfo indoorComputeParamInfo){
        return indoorComputeParamDao.update_icap(indoorComputeParamInfo);
    }
}
