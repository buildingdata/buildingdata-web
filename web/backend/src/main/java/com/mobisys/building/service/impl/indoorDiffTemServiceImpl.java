package com.mobisys.building.service.impl;

import com.mobisys.building.dao.indoorDiffTemDao;
import com.mobisys.building.entity.indoorDiffTemInfo;
import com.mobisys.building.service.indoorDiffTemService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
@Service
public class indoorDiffTemServiceImpl implements indoorDiffTemService {
    @Resource
    private indoorDiffTemDao indoorDiffTemDao;
    @Override
    public List<indoorDiffTemInfo> getDiffTem() {
        return indoorDiffTemDao.query();
    }

    @Override
    public boolean update_t_indoor_different_climate(indoorDiffTemInfo indoorDiffTemInfo){
        return indoorDiffTemDao.update_t_indoor_different_climate(indoorDiffTemInfo);
    }
}
