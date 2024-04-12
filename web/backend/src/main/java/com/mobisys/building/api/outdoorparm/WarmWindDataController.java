package com.mobisys.building.api.outdoorparm;

import com.mobisys.building.entity.*;
import com.mobisys.building.service.*;
import org.apache.ibatis.jdbc.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping(value = "/winterSummerTypical", method = RequestMethod.GET)

public class WarmWindDataController {
    /**
     * 访问冬夏季典型设计气象日参数-夏季新风计算室外计算参数的信息
     * 1.getSummerNewWindById是通过站台号访问夏季新风表数据的方法
     */
    @Resource
    private SummerNewWindParamService summerNewWindParamService;
    @Resource
    private SummerNewWindTimeService summerNewWindTimeService;

    @RequestMapping(value = "/getsummernewwind", method = RequestMethod.GET)
    public Map<String, Object> getSummerNewWindById(HttpServletRequest request,int id){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<SummerNewWindParamInfo> summernewwindparamList = new ArrayList<>();
        List<SummerNewWindTimeInfo> summernewwindtimeList=new ArrayList<>();
        //焓值逐时变化系数
        List<SummerNewWindTimeInfo> enthalpyList=new ArrayList<>();
        //干球温度逐时变化系数
        List<SummerNewWindTimeInfo> drybulbTemperList=new ArrayList<>();
        //累年平均每年不保证10小时焓值
        List<SummerNewWindTimeInfo> yearAvgTenEnthaList=new ArrayList<>();
        //累年平均每年不保证10小时干球温度
        List<SummerNewWindTimeInfo> yearAvgTendrybuldTempList=new ArrayList<>();
        //累年平均每年不保证50小时焓值
        List<SummerNewWindTimeInfo> yearAvgFiftyEnthaList=new ArrayList<>();
        //累年平均每年不保证50小时干球温度
        List<SummerNewWindTimeInfo> yearAvgFiftydrybulbTempList=new ArrayList<>();
        //累年平均每年不保证100小时焓值
        List<SummerNewWindTimeInfo> yearAvgHundredEnthaList=new ArrayList<>();
        //累年平均每年不保证100小时干球温度
        List<SummerNewWindTimeInfo> yearAvgHundreddrybulbTempList=new ArrayList<>();
        try{
            summernewwindparamList = summerNewWindParamService.getSummerNewWindParamById(id);
            summernewwindtimeList=summerNewWindTimeService.getSummerNewWindTimeById(id);
            for(int i=0;i<summernewwindtimeList.size();i++){
                if(summernewwindtimeList.get(i).getParamType()==1){
                    enthalpyList.add(summernewwindtimeList.get(i));
                }
                else if(summernewwindtimeList.get(i).getParamType()==2){
                    drybulbTemperList.add(summernewwindtimeList.get(i));
                }
                else if(summernewwindtimeList.get(i).getParamType()==3){
                    yearAvgTenEnthaList.add(summernewwindtimeList.get(i));
                }
                else if(summernewwindtimeList.get(i).getParamType()==4){
                    yearAvgTendrybuldTempList.add(summernewwindtimeList.get(i));
                }
                else if(summernewwindtimeList.get(i).getParamType()==5){
                    yearAvgFiftyEnthaList.add(summernewwindtimeList.get(i));
                }
                else if(summernewwindtimeList.get(i).getParamType()==6){
                    yearAvgFiftydrybulbTempList.add(summernewwindtimeList.get(i));
                }
                else if(summernewwindtimeList.get(i).getParamType()==7){
                    yearAvgHundredEnthaList.add(summernewwindtimeList.get(i));
                }
                else if(summernewwindtimeList.get(i).getParamType()==8){
                    yearAvgHundreddrybulbTempList.add(summernewwindtimeList.get(i));
                }
            }
            modelMap.put("success", true);
            modelMap.put("summernewwindparamList", summernewwindparamList);
            modelMap.put("enthalpyList", enthalpyList);
            modelMap.put("drybulbTemperList",drybulbTemperList);
            modelMap.put("yearAvgTenEnthaList",yearAvgTenEnthaList);
            modelMap.put("yearAvgTendrybuldTempList",yearAvgTendrybuldTempList);
            modelMap.put("yearAvgFiftyEnthaList",yearAvgFiftyEnthaList);
            modelMap.put("yearAvgFiftydrybulbTempList",yearAvgFiftydrybulbTempList);
            modelMap.put("yearAvgHundredEnthaList",yearAvgHundredEnthaList);
            modelMap.put("yearAvgHundreddrybulbTempList", yearAvgHundreddrybulbTempList);

        }catch (Exception e){

            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        //request.setAttribute("tdocbList", modelMap);

        return modelMap;
    }

    /**
     * 访问冬夏季典型设计气象日参数-冬季新风计算室外计算参数的信息
     * 1.getWinterNewWindById是通过站台号访问冬季新风表数据的方法
     */
    @Resource
    private WinterNewWindParamService winterNewWindParamService;
    @Resource
    private WinterNewWindTimeService winterNewWindTimeService;

    @RequestMapping(value = "/getwinternewwind", method = RequestMethod.GET)
    public Map<String, Object> getWinterNewWindById(HttpServletRequest request,int id){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<WinterNewWindParamInfo> winternewwindparamList = new ArrayList<>();
        List<WinterNewWindTimeInfo> winternewwindtimeList=new ArrayList<>();
        //焓值逐时变化系数
        List<WinterNewWindTimeInfo> enthalpyList=new ArrayList<>();
        //干球温度逐时变化系数
        List<WinterNewWindTimeInfo> drybulbTemperList=new ArrayList<>();
        //累年平均每年不保证10小时焓值
        List<WinterNewWindTimeInfo> yearAvgTenEnthaList=new ArrayList<>();
        //累年平均每年不保证10小时干球温度
        List<WinterNewWindTimeInfo> yearAvgTendrybuldTempList=new ArrayList<>();
        //累年平均每年不保证50小时焓值
        List<WinterNewWindTimeInfo> yearAvgFiftyEnthaList=new ArrayList<>();
        //累年平均每年不保证50小时干球温度
        List<WinterNewWindTimeInfo> yearAvgFiftydrybulbTempList=new ArrayList<>();
        //累年平均每年不保证100小时焓值
        List<WinterNewWindTimeInfo> yearAvgHundredEnthaList=new ArrayList<>();
        //累年平均每年不保证100小时干球温度
        List<WinterNewWindTimeInfo> yearAvgHundreddrybulbTempList=new ArrayList<>();
        try{
            winternewwindparamList = winterNewWindParamService.getWinterNewWindParamById(id);
            winternewwindtimeList=winterNewWindTimeService.getWinterNewWindTimeById(id);
           for(int i=0;i<winternewwindtimeList.size();i++){
               if(winternewwindtimeList.get(i).getParamType()==1){
                   enthalpyList.add(winternewwindtimeList.get(i));
               }
               else if(winternewwindtimeList.get(i).getParamType()==2){
                   drybulbTemperList.add(winternewwindtimeList.get(i));
               }
               else if(winternewwindtimeList.get(i).getParamType()==3){
                   yearAvgTenEnthaList.add(winternewwindtimeList.get(i));
               }
               else if(winternewwindtimeList.get(i).getParamType()==4){
                   yearAvgTendrybuldTempList.add(winternewwindtimeList.get(i));
               }
               else if(winternewwindtimeList.get(i).getParamType()==5){
                   yearAvgFiftyEnthaList.add(winternewwindtimeList.get(i));
               }
               else if(winternewwindtimeList.get(i).getParamType()==6){
                   yearAvgFiftydrybulbTempList.add(winternewwindtimeList.get(i));
               }
               else if(winternewwindtimeList.get(i).getParamType()==7){
                   yearAvgHundredEnthaList.add(winternewwindtimeList.get(i));
               }
               else if(winternewwindtimeList.get(i).getParamType()==8){
                   yearAvgHundreddrybulbTempList.add(winternewwindtimeList.get(i));
               }
           }
            modelMap.put("success", true);
            modelMap.put("winternewwindparamList", winternewwindparamList);
            modelMap.put("enthalpyList", enthalpyList);
            modelMap.put("drybulbTemperList",drybulbTemperList);
            modelMap.put("yearAvgTenEnthaList",yearAvgTenEnthaList);
            modelMap.put("yearAvgTendrybuldTempList",yearAvgTendrybuldTempList);
            modelMap.put("yearAvgFiftyEnthaList",yearAvgFiftyEnthaList);
            modelMap.put("yearAvgFiftydrybulbTempList",yearAvgFiftydrybulbTempList);
            modelMap.put("yearAvgHundredEnthaList",yearAvgHundredEnthaList);
            modelMap.put("yearAvgHundreddrybulbTempList", yearAvgHundreddrybulbTempList);
        }catch (Exception e){

            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        //request.setAttribute("tdocbList", modelMap);

        return modelMap;
    }

    /*
    * 冬季加湿室外计算参数
    * */
    @Autowired
    private OcpWahumService ocpWahumService;
    @Autowired
    private OcpWahtService ocpWahtService;

    @RequestMapping(value = "/getopcWahum", method = RequestMethod.GET)
    public Map<String, Object> WinAndHum(HttpServletRequest request,int id){
        Map<String,Object> model = new HashMap<>();
        List<OcpWaHumInfo> listType = new ArrayList<>();
        List<OcpWahtInfo>  listTime= new ArrayList<>();
        try {
            listTime = ocpWahtService.queryWahtById(id);
            listType = ocpWahumService.queryWaHumById(id);
            model.put("time", listTime);
            model.put("type", listType);
            model.put("success", true);

        }
        catch (Exception e){
            model.put("success", false);
            model.put("errMsg", "参数错误");
        }
        return model;
    }

    /*
    * 夏季除湿室外计算参数
    * */
    @Resource
    private TypicalSummerDehumidificationTimeService typicalSummerDehumidificationTimeService;
    @Resource
    private TypicalSummerDehumidificationParamService typicalSummerDehumidificationParamService;
    @RequestMapping(value = "/gettsd", method = RequestMethod.GET)
    public Map<String, Object> getTSDList(HttpServletRequest request) {
        String strStationId = request.getParameter("id");
        Map<String, Object> modelMap = new HashMap<String, Object>();

        if (strStationId != null && strStationId.matches("\\d+") != false){
            int stationId = Integer.parseInt(strStationId);
            List<TypicalSummerDehumidificationTimeInfo> typicalSummerDehumidificationTimeInfos = new ArrayList<>();
            List<TypicalSummerDehumidificationParamInfo> typicalSummerDehumidificationParamInfos = new ArrayList<>();

            typicalSummerDehumidificationTimeInfos  = typicalSummerDehumidificationTimeService.findTSDTById(stationId);
            typicalSummerDehumidificationParamInfos = typicalSummerDehumidificationParamService.findTSDPById(stationId);

            modelMap.put("param", typicalSummerDehumidificationParamInfos);
            modelMap.put("time", typicalSummerDehumidificationTimeInfos);
            modelMap.put("success", true);


        }else {
            modelMap.put("success", false);
            modelMap.put("errMsg", "参数错误");
        }

        return modelMap;
    }

    /*
    * 夏季空调室外计算参数
    * */
    @Resource
    private TypicalSummerAirconditionerTimeService typicalSummerAirconditionerTimeService;
    @Resource
    private TypicalSummerAirconditionerParamService typicalSummerAirconditionerParamService;
    @RequestMapping(value = "/gettsa", method = RequestMethod.GET)
    public Map<String, Object> getTSAList(HttpServletRequest request) {
        String strStationId = request.getParameter("id");
        Map<String, Object> modelMap = new HashMap<String, Object>();

        if (strStationId != null && strStationId.matches("\\d+") != false){
            int stationId = Integer.parseInt(strStationId);
            List<TypicalSummerAirconditionerTimeInfo> typicalSummerAirconditionerTimeInfos = new ArrayList<>();
            List<TypicalSummerAirconditionerParamInfo> typicalSummerAirconditionerParamInfos = new ArrayList<>();

            typicalSummerAirconditionerTimeInfos  = typicalSummerAirconditionerTimeService.findTSATById(stationId);
            typicalSummerAirconditionerParamInfos = typicalSummerAirconditionerParamService.findTSAPById(stationId);

            modelMap.put("param", typicalSummerAirconditionerParamInfos);
            modelMap.put("time", typicalSummerAirconditionerTimeInfos);
            modelMap.put("success", true);


        }else {
            modelMap.put("success", false);
            modelMap.put("errMsg", "参数错误");
        }

        return modelMap;
    }

    /**
     * 访问冬夏季典型设计气象日参数——冬季供暖设计日参数表内的信息
     * getTypWinHeatById是通过站台号访问表数据的方法
     */
    @Resource
    private TypWinHeatTimeService typWinHeatTimeService;
    @Resource
    private TypWinHeatParamService typWinHeatParamService;


    @RequestMapping(value = "/gettypWinHeatById", method = RequestMethod.GET)
    public Map<String, Object> getTypWinHeatById(HttpServletRequest request,int id){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<TypWinHeatTimeInfo> typWinHeatTimeList=new ArrayList<>();
        TypWinHeatParamInfo typWinHeatParamInfo;
        //干球温度逐时变化系数
        List<TypWinHeatTimeInfo> drybulbTemperList=new ArrayList<>();
        //累年平均不保证一天干球变化温度
        List<TypWinHeatTimeInfo>avgOnedayTemperList=new ArrayList<>();
        //累年平均不保证五天干球变化温度
        List<TypWinHeatTimeInfo>avgFivedayTemperList=new ArrayList<>();
        //累年平均不保证十天干球变化温度
        List<TypWinHeatTimeInfo>avgTendayTemperList=new ArrayList<>();
        try{
            typWinHeatTimeList = typWinHeatTimeService.getTypWinHeatTimeById(id);//进行按照站台号进行查询冬夏季典型设计气象日参数——冬季供暖设计日参数——时刻表的数据的操作
            typWinHeatParamInfo = typWinHeatParamService.getTypWinHeatParamById(id);//进行按照站台号进行查询冬夏季典型设计气象日参数——冬季供暖设计日参数——参数表的数据的操作
            for(int i=0;i<typWinHeatTimeList.size();i++){
                if(typWinHeatTimeList.get(i).getParamType()==1){
                    drybulbTemperList.add(typWinHeatTimeList.get(i));
                }
                else if(typWinHeatTimeList.get(i).getParamType()==2){
                    avgOnedayTemperList.add(typWinHeatTimeList.get(i));
                }
                else if(typWinHeatTimeList.get(i).getParamType()==3){
                    avgFivedayTemperList.add(typWinHeatTimeList.get(i));
                }
                else if(typWinHeatTimeList.get(i).getParamType()==4){
                    avgTendayTemperList.add(typWinHeatTimeList.get(i));
                }
            }
            modelMap.put("success", true);
            modelMap.put("typWinHeatParamInfo", typWinHeatParamInfo);
            modelMap.put("drybulbTemperList",  drybulbTemperList);
            modelMap.put("avgOnedayTemperList",avgOnedayTemperList);
            modelMap.put("avgFivedayTemperList",avgFivedayTemperList);
            modelMap.put("avgTendayTemperList",avgTendayTemperList);
        }catch (Exception e){
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }

        return modelMap;
    }


    /**
     * 访问冬夏季典型设计气象日参数——冬季空调室外计算参数表内的信息
     * 1.getOcpMulgrpcList是访问整个表的方法
     * 2.getTdocbInfoById是通过站台号访问表数据的方法
     */
    @Resource
    private TypWinAirParamService typWinAirParamService;
    @Resource
    private TypWinAirTimeService typWinAirTimeService;

    @RequestMapping(value = "/getTypWinAirById", method = RequestMethod.GET)
    public Map<String, Object> getTypWinAirById(HttpServletRequest request,int id){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        TypWinAirParamInfo typWinAirParamInfo;
        List<TypWinAirTimeInfo> typWinAirTimeList=new ArrayList<>();
        //干球温度逐时变化系数
        List<TypWinAirTimeInfo> drybulbTemperList=new ArrayList<>();
        //累年平均不保证6小时干球变化温度
        List<TypWinAirTimeInfo>avgsixhourTemperList=new ArrayList<>();
        //累年平均不保证24小时干球变化温度
        List<TypWinAirTimeInfo>avgonedayTemperList=new ArrayList<>();
        //累年平均不保证48小时干球变化温度
        List<TypWinAirTimeInfo>avgTwodayTemperList=new ArrayList<>();
        try{
            typWinAirTimeList = typWinAirTimeService.getTypWinAirTimeById(id);
            typWinAirParamInfo = typWinAirParamService.getTypWinAirParamById(id);
            for(int i=0;i<typWinAirTimeList.size();i++){
                if(typWinAirTimeList.get(i).getParamType()==1){
                    drybulbTemperList.add(typWinAirTimeList.get(i));
                }
                else if(typWinAirTimeList.get(i).getParamType()==2){
                    avgsixhourTemperList.add(typWinAirTimeList.get(i));
                }
                else if(typWinAirTimeList.get(i).getParamType()==3){
                    avgonedayTemperList.add(typWinAirTimeList.get(i));
                }
                else if(typWinAirTimeList.get(i).getParamType()==4){
                    avgTwodayTemperList.add(typWinAirTimeList.get(i));
                }
            }
            modelMap.put("success", true);
            modelMap.put("typWinAirParamInfo", typWinAirParamInfo);
            modelMap.put("drybulbTemperList",  drybulbTemperList);
            modelMap.put("avgsixhourTemperList",avgsixhourTemperList);
            modelMap.put("avgonedayTemperList",avgonedayTemperList);
            modelMap.put("avgTwodayTemperList",avgTwodayTemperList);
        }catch (Exception e){
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }

        return modelMap;
    }
}
