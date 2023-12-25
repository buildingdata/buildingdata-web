package com.mobisys.building.service.impl;

import com.mobisys.building.dao.NonHeatingAirIndoorCalculationParametersDao;
import com.mobisys.building.entity.NonHeatingAirIndoorCalculationParametersInfo;
import com.mobisys.building.service.NonHeatingAirIndoorCalculationParametersService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class NonHeatingAirIndoorCalculationParametersServiceImpl implements NonHeatingAirIndoorCalculationParametersService {
    @Resource
    NonHeatingAirIndoorCalculationParametersDao nonHeatingAirIndoorCalculationParametersDao;

    @Override
    public List<NonHeatingAirIndoorCalculationParametersInfo> getNonHeatingAirIndoorCalculationParametersById(int id) {
        return nonHeatingAirIndoorCalculationParametersDao.queryNonHeatingAirIndoorCalculationParametersById(id);
    }

    @Override
    public boolean addNonHeatingAirIndoorCalculationParameters(NonHeatingAirIndoorCalculationParametersInfo nonHeatingAirIndoorCalculationParametersInfo) {
        return nonHeatingAirIndoorCalculationParametersDao.insertNonHeatingAirIndoorCalculationParameters(nonHeatingAirIndoorCalculationParametersInfo);
    }
    @Override
    public boolean update_non_heating_air_indoor_calculation_parameters(NonHeatingAirIndoorCalculationParametersInfo nonHeatingAirIndoorCalculationParametersInfo){
        return  nonHeatingAirIndoorCalculationParametersDao.update_non_heating_air_indoor_calculation_parameters(nonHeatingAirIndoorCalculationParametersInfo);
    }
}
