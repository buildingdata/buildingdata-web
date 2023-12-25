package com.mobisys.building.service.impl;

import com.mobisys.building.dao.HeatingAirIndoorCalculationParametersDao;
import com.mobisys.building.entity.HeatingAirIndoorCalculationParametersInfo;
import com.mobisys.building.service.HeatingAirIndoorCalculationParametersService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class HeatingAirIndoorCalculationParametersServiceImpl implements HeatingAirIndoorCalculationParametersService {
    @Resource
    HeatingAirIndoorCalculationParametersDao heatingAirIndoorCalculationParametersDao;

    @Override
    public List<HeatingAirIndoorCalculationParametersInfo> getHeatingAirIndoorCalculationParametersById(int id) {
        return heatingAirIndoorCalculationParametersDao.queryHeatingAirIndoorCalculationParametersById(id);
    }

    @Override
    public boolean addHeatingAirIndoorCalculationParameters(HeatingAirIndoorCalculationParametersInfo heatingAirIndoorCalculationParametersInfo) {
        return heatingAirIndoorCalculationParametersDao.insertHeatingAirIndoorCalculationParameters(heatingAirIndoorCalculationParametersInfo);
    }

    @Override
    public boolean update_heating_air_indoor_calculation_parameters(HeatingAirIndoorCalculationParametersInfo heatingAirIndoorCalculationParametersInfo){
        return heatingAirIndoorCalculationParametersDao.update_heating_air_indoor_calculation_parameters(heatingAirIndoorCalculationParametersInfo);
    }
}
