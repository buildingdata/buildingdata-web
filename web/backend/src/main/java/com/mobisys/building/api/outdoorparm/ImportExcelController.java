package com.mobisys.building.api.outdoorparm;

import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.StringJoiner;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mobisys.building.entity.*;
import com.mobisys.building.service.*;
import net.sf.json.JSONObject;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping(value = "/importExcel")
public class ImportExcelController {
    @Autowired
    private TdocbService tdocbService;
    @Autowired
    private StationService stationService;
    @Autowired
    private OtmccService otmccService;
    @Autowired
    private OcpnvdService ocpnvdService;
    @Autowired
    private OcpehhccService ocpehhccService;
    @Autowired
    private AsdoService asdoService;


    /**
     *
     * @param 导入excel
     * @param name：文件名
     * @param file：文件路径
     * @return
     */

    int flag=0;
    @ResponseBody
    @RequestMapping(value = "/uploadExcel")
    public String uploadExcel(@RequestParam("file") MultipartFile file,String name, HttpServletRequest request,HttpServletResponse response) {
        String action = request.getParameter("action");
        int count=0;
        int code=0;
        StringJoiner buffer = new StringJoiner("\n");
        JSONObject jsonObject = new JSONObject();
        try {
            if(name!=null) {
                InputStream inputStream = file.getInputStream();
                Workbook book=null;
                if(isExcel2003(name)) {
                    book=new HSSFWorkbook(inputStream);
                }
                if(isExcel2007(name)) {
                    book = new XSSFWorkbook(inputStream);
                }
                int sheetsNumber=book.getNumberOfSheets();
                System.out.println(sheetsNumber);
                Sheet sheet = book.getSheetAt(0);
                int allRowNum = sheet.getLastRowNum();

                if(allRowNum==0) {
                    flag=100;//flag是进度条的值
                    buffer.add("导入文件数据为空");
                }
                String insertsql = "";
                try{
                    /* 此处进行判断上传至哪个表 */
                    if ("tdocb".equals(action)) {
                        for (int i = 1; i <= allRowNum; i++) {
                            if (flag < 100) {
                                flag = flag + (100 / allRowNum);
                            } else {
                                flag = 100;
                            }
                            //加载状态值，当前进度
                            TdocbInfo tdocbInfo = new TdocbInfo();//我需要插入的数据类型
                            Row row = sheet.getRow(i); //获取第i行
                            if (row != null) {
                                Cell[] cells=new Cell[19];
                                for(int k=0;k<20;k++) {
//                            if (k==0){
//                                cells[k]=row.getCell(k); //获取第一个单元格的数据
//                            }else if(k>5){
//                                cells[k]=row.getCell(k);
//                            }
                                    cells[k]=row.getCell(k);
                                }
//                        数据校验
                                if(cells[0]!=null&&cells[0].getCellType()== CellType.NUMERIC) {//站台号验证
                                    tdocbInfo.setStationId((int)cells[0].getNumericCellValue());
                                }else {
                                    buffer.add("sheet1"+"的第"+i+"行出错，已忽略该行。");
                                    continue;
                                }
//                        数据插入
                                tdocbInfo.setHDD((int)cells[6].getNumericCellValue());
                                tdocbInfo.setCDD((int)cells[7].getNumericCellValue());
                                tdocbInfo.settMinDMT(cells[8].getNumericCellValue());
                                tdocbInfo.settMaxDMT(cells[9].getNumericCellValue());
                                tdocbInfo.settHCalDMT(cells[10].getNumericCellValue());
                                tdocbInfo.settW(cells[11].getNumericCellValue());
                                tdocbInfo.settMinMMT(cells[12].getNumericCellValue());
                                tdocbInfo.settMaxMMT(cells[13].getNumericCellValue());
//                                tdocbInfo.setStartHeating(cells[14].getNumericCellValue());
//                                tdocbInfo.setEndHeating(cells[15].getNumericCellValue());
                                tdocbInfo.setHeatingMT(cells[16].getNumericCellValue());
                                tdocbInfo.setzD((int)cells[17].getNumericCellValue());
                                tdocbInfo.setwEAve(cells[18].getNumericCellValue());
                                if(tdocbInfo.getStationId()!=null) {
                                    count++;
                                    tdocbService.addTdocb(tdocbInfo);  //保存到数据库
                                }

                            }
                        }
                    }else if ("ocpnvd".equals(action)){

                        for(int i=1;i<=allRowNum;i++) {
                            if (flag < 100) {
                                flag = flag + (100 / i);
                            } else {
                                flag = 100;
                            }
                            //加载状态值，当前进度
                            OcpnvdInfo ocpnvdInfo = new OcpnvdInfo();
                            Row row = sheet.getRow(i); //获取第i行
                            if (row != null) {
                                Cell cell1 = row.getCell(0); //获取第1个单元格的数据
                                Cell cell2 = row.getCell(1);
                                Cell cell3 = row.getCell(2);
                                Cell cell4 = row.getCell(3);
                                Cell cell5 = row.getCell(4);
                                Cell cell6 = row.getCell(5);
                                Cell cell7 = row.getCell(6);
                                Cell cell8 = row.getCell(7);
                                Cell cell9 = row.getCell(8);
                                Cell cell10 = row.getCell(9);
                                Cell cell11 = row.getCell(10);



                                ocpnvdInfo.setStationId((int)cell1.getNumericCellValue());
                                ocpnvdInfo.setCvp(String.valueOf(cell2.getStringCellValue()));
                                ocpnvdInfo.setCvd(cell3.getStringCellValue());
                                ocpnvdInfo.setCvows(cell4.getStringCellValue());
                                ocpnvdInfo.setCvorh(cell5.getStringCellValue());
                                ocpnvdInfo.setCvot(cell6.getStringCellValue());
                                ocpnvdInfo.setNvp(cell7.getStringCellValue());
                                ocpnvdInfo.setNvd(cell8.getStringCellValue());
                                ocpnvdInfo.setNvows(cell9.getStringCellValue());
                                ocpnvdInfo.setNvorh(cell10.getStringCellValue());
                                ocpnvdInfo.setNvot(cell11.getStringCellValue());



                                //insertsql += ("INSERT INTO ocpnvd(`station_id`, `cvp`, `cvd`, `cvows`, `cvorh`, `cvot`, `nvp`, `nvd`, `nvows`, `nvorh`, `nvot`) VALUES ('" + ocpnvdInfo.getStationId() + "', '" + ocpnvdInfo.getCvp() + "', '" + ocpnvdInfo.getCvd() + "', '" + ocpnvdInfo.getCvows() + "', '" + ocpnvdInfo.getCvorh() + "', '" + ocpnvdInfo.getCvot() + "', '" + ocpnvdInfo.getNvp() + "', '" + ocpnvdInfo.getNvd() + "', '" + ocpnvdInfo.getNvows() + "', '" + ocpnvdInfo.getNvorh() + "', '" + ocpnvdInfo.getNvot() + "');\n");

                                //数据插入
                                if (ocpnvdInfo.getStationId() != null) {
                                    count++;
                                    ocpnvdService.addOcpnvd(ocpnvdInfo); //保存到数据库
                                }
                                //count++;
                            }

                        }
                        System.out.println(insertsql);
                    }else if ("otmcc".equals(action)){
                        for (int i = 1; i <= allRowNum; i++) {
                            if (flag < 100) {
                                flag = flag + (100 / i);
                            } else {
                                flag = 100;
                            }
                            //加载状态值，当前进度
                            OtmccInfo otmccInfo = new OtmccInfo();//我需要插入的数据类型
                            Row row = sheet.getRow(i); //获取第i行
                            if (row != null) {
                                Cell cell1 = row.getCell(0); //获取第1个单元格的数据
                                Cell cell2 = row.getCell(1);
                                Cell cell3 = row.getCell(2);
                                Cell cell4 = row.getCell(3);
                                Cell cell5 = row.getCell(4);
                                Cell cell6 = row.getCell(5);
                                Cell cell7 = row.getCell(6);

                                otmccInfo.setStationId(51747);      //新疆塔中数据
                                otmccInfo.setTime((int)cell1.getNumericCellValue());
                                otmccInfo.setOutdoorAirTep(cell2.getNumericCellValue());
                                otmccInfo.setHorizontal(cell3.getNumericCellValue());
                                otmccInfo.setEast(cell4.getNumericCellValue());
                                otmccInfo.setSouth(cell5.getNumericCellValue());
                                otmccInfo.setWest(cell6.getNumericCellValue());
                                otmccInfo.setNorth(cell7.getNumericCellValue());

                                //数据插入
                                if (otmccInfo.getStationId() != null) {
                                    count++;
                                    otmccService.addOtmcc(otmccInfo); //保存到数据库
                                }

                            }
                        }

                    }else if ("ocpehhcc".equals(action)){
                        //围护结构热湿耦合计算室外计算参数，热工表6。

                        List<OcpehhccInfo> ocpehhccInfos = new ArrayList<>();
                        for (int i = 1; i <= allRowNum; i++) {
                            if (flag < 100) {
                                flag = flag + (100 / i);
                            } else {
                                flag = 100;
                            }
                            System.out.println("flag--------------------" + flag);
                            //加载状态值，当前进度
                            OcpehhccInfo ocpehhccInfo = new OcpehhccInfo();//我需要插入的数据类型
                            Row row = sheet.getRow(i); //获取第i行
                            if (row != null) {
                                Cell cell1 = row.getCell(0); //获取第1个单元格的数据
                                Cell cell2 = row.getCell(1);
                                Cell cell3 = row.getCell(2);
                                Cell cell4 = row.getCell(3);
                                Cell cell5 = row.getCell(4);
                                Cell cell6 = row.getCell(5);
                                Cell cell7 = row.getCell(6);

                                //数据校验

//                                ocpehhccInfo.setStationId(57489);
//                                ocpehhccInfo.setTime((int)cell1.getNumericCellValue());
//                                ocpehhccInfo.setOutdoorAirTemperature(cell2.getNumericCellValue());
//                                ocpehhccInfo.setRelativeHumidity((int)cell3.getNumericCellValue());
//                                ocpehhccInfo.setRainfall(cell4.getNumericCellValue());
//                                ocpehhccInfo.setWindDirection(cell5.getStringCellValue());
//                                ocpehhccInfo.setWindSpeed(cell6.getNumericCellValue());
//                                ocpehhccInfo.setAtmosphericPressure((int)cell7.getNumericCellValue());

                                //数据插入
                                if (ocpehhccInfo.getTime() != null && ocpehhccInfo.getTime() != 0) {
                                    count++;
                                    ocpehhccService.addOcpehhcc(ocpehhccInfo);//保存到数据库
                                }

                            }
                        }

                    }else if ("ocpedid".equals(action)){

                    }else if ("asdo1".equals(action)){
                        for (int i = 1; i <= allRowNum; i++) {
                            if (flag < 100) {
                                flag = flag + (100 / i);
                            } else {
                                flag = 100;
                            }
                            //加载状态值，当前进度
                            AsdoInfo asdoInfo = new AsdoInfo();//我需要插入的数据类型
                            Row row = sheet.getRow(i); //获取第i行
                            if (row != null) {
                                Cell cell1 = row.getCell(0); //获取第1个单元格的数据
                                Cell cell2 = row.getCell(1);
                                Cell cell3 = row.getCell(2);
                                Cell cell4 = row.getCell(3);
                                Cell cell5 = row.getCell(4);
                                Cell cell6 = row.getCell(5);
                                Cell cell7 = row.getCell(6);
                                Cell cell8 = row.getCell(7);
                                Cell cell9 = row.getCell(8);
                                Cell cell10 = row.getCell(9);
                                Cell cell11 = row.getCell(10);
                                Cell cell12 = row.getCell(11);
                                Cell cell13 = row.getCell(12);
                                Cell cell14 = row.getCell(13);

                                //数据校验

                                asdoInfo.setStationId(57036);
//                                asdoInfo.setSunshadePeriodStart(5.8);
//                                asdoInfo.setSunshadePeriodEnd(9.22);
                                asdoInfo.setTime((int)cell1.getNumericCellValue());
                                asdoInfo.setSolarAltitudeAngle(cell2.getNumericCellValue());
                                asdoInfo.setSolarAzimuthAngle(cell3.getNumericCellValue());
                                asdoInfo.setOutdoorAirTep(cell4.getNumericCellValue());
                                asdoInfo.setTableType(1);
                                asdoInfo.setHoriI(cell5.getNumericCellValue());
                                asdoInfo.setHoriId(cell6.getNumericCellValue());
                                asdoInfo.setEastI(cell7.getNumericCellValue());
                                asdoInfo.setEastId(cell8.getNumericCellValue());
                                asdoInfo.setSoutI(cell9.getNumericCellValue());
                                asdoInfo.setSoutId(cell10.getNumericCellValue());
                                asdoInfo.setWestI(cell11.getNumericCellValue());
                                asdoInfo.setWestId(cell12.getNumericCellValue());
                                asdoInfo.setNortI(cell13.getNumericCellValue());
                                asdoInfo.setNortId(cell14.getNumericCellValue());

                                //数据插入
                                if (asdoInfo.getTime() != null && asdoInfo.getTime() != 0) {
                                    count++;
                                    asdoService.addAsdoFromTable_1(asdoInfo);//保存到数据库
                                }

                            }
                        }

                    }else if ("asdo2".equals(action)){
                        for (int i = 1; i <= allRowNum; i++) {
                            if (flag < 100) {
                                flag = flag + (100 / i);
                            } else {
                                flag = 100;
                            }
                            //加载状态值，当前进度
                            AsdoInfo asdoInfo = new AsdoInfo();//我需要插入的数据类型
                            Row row = sheet.getRow(i); //获取第i行
                            if (row != null) {
                                Cell cell1 = row.getCell(0); //获取第1个单元格的数据
                                Cell cell2 = row.getCell(1);
                                Cell cell3 = row.getCell(2);
                                Cell cell4 = row.getCell(3);
                                Cell cell5 = row.getCell(4);
                                Cell cell6 = row.getCell(5);
                                Cell cell7 = row.getCell(6);
                                Cell cell8 = row.getCell(7);
                                Cell cell9 = row.getCell(8);
                                Cell cell10 = row.getCell(9);
                                Cell cell11 = row.getCell(10);
                                Cell cell12 = row.getCell(11);
                                Cell cell13 = row.getCell(12);
                                Cell cell14 = row.getCell(13);

                                //数据校验

                                asdoInfo.setStationId(57036);
//                                asdoInfo.setSunshadePeriodStart(5.8);
//                                asdoInfo.setSunshadePeriodEnd(9.22);
                                asdoInfo.setTime((int)cell1.getNumericCellValue());
                                asdoInfo.setSolarAltitudeAngle(cell2.getNumericCellValue());
                                asdoInfo.setSolarAzimuthAngle(cell3.getNumericCellValue());
                                asdoInfo.setOutdoorAirTep(cell4.getNumericCellValue());
                                asdoInfo.setTableType(2);
                                asdoInfo.setHoriI(cell5.getNumericCellValue());
                                asdoInfo.setHoriId(cell6.getNumericCellValue());
                                asdoInfo.setEastI(cell7.getNumericCellValue());
                                asdoInfo.setEastId(cell8.getNumericCellValue());
                                asdoInfo.setSoutI(cell9.getNumericCellValue());
                                asdoInfo.setSoutId(cell10.getNumericCellValue());
                                asdoInfo.setWestI(cell11.getNumericCellValue());
                                asdoInfo.setWestId(cell12.getNumericCellValue());
                                asdoInfo.setNortI(cell13.getNumericCellValue());
                                asdoInfo.setNortId(cell14.getNumericCellValue());

                                //数据插入
                                if (asdoInfo.getTime() != null && asdoInfo.getTime() != 0) {
                                    count++;
                                    asdoService.addAsdoFromTable_2(asdoInfo);//保存到数据库
                                }

                            }
                        }

                    }else if ("asdo3".equals(action)){
                        for (int i = 1; i <= allRowNum; i++) {
                            if (flag < 100) {
                                flag = flag + (100 / i);
                            } else {
                                flag = 100;
                            }
                            //加载状态值，当前进度
                            AsdoInfo asdoInfo = new AsdoInfo();//我需要插入的数据类型
                            Row row = sheet.getRow(i); //获取第i行
                            if (row != null) {
                                Cell cell1 = row.getCell(0); //获取第1个单元格的数据
                                Cell cell2 = row.getCell(1);
                                Cell cell3 = row.getCell(2);
                                Cell cell4 = row.getCell(3);
                                Cell cell5 = row.getCell(4);
                                Cell cell6 = row.getCell(5);
                                Cell cell7 = row.getCell(6);
                                Cell cell8 = row.getCell(7);
                                Cell cell9 = row.getCell(8);
                                Cell cell10 = row.getCell(9);
                                Cell cell11 = row.getCell(10);
                                Cell cell12 = row.getCell(11);

                                //数据校验

                                asdoInfo.setStationId(57036);
//                                asdoInfo.setSunshadePeriodStart(5.8);
//                                asdoInfo.setSunshadePeriodEnd(9.22);
                                asdoInfo.setTime((int)cell1.getNumericCellValue());
                                asdoInfo.setAveValueOutairDayHour(cell2.getNumericCellValue());
                                asdoInfo.setTableType(3);
                                asdoInfo.setHoriI(cell3.getNumericCellValue());
                                asdoInfo.setHoriId(cell4.getNumericCellValue());
                                asdoInfo.setEastI(cell5.getNumericCellValue());
                                asdoInfo.setEastId(cell6.getNumericCellValue());
                                asdoInfo.setSoutI(cell7.getNumericCellValue());
                                asdoInfo.setSoutId(cell8.getNumericCellValue());
                                asdoInfo.setWestI(cell9.getNumericCellValue());
                                asdoInfo.setWestId(cell10.getNumericCellValue());
                                asdoInfo.setNortI(cell11.getNumericCellValue());
                                asdoInfo.setNortId(cell12.getNumericCellValue());

                                //数据插入
                                if (asdoInfo.getTime() != null && asdoInfo.getTime() != 0) {
                                    count++;
                                    asdoService.addAsdoFromTable_3(asdoInfo);//保存到数据库
                                }

                            }
                        }

                    }else if ("station".equals(action)){

                        //加载状态值，当前进度
                        //List<StationInfo> stationInfoList = new ArrayList<>();//我需要插入的数据类型

                        for(int i=1;i<=allRowNum;i++) {
                            if (flag < 100) {
                                flag = flag + (100 / i);
                            } else {
                                flag = 100;
                            }

                            Row row = sheet.getRow(i); //获取第i行
                            if (row != null) {
                                Cell cell1 = row.getCell(0); //获取第1个单元格的数据
                                Cell cell2 = row.getCell(1);
                                Cell cell3 = row.getCell(2);
                                Cell cell4 = row.getCell(3);
                                Cell cell5 = row.getCell(4);
                                Cell cell6 = row.getCell(5);
                                Cell cell7 = row.getCell(6);

                                StationInfo stationInfo = new StationInfo();
                                stationInfo.setStationId((int) cell1.getNumericCellValue());
                                stationInfo.setProvince(String.valueOf(cell2.getStringCellValue()));
                                stationInfo.setCityName(cell3.getStringCellValue());
                                stationInfo.setLatitude(cell4.getNumericCellValue());
                                stationInfo.setLongitude(cell5.getNumericCellValue());
                                stationInfo.setAltitude(cell6.getNumericCellValue());
                                stationInfo.setClimates(cell7.getStringCellValue());
                                stationInfo.setLevel(3);

                                //stationInfoList.add(stationInfo);
                                stationService.addStation(stationInfo);

                                //insertsql += ("INSERT INTO station(`station_id`, `province`, `city_name`, `latitude`, `longitude`, `altitude`) VALUES ('" + stationInfo.getStationId() + "', '" + stationInfo.getProvince() + "', '" + stationInfo.getCityName() + "', '" + stationInfo.getLatitude() + "', '" + stationInfo.getLongitude() + "', '" + stationInfo.getAltitude() + "');\n");


                                count++;
                            }

                        }
                        //stationService.addStations(stationInfoList);
                        //System.out.println(insertsql);
                    }
                }catch (Exception e){
                    code = 0;
                    flag = 0;
                    jsonObject.put("flag", flag);
                    jsonObject.put("code",code);
                    jsonObject.put("message", e.getMessage());
                    return jsonObject.toString();
                }


                jsonObject.put("count", "共计"+allRowNum+"条数据，导入成功"+count+"条数据，导入失败"+(allRowNum-count)+"条");
                code=1;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        jsonObject.put("code",code);
        jsonObject.put("message",buffer.toString());
        return jsonObject.toString();
    }
    /***
     * 判断文件类型是不是2003版本
     * @param
     * @return
     */
    public static boolean isExcel2003(String filePath) {
        return filePath.matches("^.+\\.(?i)(xls)$");
    }

    /**
     * 判断文件类型是不是2007版本
     * @param
     * @return
     */
    public static boolean isExcel2007(String filePath) {
        return filePath.matches("^.+\\.(?i)(xlsx)$");
    }
    @RequestMapping("/test")
    @ResponseBody
    public String test(HttpServletResponse response) {
        JSONObject jsonObject=new JSONObject();
        if(flag==100) {
            jsonObject.put("code", 1);
        }
        //System.out.println("flag:" + flag);
        jsonObject.put("flag", flag);
        return jsonObject.toString();
    }
}
