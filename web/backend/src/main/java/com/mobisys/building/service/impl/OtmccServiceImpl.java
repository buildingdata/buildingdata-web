package com.mobisys.building.service.impl;

import com.mobisys.building.dao.OtmccDao;
import com.mobisys.building.entity.OcpedidInfo;
import com.mobisys.building.entity.OtmccInfo;
import com.mobisys.building.service.OtmccService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class OtmccServiceImpl implements OtmccService {
    @Resource
    private OtmccDao otmccDao;

    @Override
    public List<OtmccInfo> getOtmccList() {
        return otmccDao.queryOtmcc();
    }

    @Override
    public List<OtmccInfo> getOtmccById(int id) {
        return otmccDao.queryOtmccById(id);
    }
    @Override
    public OtmccInfo getOtmccByIT(int id, int time) {
        return otmccDao.queryOtmccByIT(id,time).get(0);
    }

    @Override
    public boolean addOtmcc(OtmccInfo otmccInfo) {
        return otmccDao.insertOtmcc(otmccInfo);
    }
    @Override
    public boolean updateOtmcc(OtmccInfo otmccInfo) {
        return otmccDao.updateOtmcc(otmccInfo);
    }
}
