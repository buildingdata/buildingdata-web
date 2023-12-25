package com.mobisys.building.api.buildingclimate;

import com.mobisys.building.entity.BbcHumidityInfo;
import com.mobisys.building.entity.TemperatureInfo;
import com.mobisys.building.service.BbcHumidityService;
import com.mobisys.building.entity.BbcSolarradiationInfo;
import com.mobisys.building.entity.BbcWdrwspInfo;
import com.mobisys.building.service.BbcSolarradiationService;
import com.mobisys.building.service.TemperatureService;
import com.mobisys.building.service.BbcWdrwspService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping(value = "/basicclimate", method = RequestMethod.GET)
public class BasicClimateController {

    /*
     * 访问基本气候特征数据温度
     * 1.getTemperatureList通过台站号获取温度
     * */
    @Resource
    private TemperatureService temperatureService;

    @RequestMapping(value = "/getttemById", method = RequestMethod.GET)
    public Map<String, Object> getTemperatureById(HttpServletRequest request){
        String strStationId = request.getParameter("id");
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<Double> dayAvgMonthAvgList=new ArrayList<>();
        List<Double> dayMaxMonthAvgList=new ArrayList<>();
        List<Double> dayMinMonthAvgList=new ArrayList<>();
        List<Double> dayMaxList=new ArrayList<>();
        List<Double> dayMinList=new ArrayList<>();
        if (strStationId != null && strStationId.matches("\\d+") != false){
            int stationId = Integer.parseInt(strStationId);
            List<TemperatureInfo> temperaturelist=new ArrayList<>();
            temperaturelist = temperatureService.getTemperatureById(stationId);
            for (int i=0; i<temperaturelist.size(); i++){
                dayAvgMonthAvgList.add(temperaturelist.get(i).getDayAvgMonthAvg());
                dayMaxMonthAvgList.add(temperaturelist.get(i).getDayAvgMonthAvg());
                dayMinMonthAvgList.add(temperaturelist.get(i).getDayMinMonthAvg());
                dayMaxList.add(temperaturelist.get(i).getDayMax());
                dayMinList.add(temperaturelist.get(i).getDayMin());
            }
            modelMap.put("success", true);
            modelMap.put("dayAvgMonthAvgList",dayAvgMonthAvgList);
            modelMap.put("dayMaxMonthAvgList",dayMaxMonthAvgList );
            modelMap.put("dayMinMonthAvgList",dayMinMonthAvgList );
            modelMap.put("dayMaxList",dayMaxList );
            modelMap.put("dayMinList",dayMinList);
        }
        else{
            modelMap.put("success", false);
            modelMap.put("errMsg", "参数错误");
        }

        return modelMap;
    }
    /*
     * 访问基本气候特征湿度
     * */
    @Autowired
    private BbcHumidityService bbcHumidityService;
    @RequestMapping(value="/getbbchumidity" , method = RequestMethod.GET)
    public Map<String, Object> getBbcHumidity(HttpServletRequest request) {
        String strStationId = request.getParameter("id");
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<Float> AverageHum = new ArrayList<>();
        List<Float> AverageMaxHum = new ArrayList<>();
        List<Float> AverageMinHum = new ArrayList<>();

        if (strStationId != null && strStationId.matches("\\d+") != false){
            int stationId = Integer.parseInt(strStationId);
            List<BbcHumidityInfo> bbcHumidityInfos = new ArrayList<>();
            bbcHumidityInfos  = bbcHumidityService.getBbcHumidityById(stationId);
            for (int i=0; i<bbcHumidityInfos .size(); i++){
                AverageHum.add(bbcHumidityInfos .get(i).getAverageHum());
                AverageMaxHum.add(bbcHumidityInfos .get(i).getAverageMaxHum());
                AverageMinHum.add(bbcHumidityInfos .get(i).getAverageMinHum());

            }
            modelMap.put("success", true);
            modelMap.put("dayAvgMonthAvgList", AverageHum);
            modelMap.put("dayMaxMonthAvgList", AverageMaxHum);
            modelMap.put("dayMinMonthAvgList", AverageMinHum);
            modelMap.put("errMsg", "参数错误");
        }

        return modelMap;

    }
    /*
    * 访问基本气候特征太阳辐射
    * */
    @Autowired
    private BbcSolarradiationService bbcSolarradiationService;


