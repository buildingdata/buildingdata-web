package com.mobisys.building.api.outdoorparm;


import com.mobisys.building.entity.StationInfo;
import com.mobisys.building.service.StationService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 访问地图信息，即查询总台站表，返回总台站信息
 */
@RestController
@RequestMapping(value = "/mapinfo", method = RequestMethod.GET)
@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
public class MapInfoDataController {

    @Resource
    private StationService stationService;

    @RequestMapping(value = "/getstationinfo",method = RequestMethod.GET)
    public Map<String,Object> getStationList(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        List<StationInfo> cityList = new ArrayList<>();
        try{
            cityList = stationService.getStationList();
            modelMap.put("success",true);
            modelMap.put("cityList",cityList);
        }catch(Exception e){
            modelMap.put("success",false);
            modelMap.put("errMsg",e.getMessage());
        }
        request.setAttribute("cityList", modelMap);

        return modelMap;
    }

    /**
     * 按照台站等级查询台站信息的接口
     * @param request
     * @return
     */
    @RequestMapping(value = "/getStationInfoByLevel",method = RequestMethod.GET)
    public Map<String,Object> getStationByLevel(HttpServletRequest request, @RequestParam ("level") int level){
        System.out.println(1);
        Map<String,Object> modelMap = new HashMap<String, Object>();
        List<StationInfo> cityByLevel = new ArrayList<>();
        try{
            cityByLevel = stationService.getStationByLevel(level);
            if(cityByLevel.size() != 0){
                modelMap.put("success",true);
                modelMap.put("cityList",cityByLevel);
            }else{
                modelMap.put("success",false);
                modelMap.put("errMsg","台站等级输入有误！");
            }
        }catch(Exception e){
            modelMap.put("success",false);
            modelMap.put("errMsg",e.getMessage());
        }
//        request.setAttribute("cityList", modelMap);
        System.out.println(2);
        return modelMap;
    }
}
