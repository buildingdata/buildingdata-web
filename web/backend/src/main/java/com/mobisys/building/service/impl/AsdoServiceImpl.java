package com.mobisys.building.service.impl;

import com.mobisys.building.dao.AsdoDao;
import com.mobisys.building.entity.AsdoInfo;
import com.mobisys.building.entity.OcpedidInfo;
import com.mobisys.building.service.AsdoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
@Service
public class AsdoServiceImpl implements AsdoService {
    @Resource
    private AsdoDao asdoDao;
    @Override
    public List<AsdoInfo> getAsdoList() {
        return asdoDao.queryAsdo();
    }

    @Override
    public List<AsdoInfo> getAsdoById(int id) {
        return asdoDao.queryAsdoById(id);
    }
    @Override
    public List<AsdoInfo> getAsdoByIT(int id,int time,int type) {
        return asdoDao.queryAsdoByIT(id,time,type);
    }

    @Override
    public boolean addAsdoFromTable_1(AsdoInfo asdoInfo) {
        return asdoDao.insertAsdoFromTable_1(asdoInfo);
    }

    @Override
    public boolean addAsdoFromTable_2(AsdoInfo asdoInfo) {
        return asdoDao.insertAsdoFromTable_2(asdoInfo);
    }

    @Override
    public boolean addAsdoFromTable_3(AsdoInfo asdoInfo) {
        return asdoDao.insertAsdoFromTable_3(asdoInfo);
    }
    @Override
    public boolean updateAsdoFromTable_1(AsdoInfo asdoInfo) {
        return asdoDao.updateAsdoFromTable_1(asdoInfo);
    }
    @Override
    public boolean updateAsdoFromTable_2(AsdoInfo asdoInfo) {
        return asdoDao.updateAsdoFromTable_2(asdoInfo);
    }
    @Override
    public boolean updateAsdoFromTable_3(AsdoInfo asdoInfo) {
        return asdoDao.updateAsdoFromTable_3(asdoInfo);
    }
}
