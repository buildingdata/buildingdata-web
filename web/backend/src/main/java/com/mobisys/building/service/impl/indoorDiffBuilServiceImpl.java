package com.mobisys.building.service.impl;

import com.mobisys.building.dao.indoorDiffBuilDao;

import com.mobisys.building.entity.indoorDiffBuilInfo;

import com.mobisys.building.service.indoorDiffBuilService;

import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
@Service
public class indoorDiffBuilServiceImpl implements indoorDiffBuilService {
    @Resource
    private indoorDiffBuilDao indoorDiffBuilDao;
    @Override
    public List<indoorDiffBuilInfo> getDiffBuil(String type) {
        return indoorDiffBuilDao.queryByBuild(type);
    }

    @Override
    public List<String> getType() {
        return indoorDiffBuilDao.getType();
    }

    @Override
    public boolean update_t_diffrent_build_temper(indoorDiffBuilInfo indoorDiffBuilInfo){
        return indoorDiffBuilDao.update_t_diffrent_build_temper(indoorDiffBuilInfo);
    }
}
