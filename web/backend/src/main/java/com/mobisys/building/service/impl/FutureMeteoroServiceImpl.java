package com.mobisys.building.service.impl;
import com.mobisys.building.dao.FutureMeteoroLogicalDao;
import com.mobisys.building.entity.FutureMeteoroLogicalInfo;
import com.mobisys.building.service.FutureMeteoroLogicalService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class FutureMeteoroServiceImpl implements FutureMeteoroLogicalService{
    @Resource
    private FutureMeteoroLogicalDao futureMeteoroLogicalDao;
//    @Override
//    public List<FutureMeteoroLogicalInfo> getFutureMeteoroLogicalById(int stationId) {
//        return futureMeteoroLogicalDao.queryFutureMeteoroLogicalById(stationId);
//    }
    public List<FutureMeteoroLogicalInfo> getFutureInfo(int staionId,int month,int day,String type){

        List<FutureMeteoroLogicalInfo> list = new ArrayList<>();
        System.out.println(type.length());
        if(type.equals("RCP45-2050"))
            list = getFuture45050InfoById(staionId,month,day);

        else if(type.equals("RCP45-2099"))
            list = getFuture45099InfoById(staionId,month,day);

        else if(type.equals("RCP85-2050"))
            list = getFuture85050InfoById(staionId,month,day);

        else
            list  =getFuture85099InfoById(staionId,month,day);

        return list;
    }

    @Override
    public List<FutureMeteoroLogicalInfo> getFuture45050InfoById(int stationId,int month,int day) {
        return futureMeteoroLogicalDao.queryFuture45050ById(stationId,month,day);
    }

    @Override
    public List<FutureMeteoroLogicalInfo> getFuture45099InfoById(int stationId,int month,int day) {
        return futureMeteoroLogicalDao.queryFuture45099ById(stationId,month,day);
    }

    @Override
    public List<FutureMeteoroLogicalInfo> getFuture85050InfoById(int stationId,int month,int day) {
        return futureMeteoroLogicalDao.queryFuture85050ById(stationId,month,day);
    }

    @Override
    public List<FutureMeteoroLogicalInfo> getFuture85099InfoById(int stationId,int month,int day) {
        return futureMeteoroLogicalDao.queryFuture85099ById(stationId,month,day);
    }




    @Override
    public boolean insert_t_future_meteorological_p45_2050(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo) {
        return futureMeteoroLogicalDao.insert_t_future_meteorological_p45_2050(futureMeteoroLogicalInfo);
    }
    @Override
    public boolean insert_t_future_meteorological_p45_2099(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo) {
        return futureMeteoroLogicalDao.insert_t_future_meteorological_p45_2099(futureMeteoroLogicalInfo);
    }
    @Override
    public boolean insert_t_future_meteorological_p85_2050(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo) {
        return futureMeteoroLogicalDao.insert_t_future_meteorological_p85_2050(futureMeteoroLogicalInfo);
    }
    @Override
    public boolean insert_t_future_meteorological_p85_2099(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo) {
        return futureMeteoroLogicalDao.insert_t_future_meteorological_p85_2099(futureMeteoroLogicalInfo);
    }





















    @Override
    public boolean update_t_future_meteorological_p45_2050(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo){
        return futureMeteoroLogicalDao.update_t_future_meteorological_p45_2050(futureMeteoroLogicalInfo);
    }
    @Override
    public boolean update_t_future_meteorological_p45_2099(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo){
        return futureMeteoroLogicalDao.update_t_future_meteorological_p45_2099(futureMeteoroLogicalInfo);
    }
    @Override
    public boolean update_t_future_meteorological_p85_2050(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo){
        return futureMeteoroLogicalDao.update_t_future_meteorological_p85_2050(futureMeteoroLogicalInfo);
    }
    @Override
    public boolean update_t_future_meteorological_p85_2099(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo){
        return futureMeteoroLogicalDao.update_t_future_meteorological_p85_2099(futureMeteoroLogicalInfo);
    }
}
