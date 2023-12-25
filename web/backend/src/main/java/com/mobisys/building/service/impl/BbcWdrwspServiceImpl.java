package com.mobisys.building.service.impl;

import com.mobisys.building.dao.BbcWdrwspDao;
import com.mobisys.building.entity.BbcWdrwspInfo;
import com.mobisys.building.service.BbcWdrwspService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class BbcWdrwspServiceImpl implements BbcWdrwspService {
    @Resource
    private BbcWdrwspDao bbcWdrwspDao;
    @Override
    public List<BbcWdrwspInfo> getBbcWdrwspsById(int stationId) {
        return bbcWdrwspDao.queryBbcWdrwspById(stationId);
    }
}
