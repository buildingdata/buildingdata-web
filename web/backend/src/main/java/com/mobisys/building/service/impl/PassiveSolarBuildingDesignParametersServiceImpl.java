package com.mobisys.building.service.impl;

import com.mobisys.building.dao.PassiveSolarBuildingDesignParametersDao;
import com.mobisys.building.entity.PassiveSolarBuildingDesignParametersInfo;
import com.mobisys.building.service.PassiveSolarBuildingDesignParametersService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class PassiveSolarBuildingDesignParametersServiceImpl implements PassiveSolarBuildingDesignParametersService {
    @Resource
    PassiveSolarBuildingDesignParametersDao passiveSolarBuildingDesignParametersDao;

    @Override
    public List<PassiveSolarBuildingDesignParametersInfo> getPassiveSolarBuildingDesignParametersById(int id) {
        return passiveSolarBuildingDesignParametersDao.queryPassiveSolarBuildingDesignParametersById(id);
    }

    @Override
    public boolean addPassiveSolarBuildingDesignParameters(PassiveSolarBuildingDesignParametersInfo passiveSolarBuildingDesignParametersInfo) {
        return passiveSolarBuildingDesignParametersDao.insertPassiveSolarBuildingDesignParameters(passiveSolarBuildingDesignParametersInfo);
    }

    @Override
    public boolean update_passive_solar_building_design_parameters(PassiveSolarBuildingDesignParametersInfo passiveSolarBuildingDesignParametersInfo){
        return passiveSolarBuildingDesignParametersDao.update_passive_solar_building_design_parameters(passiveSolarBuildingDesignParametersInfo);
    }
}
