package com.mobisys.building.service.impl;

import com.mobisys.building.dao.indoorHotDao;
import com.mobisys.building.entity.OcpnvdInfo;
import com.mobisys.building.entity.indoorHotInfo;
import com.mobisys.building.service.indoorHotService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
@Service
public class indoorHotServiceImpl implements indoorHotService {
    @Resource
    private indoorHotDao indoorHotDao;

    @Override
    public List<indoorHotInfo> getHot() {
        return indoorHotDao.query();
    }

    @Override
    public boolean update_t_indoor_thermal_classification(indoorHotInfo indoorHotInfo) {
        return indoorHotDao.update_t_indoor_thermal_classification(indoorHotInfo);
    }
}
