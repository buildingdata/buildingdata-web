package com.mobisys.building.service.impl;

import com.mobisys.building.dao.OcpMulgrpcDao;
import com.mobisys.building.entity.OcpMulgrpcInfo;
import com.mobisys.building.entity.OcpedidInfo;
import com.mobisys.building.service.OcpMulgrpcService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
@Service
public class OcpMulgrpcServiceImpl implements OcpMulgrpcService {

    @Resource
    private OcpMulgrpcDao ocpMulgrpcDao;

    @Override
    public List<OcpMulgrpcInfo> getOcpMulgrpcList() {
        return ocpMulgrpcDao.queryOcpMulgrpc();
    }

    @Override
    public OcpMulgrpcInfo getOcpMulgrpcById(int id) {
        return ocpMulgrpcDao.queryOcpMulgrpcById(id);
    }

    @Override
    public boolean insertOcpMulgrpc(OcpMulgrpcInfo ocpMulgrpcInfo) {
        return ocpMulgrpcDao.insertOcpMulgrpc(ocpMulgrpcInfo);
    }
    @Override
    public boolean updateOcpMulgrpc(OcpMulgrpcInfo ocpMulgrpcInfo) {
        return ocpMulgrpcDao.updateOcpMulgrpc(ocpMulgrpcInfo);
    }
}
