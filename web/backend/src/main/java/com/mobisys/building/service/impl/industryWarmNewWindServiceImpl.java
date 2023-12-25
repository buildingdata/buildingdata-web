package com.mobisys.building.service.impl;

import com.mobisys.building.dao.industryWarmNewWindDao;
import com.mobisys.building.entity.industryWarmNewWindInfo;
import com.mobisys.building.service.industryWarmNewWindService;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import java.util.List;

@Service
public class industryWarmNewWindServiceImpl implements industryWarmNewWindService {
    @Resource
    private industryWarmNewWindDao industryWarmNewWindDao;
    @Override
    public List<industryWarmNewWindInfo> getindustryWarmNewWindById(int id) {
        return industryWarmNewWindDao.queryindustryWarmNewWindById(id);
    }
}
