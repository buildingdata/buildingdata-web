package com.mobisys.building.service.impl;

import com.mobisys.building.dao.AddSummerNewWindDao;
import com.mobisys.building.entity.AddSummerNewWindInfo;
import com.mobisys.building.service.AddSummerNewWindService;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import java.util.List;

@Service
public class AddSummerNewWindServiceImpl implements AddSummerNewWindService {
    @Resource
    private AddSummerNewWindDao addSummerNewWindDao;
    @Override
    public List<AddSummerNewWindInfo> getaddSummerNewWindById(int id) {
        return addSummerNewWindDao.queryaddSummerNewWindById(id);
    }
}
