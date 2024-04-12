package com.mobisys.building.api.indoorparm;

import com.mobisys.building.entity.*;
import com.mobisys.building.service.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping(value = "/indoorparam", method = RequestMethod.GET)
/**
 * 室内参数——热工设计用参数各个表的查询接口
 */
public class IndoorDataController {
    /**
     * 访问采暖空调建筑热工计算室内计算参数表内的信息
     * 1.getHeatingAirIndoorCalculationParametersById是通过站台号访问表数据的方法
     */
    @Resource
    private HeatingAirIndoorCalculationParametersService heatingAirIndoorCalculationParametersService;

    @RequestMapping(value = "/gethaicp1", method = RequestMethod.GET)
    public Map<String, Object> getHeatingAirIndoorCalculationParametersById(HttpServletRequest request,int stationid){
        Map<String, Object> modelMap = new HashMap<>();
        List<HeatingAirIndoorCalculationParametersInfo> heatingAirIndoorCalculationParametersList;
        try{
            heatingAirIndoorCalculationParametersList = heatingAirIndoorCalculationParametersService.getHeatingAirIndoorCalculationParametersById(stationid);
            modelMap.put("success", true);
            modelMap.put("InfoMsg", heatingAirIndoorCalculationParametersList);
        }catch (Exception e){

            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        //request.setAttribute("tdocbList", modelMap);

        return modelMap;
    }


    /**
     * 访问非采暖空调建筑热工计算室内计算参数表内的信息
     * 1.getNonHeatingAirIndoorCalculationParametersById是通过站台号访问表数据的方法
     */
    @Resource
    private NonHeatingAirIndoorCalculationParametersService nonHeatingAirIndoorCalculationParametersService;
    @RequestMapping(value = "/getnhaicp", method = RequestMethod.GET)
    public Map<String, Object> getNonHeatingAirIndoorCalculationParametersById(HttpServletRequest request,int stationid){
        Map<String, Object> modelMap = new HashMap<>();
        List<NonHeatingAirIndoorCalculationParametersInfo> nonHeatingAirIndoorCalculationParametersList;
        try{
            nonHeatingAirIndoorCalculationParametersList = nonHeatingAirIndoorCalculationParametersService.getNonHeatingAirIndoorCalculationParametersById(stationid);
            modelMap.put("success", true);
            modelMap.put("InfoMsg", nonHeatingAirIndoorCalculationParametersList);
        }catch (Exception e){

            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        //request.setAttribute("tdocbList", modelMap);

        return modelMap;
    }


    /**
     * 访问围护结构保温设计表内的信息
     * 1.getEnclosureStructureInsulationDesignById是通过站台号访问表数据的方法
     */
    @Resource
    private EnclosureStructureInsulationDesignService enclosureStructureInsulationDesignService;
    @RequestMapping(value = "/getesid", method = RequestMethod.GET)
    public Map<String, Object> getEnclosureStructureInsulationDesignById(HttpServletRequest request,int stationid){
        Map<String, Object> modelMap = new HashMap<>();
        List<EnclosureStructureInsulationDesignInfo> enclosureStructureInsulationDesignList;
        try{
            enclosureStructureInsulationDesignList = enclosureStructureInsulationDesignService.getEnclosureStructureInsulationDesignById(stationid);
            modelMap.put("success", true);
            modelMap.put("InfoMsg", enclosureStructureInsulationDesignList);
        }catch (Exception e){

            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        //request.setAttribute("tdocbList", modelMap);

        return modelMap;
    }


    /**
     * 访问围护结构隔热设计表内的信息
     * 1.getEnclosureStructureEnvelopeDesignById是通过站台号访问表数据的方法
     */
    @Resource
    private EnclosureStructureEnvelopeDesignService enclosureStructureEnvelopeDesignService;
    @RequestMapping(value = "/getesed", method = RequestMethod.GET)
    public Map<String, Object> getEnclosureStructureEnvelopeDesignById(HttpServletRequest request,int stationid){
        Map<String, Object> modelMap = new HashMap<>();
        List<EnclosureStructureEnvelopeDesignInfo> enclosureStructureEnvelopeDesignList;
        try{
            enclosureStructureEnvelopeDesignList = enclosureStructureEnvelopeDesignService.getEnclosureStructureEnvelopeDesignById(stationid);
            modelMap.put("success", true);
            modelMap.put("InfoMsg", enclosureStructureEnvelopeDesignList);
        }catch (Exception e){

            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        //request.setAttribute("tdocbList", modelMap);

        return modelMap;
    }


    /**
     * 访问透明围护结构保温设计表内的信息
     * 1.getTransparentEnclosureStructureInsulationDesignById是通过站台号访问表数据的方法
     */
    @Resource
    private TransparentEnclosureStructureInsulationDesignService transparentEnclosureStructureInsulationDesignService;
    @RequestMapping(value = "/gettesid", method = RequestMethod.GET)
    public Map<String, Object> getTransparentEnclosureStructureInsulationDesignById(HttpServletRequest request,int stationid){
        Map<String, Object> modelMap = new HashMap<>();
        List<TransparentEnclosureStructureInsulationDesignInfo> transparentEnclosureStructureInsulationDesignList;
        try{
            transparentEnclosureStructureInsulationDesignList = transparentEnclosureStructureInsulationDesignService.getTransparentEnclosureStructureInsulationDesignById(stationid);
            modelMap.put("success", true);
            modelMap.put("InfoMsg", transparentEnclosureStructureInsulationDesignList);
        }catch (Exception e){

            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        //request.setAttribute("tdocbList", modelMap);

        return modelMap;
    }


    /**
     * 访问被动式太阳能建筑设计参数表内的信息
     * 1.getPassiveSolarBuildingDesignParametersById是通过站台号访问表数据的方法
     */
    @Resource
    private PassiveSolarBuildingDesignParametersService passiveSolarBuildingDesignParametersService;
    @RequestMapping(value = "/getpsbdp", method = RequestMethod.GET)
    public Map<String, Object> getPassiveSolarBuildingDesignParametersById(HttpServletRequest request,int stationid){
        Map<String, Object> modelMap = new HashMap<>();
        List<PassiveSolarBuildingDesignParametersInfo> passiveSolarBuildingDesignParametersList;
        try{
            passiveSolarBuildingDesignParametersList = passiveSolarBuildingDesignParametersService.getPassiveSolarBuildingDesignParametersById(stationid);
            modelMap.put("success", true);
            modelMap.put("InfoMsg", passiveSolarBuildingDesignParametersList);
        }catch (Exception e){

            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        //request.setAttribute("tdocbList", modelMap);

        return modelMap;
    }
}