    /**
     * 通过站台ID获取太阳辐射信息
     * @param request
     * @return
     */
    @RequestMapping(value = "/getsolarradiation", method = RequestMethod.GET)
    public Map<String, Object> getBbcSolarradiation(HttpServletRequest request){
        String strStationId = request.getParameter("id");
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<Double> horRadTotal = new ArrayList<>();
        List<Double> horRadDirect = new ArrayList<>();
        List<Double> horRadScattering = new ArrayList<>();
        if (strStationId != null && strStationId.matches("\\d+") != false){
            int stationId = Integer.parseInt(strStationId);
            List<BbcSolarradiationInfo> bbcSolarradiationInfos = new ArrayList<>();
            bbcSolarradiationInfos = bbcSolarradiationService.getBbcSolarradiationById(stationId);
            for (int i=0; i<bbcSolarradiationInfos.size(); i++){
                horRadTotal.add(bbcSolarradiationInfos.get(i).getHorRadTotal());
                horRadDirect.add(bbcSolarradiationInfos.get(i).getHorRadDirect());
                horRadScattering.add(bbcSolarradiationInfos.get(i).getHorRadScattering());
            }
            modelMap.put("success", true);
            modelMap.put("daySumList", horRadTotal);
            modelMap.put("dayDirectList", horRadDirect);
            modelMap.put("dayScatterList", horRadScattering);
        }else {
            modelMap.put("success", false);
            modelMap.put("errMsg", "参数错误");
        }

        return modelMap;
    }

    /**
     * 通过站台ID获取站台风速信息
     * @param request
     * @return
     */
    @Autowired
    private BbcWdrwspService bbcWdrwspService;
    @RequestMapping(value = "/getwdrwsp", method = RequestMethod.GET)
    public Map<String, Object> getBbcWdrwsp(HttpServletRequest request){
        String strStationId = request.getParameter("id");
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<String> list1 = new ArrayList<>();
        List<String> list2 = new ArrayList<>();
        List<String> list3 = new ArrayList<>();
        List<String> list4 = new ArrayList<>();
        List<String> list5 = new ArrayList<>();
        List<String> list6 = new ArrayList<>();
        List<String> list7 = new ArrayList<>();
        List<String> list8 = new ArrayList<>();
        if (strStationId != null && strStationId.matches("\\d+") != false){
            int stationId = Integer.parseInt(strStationId);
            List<BbcWdrwspInfo> bbcWdrwspInfos = new ArrayList<>();
            bbcWdrwspInfos = bbcWdrwspService.getBbcWdrwspsById(stationId);
            for (int i=0; i<bbcWdrwspInfos.size(); i++){
                list1.add(bbcWdrwspInfos.get(i).getValue1());
                list2.add(bbcWdrwspInfos.get(i).getValue2());
                list3.add(bbcWdrwspInfos.get(i).getValue3());
                list4.add(bbcWdrwspInfos.get(i).getValue4());
                list5.add(bbcWdrwspInfos.get(i).getValue5());
                list6.add(bbcWdrwspInfos.get(i).getValue6());
                list7.add(bbcWdrwspInfos.get(i).getValue7());
                list8.add(bbcWdrwspInfos.get(i).getValue8());
            }
            modelMap.put("success", true);
            modelMap.put("list1", list1);
            modelMap.put("list2", list2);
            modelMap.put("list3", list3);
            modelMap.put("list4", list4);
            modelMap.put("list5", list5);
            modelMap.put("list6", list6);
            modelMap.put("list7", list7);
            modelMap.put("list8", list8);
        }else {
            modelMap.put("success", false);
            modelMap.put("errMsg", "参数错误");
        }

        return modelMap;
    }
}
