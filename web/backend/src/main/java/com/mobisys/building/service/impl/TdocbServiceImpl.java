package com.mobisys.building.service.impl;

import com.mobisys.building.dao.TdocbDao;
import com.mobisys.building.entity.TdocbInfo;
import com.mobisys.building.service.TdocbService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TdocbServiceImpl implements TdocbService {
    @Resource
    private TdocbDao tdocbDao;

    @Override
    public List<TdocbInfo> getTdocbList() {
//        System.out.println("这里");
//        System.out.println(tdocbDao.queryTdocb());
        return tdocbDao.queryTdocb();
    }

    @Override
    public TdocbInfo getTdocbById(int id) {
        return tdocbDao.queryTdocbById(id);
    }

    @Override
    public boolean addTdocb(TdocbInfo tdocbInfo) {
        return tdocbDao.insertTdocb(tdocbInfo);
    }
}
