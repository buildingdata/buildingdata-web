package com.mobisys.building.service.impl;

import com.mobisys.building.dao.OcpWahtDao;
import com.mobisys.building.entity.OcpWaHumInfo;
import com.mobisys.building.entity.OcpWahtInfo;
import com.mobisys.building.service.OcpWahtService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
@Service
public class OcpWahtServiceImpl implements OcpWahtService {

    @Resource
    private OcpWahtDao ocpWahtDao;
    @Override
    public List<OcpWahtInfo> queryWahtById(Integer stationId) {
        return ocpWahtDao.queryWahtById(stationId);
    }
    @Override
    public List<OcpWahtInfo> queryWahtByIT(Integer stationId,int type) {
        return ocpWahtDao.queryWahtByIT(stationId,type);
    }
    @Override
    public boolean addOcpWaht(OcpWahtInfo ocpWahtInfo) {
        return ocpWahtDao.insertOcpWaht(ocpWahtInfo);
    }

    @Override
    public boolean updateOcpWaht(OcpWahtInfo ocpWahtInfo) {
        return ocpWahtDao.updateOcpWaht(ocpWahtInfo);
    }
}
