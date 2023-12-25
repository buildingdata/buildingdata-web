package com.mobisys.building.api.meteorological;

import com.mobisys.building.entity.*;
import com.mobisys.building.service.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.SimpleFormatter;

@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping(value = "/meteorological", method = RequestMethod.GET)
public class MeteoroLogicalController {
    /*
    * 访问典型气象年参数
    * */
    @Resource
    private TypicalMeteoroLogicalService typicalMeteoroLogicalService;
    @RequestMapping(value = "/getTypicalById", method = RequestMethod.GET)
    public Map<String, Object> getTypicalMeteoroById(HttpServletRequest request, int id){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        Map<String,List<Map<String, List<Double>>>> typicalList = new HashMap<>();
        try{
            typicalList = typicalMeteoroLogicalService.getTypicalMeteoroLogicalById(id);
            System.out.println(typicalList);
            modelMap.put("success", true);
            modelMap.put("typicalList",typicalList);
        }catch (Exception e){
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        return modelMap;
    }
    /*
    * 访问未来气象年参数
    * */
    @Resource
    private FutureMeteoroLogicalService futureMeteoroLogicalService;
    @RequestMapping(value = "/getFutureById", method = RequestMethod.GET)
    public Map<String, Object> getFutureMeteoroById(HttpServletRequest request,int id,String type,String month,String day){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        int monthSelected = Integer.parseInt(month.substring(0,month.length()-1));
        int dayselected = Integer.parseInt(day.substring(0,day.length()-1));
        List<FutureMeteoroLogicalInfo> futureList = new ArrayList<>();
        try{
            futureList = futureMeteoroLogicalService.getFutureInfo(id,monthSelected,dayselected,type);
            modelMap.put("success", true);
            modelMap.put("futureList",futureList);
        }catch (Exception e){
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        return modelMap;
    }
    /*
    * 访问空调负荷极端气象年参数
    * */
    @Resource
    private ExtremMeteoroLogicalService extremMeteoroLogicalService;
    @RequestMapping(value = "/getExtrmeAirById", method = RequestMethod.GET)
    public Map<String, Object> getExtremMeteoroAirById(HttpServletRequest request,String stationid,String date) throws ParseException {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utildate = simpleDateFormat.parse(date);
        Date date1 =  new Date(utildate.getTime());
        System.out.println(date1);
        int id = Integer.parseInt(stationid);

        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<ExtremMeteoroLogicalInfo> extremList = new ArrayList<>();
        try{
            extremList = extremMeteoroLogicalService.getExtremMeteoroLogicalById(id,date1);
            modelMap.put("success", true);
            modelMap.put("extremList", extremList);
        }catch (Exception e){
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        return modelMap;
    }
//    访问室内过热极端气象年数据
    @RequestMapping(value = "/getExtremInnerById", method = RequestMethod.GET)
    public Map<String, Object> getExtremMeteoroInnerById(HttpServletRequest request,String stationid,String date) throws ParseException {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utildate = simpleDateFormat.parse(date);
        Date date1 =  new Date(utildate.getTime());
        int id = Integer.parseInt(stationid);
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<ExtremMeteoroLogicalInfo> extremList = new ArrayList<>();
        try{
            extremList = extremMeteoroLogicalService.getExtremMeteoroLogicalInnerById(id,date1);
            modelMap.put("success", true);
            modelMap.put("extremList", extremList);
        }catch (Exception e){
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        return modelMap;
    }
}
