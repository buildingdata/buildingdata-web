package com.mobisys.building.service.impl;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.mobisys.building.dao.OcpedidDao;
import com.mobisys.building.entity.OcpedidInfo;
import com.mobisys.building.entity.OcpnvdInfo;
import com.mobisys.building.service.OcpedidService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class OcpedidServiceImpl implements OcpedidService{
    @Resource
    private OcpedidDao ocpedidDao;
    @Override
    public List<OcpedidInfo> getOcpedidList() {
        return ocpedidDao.queryOcpedid();
    }

    @Override
    public List<OcpedidInfo> getOcpedidById(int id) {
        return ocpedidDao.queryOcpedidById(id);
    }
    @Override
    public OcpedidInfo getOcpedidByIT(int id,int time) {
        return ocpedidDao.queryOcpedidByIT(id,time).get(0);
    }

    @Override
    public boolean addOcpedid(OcpedidInfo ocpedidInfo) {
        return ocpedidDao.insertOcpedid(ocpedidInfo);
    }

    @Override
    public boolean updateOcpedid(OcpedidInfo ocpedidInfo) {
        return ocpedidDao.updateOcpedid(ocpedidInfo);
    }
}
