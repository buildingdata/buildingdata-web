package com.mobisys.building.service.impl;

import com.mobisys.building.dao.OcpehhccDao;
import com.mobisys.building.entity.OcpedidInfo;
import com.mobisys.building.entity.OcpehhccInfo;
import com.mobisys.building.service.OcpehhccService;
import com.mobisys.building.service.OcpnvdService;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class OcpehhccServiceImpl implements OcpehhccService{

    @Resource
    private OcpehhccDao ocpehhccDao;

    @Override
    public List<OcpehhccInfo> getOcpehhccList() {
        return ocpehhccDao.queryOcpehhcc();
    }

    @Override
    public List<OcpehhccInfo> getOcpehhccById(int id) {
        return ocpehhccDao.queryOcpehhccById(id);
    }
    @Override
    public List<OcpehhccInfo> getOcpehhccByIT(int stationId,int month,int day,int time) {
        return ocpehhccDao.queryOcpehhccByIT(stationId,month,day,time);
    }
    @Override
    public boolean addOcpehhcc(OcpehhccInfo ocpehhccInfo) {
        return ocpehhccDao.insertOcpehhcc(ocpehhccInfo);
    }

    @Override
    public boolean addOcpehhccList(@Param("ocpehhccInfoList") List<OcpehhccInfo> ocpehhccInfoList) {
        return ocpehhccDao.insertOcpehhccList(ocpehhccInfoList); }
    @Override
    public boolean updateOcpehhcc(OcpehhccInfo ocpehhccInfo) {
        return ocpehhccDao.updateOcpehhcc(ocpehhccInfo);
    }

}
