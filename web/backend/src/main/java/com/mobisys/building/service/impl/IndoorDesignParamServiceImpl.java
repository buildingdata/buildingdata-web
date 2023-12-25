package com.mobisys.building.service.impl;

import com.mobisys.building.dao.IndoorDesignParamDao;
import com.mobisys.building.entity.IndoorDesignParamInfo;
import com.mobisys.building.service.IndoorDesignParamService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class IndoorDesignParamServiceImpl implements IndoorDesignParamService {

    @Resource
    private IndoorDesignParamDao indoorDesignParamDao;

    @Override
    public List<IndoorDesignParamInfo> getIndoorDesignParam() {
        return indoorDesignParamDao.queryIndoorDesignParam();
    }

    @Override
    public boolean update_iddp(IndoorDesignParamInfo indoorDesignParamInfo){
        return indoorDesignParamDao.update_iddp(indoorDesignParamInfo);
    }
}
