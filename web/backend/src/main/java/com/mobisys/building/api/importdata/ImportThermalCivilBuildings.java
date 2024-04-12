package com.mobisys.building.api.importdata;

import com.mobisys.building.entity.*;
import com.mobisys.building.service.*;
import net.sf.json.JSONObject;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.StringJoiner;

@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping(value = "/importtcb")
public class ImportThermalCivilBuildings {
    @Autowired
    //民用建筑热工设计规范附表参数
    private TdocbService tdocbService;
    @Autowired
    //
    private StationService stationService;
    @Autowired
    //围护结构隔热设计室外计算参数
    private OtmccService otmccService;
    @Autowired
    //自然通风设计室外计算参数
    private OcpnvdService ocpnvdService;
    @Autowired
    //围护结构热湿耦合计算室外计算参数
    private OcpehhccService ocpehhccService;
    @Autowired
    //建筑遮阳设计室外计算参数
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
    @RequestMapping(value = "/uploadtcb")
    public String uploadExcel(@RequestParam("file") MultipartFile file,String name, HttpServletRequest request,HttpServletResponse response) {
        int count=0;
        int code=0;
        int stationId = 0;
        double sunshadePeriodStart = 0.0;
        double sunshadePeriodEnd = 0.0;
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
                for (int i=0; i<sheetsNumber; i++){
                    Sheet sheet = book.getSheetAt(i);
                    int allRowNum = sheet.getLastRowNum();
//                    if(allRowNum==0) {
//                        flag=100;//flag是进度条的值
//                        buffer.add("导入文件数据为空");
//                    }
                    for (int j = 1; j <= allRowNum; j++) {
                        //加载状态值，当前进度
                        if (flag < 100) {
                            flag = flag + (100 / allRowNum);
                        } else {
                            flag = 100;
                        }
                        if (i == 0){
                            //Sheet1, 对应数据库tdocb表
                            //需要参数的数据类型为TdocbInfo()
                            TdocbInfo tdocbInfo = new TdocbInfo();
                            Row row = sheet.getRow(j); //获取第i行
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
                        }else if (i == 1){
                            //Sheet2，对应数据表ocpnvd表
                            //需要的数据类型
                            OcpnvdInfo ocpnvdInfo = new OcpnvdInfo();
                            Row row = sheet.getRow(j); //获取第i行
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


                                //数据校验
                                if (cell1 != null && cell1.getCellType() == CellType.NUMERIC) {//站台号列验证
                                    ocpnvdInfo.setStationId((int) cell1.getNumericCellValue());
                                } else {
                                    buffer.add("Sheet" + i + "的" + j + "行出错，已忽略该行。");
                                    continue;
                                }
                                //ocpnvdInfo.setStationId((int)cell1.getNumericCellValue());
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


                                //数据插入
                                if (ocpnvdInfo.getStationId() != null) {
                                    System.out.println("-------------" + ocpnvdInfo.getStationId());
                                    count++;
                                    ocpnvdService.addOcpnvd(ocpnvdInfo); //保存到数据库
                                }
                                //count++;
                            }
                        }else if (i == 2){
                            //Sheet3，对应表asdo表中的主键信息（子表1），仅做保存处理。
                            Row row = sheet.getRow(j); //获取第i行
                            if (row != null) {
                                Cell cell1 = row.getCell(0); //获取第1个单元格的数据
                                Cell cell2 = row.getCell(1);

                                //数据校验
                                if (cell1 != null && cell1.getCellType() == CellType.NUMERIC) {//站台号列验证
                                    stationId = (int) cell1.getNumericCellValue();
                                } else {
                                    buffer.add("Sheet" + i + "的" + j + "行出错，已忽略该行。");
                                    continue;
                                }
                                String sunshadePeriod = cell2.getStringCellValue();

                                String startStr = null;
                                String endStr = null;
                                double start = 0.0;
                                double end = 0.0;

                                if (sunshadePeriod != null && !"".equals(sunshadePeriod)){
                                    startStr = sunshadePeriod.substring(0, sunshadePeriod.indexOf("-"));
                                    endStr = sunshadePeriod.substring(sunshadePeriod.indexOf("-") + 1);
                                    try {
                                        start = Double.parseDouble(startStr);
                                    }catch (Exception e){
                                        start = 0;
                                    }
                                    try {
                                        end = Double.parseDouble(endStr);
                                    }catch (Exception e){
                                        end = 0;
                                    }
                                }

                                //数据存储
                                sunshadePeriodStart = start;
                                sunshadePeriodEnd = end;

                            }
                        }else if (i == 3){
                            //Sheet4，对应表asdo表中的信息（子表2）
                            //需要用到数据结构Asdoinfo
                            AsdoInfo asdoInfo = new AsdoInfo();//我需要插入的数据类型
                            Row row = sheet.getRow(j); //获取第i行
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
                                if (cell1 != null) {//第一个cell验空
                                    asdoInfo.setTime((int)cell1.getNumericCellValue());
                                } else {
                                    buffer.add("Sheet" + i + "的" + j + "行出错，已忽略该行。");
                                    continue;
                                }
                                asdoInfo.setStationId(stationId);
//                                asdoInfo.setSunshadePeriodStart(sunshadePeriodStart);
//                                asdoInfo.setSunshadePeriodEnd(sunshadePeriodEnd);
                                //asdoInfo.setTime((int)cell1.getNumericCellValue());
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
                        }else if (i == 4){
                            //Sheet5，对应表asdo表中的信息（子表3）
                            //需要用到数据结构Asdoinfo
                            AsdoInfo asdoInfo = new AsdoInfo();//我需要插入的数据类型
                            Row row = sheet.getRow(j); //获取第i行
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
                                if (cell1 != null) {//第一个cell验空
                                    asdoInfo.setTime((int)cell1.getNumericCellValue());
                                } else {
                                    buffer.add("Sheet" + i + "的" + j + "行出错，已忽略该行。");
                                    continue;
                                }
                                asdoInfo.setStationId(stationId);
//                                asdoInfo.setSunshadePeriodStart(sunshadePeriodStart);
//                                asdoInfo.setSunshadePeriodEnd(sunshadePeriodEnd);
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
                        }else if (i == 5){
                            //Sheet6，对应表asdo表中的信息（子表4）
                            //需要用到数据结构Asdoinfo
                            AsdoInfo asdoInfo = new AsdoInfo();//我需要插入的数据类型
                            Row row = sheet.getRow(j); //获取第i行
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
                                if (cell1 != null) {//第一个cell验空
                                    asdoInfo.setTime((int)cell1.getNumericCellValue());
                                } else {
                                    buffer.add("Sheet" + i + "的" + j + "行出错，已忽略该行。");
                                    continue;
                                }
                                asdoInfo.setStationId(stationId);
//                                asdoInfo.setSunshadePeriodStart(sunshadePeriodStart);
//                                asdoInfo.setSunshadePeriodEnd(sunshadePeriodEnd);
                                asdoInfo.setTime((int) cell1.getNumericCellValue());
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

                        }else if (i == 6){
                            //Sheet7，对应数据表

                        }else if (i == 7){
                            //Sheet8，对应数据表otmcc表
                            //需要用到的数据结构otmccInfo
                            OtmccInfo otmccInfo = new OtmccInfo();//我需要插入的数据类型
                            Row row = sheet.getRow(j); //获取第i行
                            if (row != null) {
                                Cell cell1 = row.getCell(0); //获取第1个单元格的数据
                                Cell cell2 = row.getCell(1);
                                Cell cell3 = row.getCell(2);
                                Cell cell4 = row.getCell(3);
                                Cell cell5 = row.getCell(4);
                                Cell cell6 = row.getCell(5);
                                Cell cell7 = row.getCell(6);

                                //数据校验
                                if (cell1 != null) {//第一个cell验空
                                    otmccInfo.setTime((int)cell1.getNumericCellValue());
                                } else {
                                    buffer.add("Sheet" + i + "的" + j + "行出错，已忽略该行。");
                                    continue;
                                }
                                otmccInfo.setStationId(stationId);      //新疆塔中数据
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

                        }else if (i == 8){
                            //Sheet9，对应数据表ocpehhcc。
                            //需要使用到数据结构ocpehhccInfo
                            OcpehhccInfo ocpehhccInfo = new OcpehhccInfo();//我需要插入的数据类型
                            Row row = sheet.getRow(j); //获取第i行
                            if (row != null) {
                                Cell cell1 = row.getCell(0); //获取第1个单元格的数据
                                Cell cell2 = row.getCell(1);
                                Cell cell3 = row.getCell(2);
                                Cell cell4 = row.getCell(3);
                                Cell cell5 = row.getCell(4);
                                Cell cell6 = row.getCell(5);
                                Cell cell7 = row.getCell(6);

                                //数据校验
                                if (cell1 != null) {//第一个cell验空
                                    ocpehhccInfo.setTime((int)cell1.getNumericCellValue());
                                } else {
                                    buffer.add("Sheet" + i + "的" + j + "行出错，已忽略该行。");
                                    continue;
                                }
//                                ocpehhccInfo.setStationId(stationId);
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
                    }


                    jsonObject.put("count", "共计"+allRowNum+"条数据，导入成功"+count+"条数据，导入失败"+(allRowNum-count)+"条");
                    code=1;

                }
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
