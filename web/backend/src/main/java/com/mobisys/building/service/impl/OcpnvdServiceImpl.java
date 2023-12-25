package com.mobisys.building.service.impl;

import com.mobisys.building.dao.OcpnvdDao;
import com.mobisys.building.entity.OcpnvdInfo;
import com.mobisys.building.service.OcpnvdService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class OcpnvdServiceImpl implements OcpnvdService {
    @Resource
    private OcpnvdDao ocpnvdDao;

    @Override
    public List<OcpnvdInfo> getOcpnvdList() {
        return ocpnvdDao.queryOcpnvd();
    }

    @Override
    public OcpnvdInfo getOcpnvdById(int id) {
        return ocpnvdDao.queryOcpnvdById(id);
    }

    @Override
    public boolean addOcpnvd(OcpnvdInfo ocpnvdInfo) {
        return ocpnvdDao.insertOcpnvd(ocpnvdInfo);
    }

    @Override
    public boolean updateOcpnvd(OcpnvdInfo ocpnvdInfo) {
        return ocpnvdDao.updateOcpnvd(ocpnvdInfo);
    }

}
