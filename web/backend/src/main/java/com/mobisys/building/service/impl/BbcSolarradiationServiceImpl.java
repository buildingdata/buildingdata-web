package com.mobisys.building.service.impl;

import com.mobisys.building.dao.BbcSolarradiationDao;
import com.mobisys.building.entity.BbcSolarradiationInfo;
import com.mobisys.building.service.BbcSolarradiationService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class BbcSolarradiationServiceImpl implements BbcSolarradiationService {

    @Resource
    private BbcSolarradiationDao bbcSolarradiationDao;
    @Override
    public List<BbcSolarradiationInfo> getBbcSolarradiationById(int stationId) {
        return bbcSolarradiationDao.queryBbcSolarradiationById(stationId);
    }
}
