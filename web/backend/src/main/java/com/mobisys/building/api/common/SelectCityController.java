package com.mobisys.building.api.common;

import com.mobisys.building.entity.StationInfo;
import com.mobisys.building.service.StationService;
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
@RequestMapping(value = "/selectcity", method = RequestMethod.GET)
public class SelectCityController {
    @Resource
    private StationService stationService;
/*
* 获取所有省份
* */
    @RequestMapping(value = "/getprovince", method = RequestMethod.GET)
    public Map<String, Object> getProvinceList(HttpServletRequest request){

        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<String> provinceList = new ArrayList<>();
        try{
            provinceList = stationService.getAllProvinces();
            modelMap.put("success", true);
            modelMap.put("provinceList", provinceList);
        }catch (Exception e){
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        request.setAttribute("provinceList", modelMap);

        return modelMap;
    }
/*
* 根据省份获取城市信息
* */
    @RequestMapping(value = "/getcitys", method = RequestMethod.GET)
    public Map<String, Object> getCityList(HttpServletRequest request, HttpServletResponse response){


        String province  = request.getParameter("province");

        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<String> cityList = new ArrayList<>();
        try{
            cityList = stationService.getCitysInProvince(province);
            modelMap.put("success", true);
            modelMap.put("cityList", cityList);
        }catch (Exception e){
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        request.setAttribute("cityList", modelMap);

        return modelMap;
    }
/*
* 根据城市获取站点信息
* */
    @RequestMapping(value = "/getstations", method = RequestMethod.GET)
    public Map<String, Object> getStationList(HttpServletRequest request, HttpServletResponse response){
        String city  = request.getParameter("city");

        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<String> stationList = new ArrayList<>();
        try{
            stationList = stationService.getStationsInCity(city);
            modelMap.put("success", true);
            modelMap.put("stationList", stationList);
        }catch (Exception e){
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        request.setAttribute("stationList", modelMap);

        return modelMap;
    }
/*
* 根据站点获取经度、维度、海拔和气候区信息
* */
   @RequestMapping(value="/getstationinfo",method = RequestMethod.GET)
    public Map<String,Object> getstationinfoList(HttpServletRequest request,int stationid){
       //int stationid  = Integer.parseInt(request.getParameter("stationid"));

       Map<String, Object> modelMap = new HashMap<String, Object>();
       StationInfo stationinfo ;
       try{
           stationinfo = stationService.getStationsinfo(stationid);
           modelMap.put("success", true);
           modelMap.put("stationinfo", stationinfo);
       }catch (Exception e){
           modelMap.put("success", false);
           modelMap.put("errMs  g", e.getMessage());
       }
       return modelMap;
   }


    @RequestMapping(value="/getstation",method = RequestMethod.GET)
    public Map<String,Object> getstation(HttpServletRequest request,HttpServletResponse response) {
        String city = request.getParameter("city");

        Map<String, Object> modelMap = new HashMap<String, Object>();
        List< StationInfo> stationList = new ArrayList<>();
        try {
            stationList = stationService.getStationInFZCity(city);
            System.out.print(stationList);
            modelMap.put("success", true);
            modelMap.put("stationList", stationList);
        } catch (Exception e) {
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        request.setAttribute("stationList", modelMap);

        return modelMap;
    }

    @RequestMapping(value="/getstationviaid",method = RequestMethod.GET)
    public Map<String,Object> getstationviaid(HttpServletRequest request,int stationid) {

        Map<String, Object> modelMap = new HashMap<String, Object>();
        List< StationInfo> stationListId = new ArrayList<>();
        try{
            stationListId = stationService.getStationInId(stationid);
            System.out.print(stationListId);
            modelMap.put("success", true);
            modelMap.put("stationListId", stationListId);
        }catch (Exception e){
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        request.setAttribute("stationListId", modelMap);
        return modelMap;
    }


}
