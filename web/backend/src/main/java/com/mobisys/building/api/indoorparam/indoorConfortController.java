package com.mobisys.building.api.indoorparam;

import com.mobisys.building.entity.*;
import com.mobisys.building.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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
@RequestMapping(value = "/indoorparm", method = RequestMethod.GET)
public class indoorConfortController {

    @Autowired
    private indoorDiffTemService diffTemService;
    @Autowired
    private indoorDiffBuilService diffBuilService;
    @Autowired
    private indoorHotService hotService;
    @Autowired
    private indoorSuggestService suggestService;
    @Autowired
    private localDisconforService disconforService;

    //获取不同气候区室内温度设计数据
    @RequestMapping(value="/getDiffTem",method = RequestMethod.POST)
    public Map<String, Object> getDiffTem() {
        Map<String,Object> model = new HashMap<>();
        List<indoorDiffTemInfo> list = new ArrayList<>();
              list = diffTemService.getDiffTem();
              model.put("param",list);
        return model;
    }
    //获取不同建筑的操作温度数据
    @RequestMapping(value="/getDiffBuil",method = RequestMethod.POST)
    public Map<String, Object> getDiffBuil() {
        Map<String,Object> model = new HashMap<>();
        List<indoorDiffBuilInfo> list1 = new ArrayList<>();
        List<String> list = new ArrayList<>();
        List<indoorDiffBuilInfo> list2 = new ArrayList<>();
        List<indoorDiffBuilInfo> list3 = new ArrayList<>();
        list = diffBuilService.getType();
        list1 = diffBuilService.getDiffBuil(list.get(0));
        list2 = diffBuilService.getDiffBuil(list.get(1));
        list3 = diffBuilService.getDiffBuil(list.get(2));

        model.put("param1",list1);
        model.put("param2",list2);
        model.put("param3",list3);
        return model;
    }
    //获取室内热环境分级数据
    @RequestMapping(value="/getHot",method = RequestMethod.POST)
    public Map<String, Object> getHot() {
        Map<String,Object> model = new HashMap<>();
        List<indoorHotInfo> list = new ArrayList<>();
        list = hotService.getHot() ;
        model.put("param",list);
        return model;
    }
    //获取室内热舒适建议数据
    @RequestMapping(value="/getSuggest",method = RequestMethod.POST)
    public Map<String, Object> getSuggest() {
        Map<String,Object> model = new HashMap<>();
        List<indoorSuggestInfo> list = new ArrayList<>();
        list = suggestService.getSuggest();
        model.put("param",list);
        return model;
    }
    //获取局部热不舒适数据
    @RequestMapping(value="/getLocal",method = RequestMethod.POST)
    public Map<String, Object> getLocal() {
        Map<String,Object> model = new HashMap<>();
        List<localDisconforInfo> list = new ArrayList<>();
        list = disconforService.getLocal();
        model.put("param",list);
        return model;
    }

    @Resource
    private IndoorDesignParamService indoorDesignParamService;

    @Resource
    private IndoorComputeParamService indoorComputeParamService;

    /**
     * 室内参数——热工设计用参数各个表的查询接口
     */
    /**
     * 访问采暖空调建筑热工计算室内计算参数表内的信息
     * 1.getHeatingAirIndoorCalculationParametersById是通过站台号访问表数据的方法
     */
    @Resource
    private HeatingAirIndoorCalculationParametersService heatingAirIndoorCalculationParametersService;

    @RequestMapping(value = "/gethaicp", method = RequestMethod.GET)
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

    /**
     * 访问暖通空调室内设计参数表内信息
     */

    @RequestMapping(value = "/getIndoorDesignParam", method = RequestMethod.GET)
    public Map<String, Object> queryIndoorDesignParam() {

        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<IndoorDesignParamInfo> indoorDesign = new ArrayList<>();
        try {
            indoorDesign = indoorDesignParamService.getIndoorDesignParam();
            modelMap.put("success", true);
            modelMap.put("indoorDesign", indoorDesign);
        } catch (Exception e) {
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        return modelMap;

    }
/*
* 访问模拟计算分析用参数
* */
    @RequestMapping(value = "/getIndoorComputeParamById", method = RequestMethod.GET)
    public Map<String, Object> getIndoorComputeParamById(int stationId) {

        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<IndoorComputeParamInfo> indoorCompute = new ArrayList<>();
        try {
            indoorCompute = indoorComputeParamService.getIndoorComputeParamById(stationId);
            modelMap.put("success", true);
            modelMap.put("indoorCompute", indoorCompute);
        } catch (Exception e) {
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        return modelMap;
    }
}
