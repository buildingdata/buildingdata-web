package com.mobisys.building.service.impl;

import com.mobisys.building.dao.BbcHumidityDao;
import com.mobisys.building.entity.BbcHumidityInfo;
import com.mobisys.building.service.BbcHumidityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;

import java.util.List;
@Service
public class BbcHumidityImpl implements BbcHumidityService {
    @Resource
    private BbcHumidityDao bbcHumidityDao ;
    @Override
    public List<BbcHumidityInfo> getBbcHumidityById(int stationId) {
        return bbcHumidityDao.queryBbcHumidityById(stationId);
    }
}
