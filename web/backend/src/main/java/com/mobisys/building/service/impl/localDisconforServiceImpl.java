package com.mobisys.building.service.impl;

import com.mobisys.building.dao.localDisconforDao;
import com.mobisys.building.entity.localDisconforInfo;
import com.mobisys.building.service.localDisconforService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
@Service
public class localDisconforServiceImpl implements localDisconforService {
    @Resource
    private com.mobisys.building.dao.localDisconforDao localDisconforDao;
    @Override
    public List<localDisconforInfo> getLocal() {
        return localDisconforDao.query();
    }

    @Override
    public boolean update_t_local_thermal_discomfort(localDisconforInfo localDisconforInfo) {
        return localDisconforDao.update_t_local_thermal_discomfort(localDisconforInfo);
    }
}
