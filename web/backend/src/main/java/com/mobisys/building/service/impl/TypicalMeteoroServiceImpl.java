package com.mobisys.building.service.impl;
import com.mobisys.building.dao.TypicalMeteoroLogicalDao;
import com.mobisys.building.entity.TypicalMeteoroLogicalInfo;
import com.mobisys.building.service.TypicalMeteoroLogicalService;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.DecimalFormat;
import java.util.*;

@Service
public class TypicalMeteoroServiceImpl implements TypicalMeteoroLogicalService{
    @Resource
    private TypicalMeteoroLogicalDao typicalMeteoroLogicalDao;
    @Override
    public Map<String,List<Map<String,List<Double>>>> getTypicalMeteoroLogicalById(int stationId) {

        Map<String,List<Map<String,List<Double>>>> res =dealMessage(stationId);
       return res;

    }
    @Override
    public boolean addTypical(TypicalMeteoroLogicalInfo typicalMeteoroLogicalInfo) {
        return typicalMeteoroLogicalDao.insertTypical(typicalMeteoroLogicalInfo);
    }

    @Override
    public boolean addTypicalList10(@Param("typicalMeteoroLogicalInfolist") List<TypicalMeteoroLogicalInfo> typicalMeteoroLogicalInfolist) {
        return typicalMeteoroLogicalDao.insertTypicalList10(typicalMeteoroLogicalInfolist);
    }

    public Map<String,List<Map<String,List<Double>>>> dealMessage(int stationid){
        double [][] dryTem  = new double[13][25];
        double [][]  dryTemMax  = new double[13][25];
        double [][] dryTemMin  = new double[13][25];
        double [][] pointTem  = new double[13][25];
        double [][] sunRad  = new double[13][25];
        double [][] dirRad  = new double[13][25];
        double [][] scatterRad  = new double[13][25];
        int [] monthCount = new int [13];
        List<Double>  path=new ArrayList<>();
        for(int i=0;i<13;i++)
            monthCount[i] = 0;
        double [][] num = new double [13][24];
        for(int i=0;i<13;i++){
            for(int j=0;j<=24;j++)
            {
                dryTem[i][j] =0;
                dryTemMax[i][j] =Double.MIN_VALUE;
                dryTemMin[i][j] =Double.MAX_VALUE;
                pointTem[i][j] =0;sunRad[i][j] =0;dirRad[i][j] =0;
                dirRad[i][j] =0;
            }
        }
        List<TypicalMeteoroLogicalInfo> list= typicalMeteoroLogicalDao.queryTypicalMeteoroLogicalById(stationid);
        for(TypicalMeteoroLogicalInfo info : list){
            monthCount[info.getMonth()] = Math.max(monthCount[info.getMonth()],info.getDay());
            int month = info.getMonth();
            int time = info.getTime();

            dryTem[month][time] +=info.getDryTemp();
            dryTemMax[month][time] = Math.max(dryTemMax[month][time],info.getDryTemp());
            dryTemMin[month][time] = Math.min(dryTemMin[month][time],info.getDryTemp());
            pointTem[month][time] +=info.getPointTemper();
            sunRad[month][time] +=info.getSunSumRadiation();
            dirRad[month][time] +=info.getDirectRadiation();
            scatterRad[month][time] +=info.getScatterRadiation();
        }

        Map<String,List<Map<String,List<Double>>>> res = new HashMap<>();
        Map<String,List<Double>> temMap = new HashMap<>();Map<String,List<Double>> temMaxMap = new HashMap<>();
        Map<String,List<Double>> sunMap = new HashMap<>();Map<String,List<Double>> temMinMap = new HashMap<>();
        Map<String,List<Double>> ptemMap = new HashMap<>();
        Map<String,List<Double>> dirMap = new HashMap<>();
        Map<String,List<Double>> scaMap = new HashMap<>();
        List<Double> temList = new ArrayList<>();List<Double> ptemList = new ArrayList<>();
        List<Double> sunList = new ArrayList<>();List<Double> dirList = new ArrayList<>();
        List<Double> scaList = new ArrayList<>();List<Double> temMaxList = new ArrayList<>();
        List<Double> temMinList = new ArrayList<>();

        for(int i=1;i<13;i++){
            int month = monthCount[i];
            DecimalFormat df = new DecimalFormat("#.00");
            for(int j=1;j<=24;j++){
                temList.add(Double.parseDouble(df.format(dryTem[i][j]/month)));
                sunList.add(Double.parseDouble(df.format(sunRad[i][j] /month)));
                ptemList.add(Double.parseDouble(df.format(pointTem[i][j] /month)));
                scaList.add(Double.parseDouble(df.format(scatterRad[i][j] /month)));
                dirList.add(Double.parseDouble(df.format(dirRad[i][j] /month)));
                temMaxList.add(Double.parseDouble(df.format(dryTemMax[i][j])));
                temMinList.add(Double.parseDouble(df.format(dryTemMin[i][j])));
            }
        }
        List<Map<String,List<Double>>> lres = new ArrayList<>();
        temMap.put("dryTem",temList);lres.add(temMap);
        sunMap.put("sunRad",sunList);lres.add(sunMap);
        ptemMap.put("PointTem",ptemList);lres.add(ptemMap);
        dirMap.put("dirRad",dirList);lres.add(dirMap);
        scaMap.put("scatterRad",scaList);lres.add(scaMap);
        temMaxMap.put("dryTemMax",temMaxList);lres.add(temMaxMap);
        temMinMap.put("dryTemMin",temMinList);lres.add(temMinMap);
        res.put("result",lres);

        return res;
    }
}
