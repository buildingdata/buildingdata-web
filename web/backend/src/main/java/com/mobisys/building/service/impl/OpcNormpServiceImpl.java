package com.mobisys.building.service.impl;

import com.mobisys.building.dao.OpcNormpDao;
import com.mobisys.building.entity.OpcNormpInfo;
import com.mobisys.building.service.OpcNormpService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
@Service
public class OpcNormpServiceImpl implements OpcNormpService {
    @Resource
    private OpcNormpDao opcNormpDao;
    @Override
    public List<OpcNormpInfo> queryNormParamById(int stationId) {
        return opcNormpDao.queryById(stationId);
    }
}
