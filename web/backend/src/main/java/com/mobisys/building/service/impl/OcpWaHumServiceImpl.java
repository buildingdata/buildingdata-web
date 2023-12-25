package com.mobisys.building.service.impl;

import com.mobisys.building.dao.OcpWahumDao;
import com.mobisys.building.entity.OcpWaHumInfo;
import com.mobisys.building.entity.OcpedidInfo;
import com.mobisys.building.service.OcpWahumService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class OcpWaHumServiceImpl implements OcpWahumService {

    @Resource
    private OcpWahumDao ocpWahumDao;
    @Override
    public List<OcpWaHumInfo> queryWaHumById(Integer staionId) {
        return ocpWahumDao.queryWaHumById(staionId);
    }
    @Override
    public boolean addOcpWaHum(OcpWaHumInfo ocpWaHumInfo) {
        return ocpWahumDao.insertOcpWaHum(ocpWaHumInfo);
    }

    @Override
    public boolean updateOcpWaHum(OcpWaHumInfo ocpWaHumInfo) {
        return ocpWahumDao.updateOcpWaHum(ocpWaHumInfo);
    }
}
