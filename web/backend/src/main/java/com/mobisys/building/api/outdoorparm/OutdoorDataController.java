package com.mobisys.building.api.outdoorparm;

import com.mobisys.building.entity.*;
import com.mobisys.building.service.*;
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
@RequestMapping(value = "/outdoorparm", method = RequestMethod.GET)
public class OutdoorDataController {


    /**
     * 访问民用建筑热工设计规范附表参数表内的信息
     * 1.getTdocbList是访问整个表的方法
     * 2.getTdocbInfoById是通过站台号访问表数据的方法
     */
    @Resource
    private TdocbService tdocbService;

    @RequestMapping(value = "/gettdocb", method = RequestMethod.GET)
    public Map<String, Object> getTdocbList(HttpServletRequest request){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<TdocbInfo> tdocbList = new ArrayList<>();
        try{
            tdocbList = tdocbService.getTdocbList();
            modelMap.put("success", true);
            modelMap.put("tdocbList", tdocbList);
        }catch (Exception e){

            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        //request.setAttribute("tdocbList", modelMap);

        return modelMap;
    }

    @RequestMapping(value = "/gettdocbById", method = RequestMethod.GET)
    public Map<String, Object> getTdocbById(HttpServletRequest request,int id){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        TdocbInfo tdocbInfo;
        try{
            tdocbInfo = tdocbService.getTdocbById(id);
            modelMap.put("success", true);
            modelMap.put("tdocbInfo", tdocbInfo);
        }catch (Exception e){
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }

        return modelMap;
    }
    /**
     * 访问自然通风设计室外计算参数表的信息
     * 1.getOcpnvdList是访问整个表的数据方法
     * 2.getOcpnvdInfoById是通过站台号访问数据的方法
     */
    @Resource
    private OcpnvdService ocpnvdService;

    @RequestMapping(value = "/getocpnvd")
    public Map<String, Object> getOcpnvdList(){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<OcpnvdInfo> ocpnvdList = new ArrayList<>();
        try{
            ocpnvdList = ocpnvdService.getOcpnvdList();
            modelMap.put("success", true);
            modelMap.put("ocpnvdList", ocpnvdList);
        }catch (Exception e){
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        return modelMap;
    }

    @RequestMapping(value = "/getocpnvdById")
    public Map<String, Object> getOcpnvdInfoById(HttpServletRequest request,int id){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        OcpnvdInfo ocpnvdinfo;
        try{
            ocpnvdinfo = ocpnvdService.getOcpnvdById(id);
            modelMap.put("success", true);
            modelMap.put("ocpnvdinfo", ocpnvdinfo);
        }catch (Exception e){
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        return modelMap;
    }

    /**
     * 访问围护结构隔热设计室外计算参数表的信息
     * 1.getOtmccList是访问整个表的数据方法
     * 2.getOtmccInfoById是通过站台号访问数据的方法
     */
    @Resource
    private OtmccService otmccService;

    @RequestMapping(value = "/getotmcc")
    public Map<String, Object> getOtmccList(){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<OtmccInfo> otmccList = new ArrayList<>();
        try{
            otmccList = otmccService.getOtmccList();
            modelMap.put("success", true);
            modelMap.put("otmccList", otmccList);
        }catch (Exception e){
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        return modelMap;
    }
    @RequestMapping(value = "/getotmccById")
    public Map<String, Object> getOtmccInfoById(HttpServletRequest request,int id){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<OtmccInfo> otmccinfolist=new ArrayList<>() ;
        try{
            otmccinfolist = otmccService.getOtmccById(id);
            modelMap.put("success", true);
            modelMap.put("otmccinfo", otmccinfolist);
        }catch (Exception e){
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        return modelMap;
    }
    /**
     * 访问围护结构遮阳设计室外计算参数表的信息
     * 1.getAsdoList是访问整个表的数据方法
     * 2.getAsdoInfoById是通过站台号访问数据的方法
     */
    @Resource
    private AsdoService asdoService;


    @RequestMapping(value = "/getasdo")
    public Map<String, Object> getAsdoList(){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<AsdoInfo> asdoList = new ArrayList<>();
        try{
            asdoList = asdoService.getAsdoList();
            modelMap.put("success", true);
            modelMap.put("asdoList", asdoList);
        }catch (Exception e){
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        return modelMap;
    }
    @RequestMapping(value = "/getasdoById")
    public Map<String, Object> getAsdoInfoById(HttpServletRequest request,int id){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<AsdoInfo> asdoInfoList=new ArrayList<>() ;
        List<AsdoInfo> startDayList=new ArrayList<>() ;
        List<AsdoInfo> endDayList=new ArrayList<>();
        List<AsdoInfo> middleDayList=new ArrayList<>();
        try{
            asdoInfoList = asdoService.getAsdoById(id);
            for(int i=0;i<asdoInfoList.size();i++){
                if(asdoInfoList.get(i).getTableType()==1){
                    startDayList.add(asdoInfoList.get(i));
                }
                else if(asdoInfoList.get(i).getTableType()==2){
                    endDayList.add(asdoInfoList.get(i));
                }
                else if(asdoInfoList.get(i).getTableType()==3){
                    middleDayList.add(asdoInfoList.get(i));
                }
            }
            modelMap.put("startDayList",startDayList);
            modelMap.put("endDayList",endDayList);
            modelMap.put("middleDayList",middleDayList);
            modelMap.put("success", true);
        }catch (Exception e){
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        return modelMap;
    }
    /**
     * 访问围护结构动态保温设计室外计算参数表1（最小值）的信息
     * 1.getOcpedidList是访问整个表的数据方法
     * 2.getOcpedidInfoById是通过站台号访问数据的方法
     */
    @Resource
    private OcpedidService ocpedidService;

    @RequestMapping(value = "/getocpedid")
    public Map<String, Object> queryOcpedidById(HttpServletRequest request,int id){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<OcpedidInfo> ocpedidInfoList=new ArrayList<>();
        try{
            ocpedidInfoList = ocpedidService.getOcpedidById(id);
            modelMap.put("success", true);
            modelMap.put("ocpedidInfoList", ocpedidInfoList);
        }catch (Exception e){
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        return modelMap;
    }

    /**
     * 访问围护结构动态保温设计室外计算参数表2（不保证日为5天）的信息
     * 1.getOcpedidList是访问整个表的数据方法
     * 2.getOcpedidInfoById是通过站台号访问数据的方法
     */



    /**
     * 访问围护结构热湿耦合计算室外计算参数表的信息
     * 1.getOcpehhccList是访问整个表的数据方法
     * 2.getOcpehhccInfoById是通过站台号访问数据的方法,需要台站号和页号作为请求参数
     * 3.getOcpehhccById通过站台号访问数据，需要台站号作为请求参数
     */
    @Resource
    private OcpehhccService ocpehhccService;

    @RequestMapping(value = "/getocpehhcc")
    public Map<String, Object> getOcpehhccList() {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<OcpehhccInfo> ocpehhccList = new ArrayList<>();
        try {
            ocpehhccList = ocpehhccService.getOcpehhccList();
            modelMap.put("success", true);
            modelMap.put("ocpehhccList", ocpehhccList);
        } catch (Exception e) {
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        return modelMap;
    }

    @RequestMapping(value = "/getocpehhccById", method = RequestMethod.GET)
    public Map<String, Object> getOcpehhccById(HttpServletRequest request, int id,int pagenum) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<OcpehhccInfo> ocpehhccInfoList=new ArrayList<>();
        try {
            ocpehhccInfoList = ocpehhccService.getOcpehhccById(id);
            int totalpage;
            totalpage=ocpehhccInfoList.size()/100+1;
            List<OcpehhccInfo> currentpageList=new ArrayList<>();
            for(int i=(pagenum-1)*100;i<(pagenum-1)*100+100&&i<ocpehhccInfoList.size();i++){
                currentpageList.add(ocpehhccInfoList.get(i));
            }
            modelMap.put("totalpage",totalpage);
            modelMap.put("success", true);
            modelMap.put("currentpageList", currentpageList);
            modelMap.put("totalList",ocpehhccInfoList);
        } catch (Exception e) {
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        return modelMap;
    }
    @RequestMapping(value = "/getocpehhccByStationId")
    public Map<String,Object> getocpehhccByStationId(int id) {
        Map<String,Object> modelMap=new HashMap<>() ;
        List<OcpehhccInfo> ocpehhccList=new ArrayList<OcpehhccInfo>();
        try{
            ocpehhccList=ocpehhccService.getOcpehhccById(id);
            modelMap.put("success",true);
            modelMap.put("ocpehhccList",ocpehhccList);
        }catch (Exception e) {
            modelMap.put("success",false);
            modelMap.put("errMsg",e.getMessage());
        }
        return modelMap;
    }

    /**
     * 访问多不保证率及多参数组合的室外计算参数表内的信息
     * 1.getOcpMulgrpcList是访问整个表的方法
     * 2.getTdocbInfoById是通过站台号访问表数据的方法
     */
    @Resource
    private OcpMulgrpcService ocpMulgrpcService;

    @RequestMapping(value = "/getocpMulgrpc", method = RequestMethod.GET)
    public Map<String, Object> getOcpMulgrpcList(HttpServletRequest request){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<OcpMulgrpcInfo> ocpMulgrpcList = new ArrayList<>();
        try{
            ocpMulgrpcList = ocpMulgrpcService.getOcpMulgrpcList();
            modelMap.put("success", true);
            modelMap.put("ocpMulgrpcList", ocpMulgrpcList);
        }catch (Exception e){

            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }

        return modelMap;
    }

    @RequestMapping(value = "/getocpMulgrpcById", method = RequestMethod.GET)
    public Map<String, Object> getOcpMulgrpcById(HttpServletRequest request,int id){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        OcpMulgrpcInfo ocpMulgrpcInfo;
        try{
            ocpMulgrpcInfo = ocpMulgrpcService.getOcpMulgrpcById(id);
            modelMap.put("success", true);
            modelMap.put("ocpMulgrpcInfo", ocpMulgrpcInfo);
        }catch (Exception e){
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }

        return modelMap;
    }
    /**
    * 获取民用建筑供暖通风与空气调节设计规范附表参数
    * */
    @Resource
    private OpcNormpService opcNormpService;
    @RequestMapping(value = "/getparam",method = RequestMethod.GET)
    public Map<String, Object> getNormParam(HttpServletRequest request){
        String strStationId = request.getParameter("id");
        Map<String, Object> modelMap = new HashMap<String, Object>();
        if (strStationId != null && strStationId.matches("\\d+") != false) {
            int stationId = Integer.parseInt(strStationId);
            List<OpcNormpInfo> list = opcNormpService.queryNormParamById(stationId);
            modelMap.put("success", true);
            modelMap.put("param",list);
        }
        else{
            modelMap.put("success", false);
            modelMap.put("errMsg", "参数错误");
        }
        return modelMap;
    }
    /**
     *工业建筑供暖通风与空气调节设计规范附表参数
     *  */
    @Resource
    private industryWarmNewWindService industryWarmNewWindService;
    @RequestMapping(value = "/getindustryparam",method = RequestMethod.GET)
    public Map<String, Object> getIndustryParam(HttpServletRequest request){
        String strStationId = request.getParameter("id");
        Map<String, Object> modelMap = new HashMap<String, Object>();
        if (strStationId != null && strStationId.matches("\\d+") != false) {
            int stationId = Integer.parseInt(strStationId);
            List<industryWarmNewWindInfo> list = industryWarmNewWindService.getindustryWarmNewWindById(stationId);
            modelMap.put("success", true);
            modelMap.put("param",list);
        }
        else{
            modelMap.put("success", false);
            modelMap.put("errMsg", "参数错误");
        }
        return modelMap;
    }
    /**
     *附表1：夏季新风计算逐时焓值参数
     *  */
    @Resource
    private AddSummerNewWindService addSummerNewWindService;
    @RequestMapping(value = "/getaddsummernewwind",method = RequestMethod.GET)
    public Map<String, Object> getAddSumNewWindParam(HttpServletRequest request){
        String strStationId = request.getParameter("id");
        Map<String, Object> modelMap = new HashMap<String, Object>();
        if (strStationId != null && strStationId.matches("\\d+") != false) {
            int stationId = Integer.parseInt(strStationId);
            List<AddSummerNewWindInfo> list = addSummerNewWindService.getaddSummerNewWindById(stationId);
            modelMap.put("success", true);
            modelMap.put("param",list);
        }
        else{
            modelMap.put("success", false);
            modelMap.put("errMsg", "参数错误");
        }
        return modelMap;
    }

    /**
     * 同时发生室外计算参数
     */
    @Resource
    private simultaneousParamService simultaneousParamService;
    @RequestMapping(value = "/getSimultaneousParam",method = RequestMethod.GET)
    public Map<String ,Object> getSimultanousParam(HttpServletRequest request){
        String strstationId = request.getParameter("id");
        Map<String ,Object> modelMap = new HashMap<>();
        if (strstationId != null && strstationId.matches("\\d+") != false){
            int stationId = Integer.parseInt(strstationId);
            List<SimultaneousParamInfo> list = simultaneousParamService.getSimuParamById(stationId);
            modelMap.put("success", true);
            modelMap.put("param",list);
        }
        else{
            modelMap.put("success", false);
            modelMap.put("errMsg", "参数错误");
        }
        return modelMap;
    }

    }
