package com.mobisys.building.api.importdata;

import com.google.gson.JsonObject;
import com.mobisys.building.entity.OcpMulgrpcInfo;
import com.mobisys.building.entity.OtmccInfo;
import com.mobisys.building.service.OcpMulgrpcService;
import net.sf.json.JSONObject;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.StringJoiner;

/**
 * 导入多不保证率及多参数组合的室外计算参数excel表格
 */

@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping("/importocpMulGrpc")
public class ImportocpMulGrpc {
    @Autowired
    OcpMulgrpcService ocpMulgrpcService;
    private double flag=0;
    @ResponseBody
    @RequestMapping("/uploadocpMulGrpc")
    public JSONObject uploadocpMulGrpc(@RequestParam("file") MultipartFile file,String name) {
        int count=0,code=0;
//        dataline表示数据行的行数
        int dataline=0;
        System.out.println(name);
        StringJoiner buffer=new StringJoiner("\n");
        JSONObject jsonObject=new JSONObject();
        try{
            if(name!=null) {
                InputStream inputStream=file.getInputStream();
                Workbook workbook=null;
                if(isExcel2003(name)) {
                    workbook= new HSSFWorkbook(inputStream);
                }else if(isExcel2007(name)) {
                    workbook=new XSSFWorkbook(inputStream);
                }
                int sheetNum=workbook.getNumberOfSheets();
                Sheet sheet=workbook.getSheetAt(0);
                int RowNum=sheet.getLastRowNum();
                if(RowNum==0) {
                    flag=100;
                    buffer.add("导入文件数据为空");
                }
                flag = ((double)100/RowNum)*5;
                for(int i=6;i<=RowNum;i++) {
                    if(flag<100) {
                        double d=(double)100/RowNum;
                        flag+=d;
                    }else {
                        flag=100;
                    }
                    OcpMulgrpcInfo ocpMulgrpcInfo=new OcpMulgrpcInfo();
                    Row row=sheet.getRow(i);
                    if(row!=null) {
                        dataline++;
                        Cell[] cells=new Cell[40];
                        for(int k=0;k<cells.length;k++) {
                            cells[k] = row.getCell(k);
//                            System.out.println(cells[k]);
                        }
                        int flag1 = 0;
                        System.out.println(cells[0]);
                            //                        数据校验
                            if(cells[0]!=null&&cells[0].getCellType()== CellType.NUMERIC) {//站台号验证
                                OcpMulgrpcInfo ocpMulgrpcInfo1 = ocpMulgrpcService.getOcpMulgrpcById((int)cells[0].getNumericCellValue());
                                if (ocpMulgrpcInfo!=null){
                                    ocpMulgrpcInfo = ocpMulgrpcInfo1;
                                    flag1 = 1;
                                }
                                ocpMulgrpcInfo.setStationId((int)cells[0].getNumericCellValue());
                            }else {
                                buffer.add("sheet1"+"的第"+i+"行出错，已忽略该行。");
                                continue;
                            }
//                            插入数据
                            ocpMulgrpcInfo.setTemperWinAirCt6Hours(cells[1].getNumericCellValue());
                            ocpMulgrpcInfo.setTemperWinAirCt24Hours(cells[2].getNumericCellValue());
                            ocpMulgrpcInfo.setTemperWinAirCt48Hours(cells[3].getNumericCellValue());
                            ocpMulgrpcInfo.setTemperWinHeatingCt1Days(cells[4].getNumericCellValue());
                            ocpMulgrpcInfo.setTemperWinHeatingCt5Days(cells[5].getNumericCellValue());
                            ocpMulgrpcInfo.setTemperWinHeatingCt10Days(cells[6].getNumericCellValue());
                            ocpMulgrpcInfo.setTemperSumAirCdat1Days(cells[7].getNumericCellValue());
                            ocpMulgrpcInfo.setTemperSumAirCdat5Days(cells[8].getNumericCellValue());
                            ocpMulgrpcInfo.setTemperSumAirCdat10Days(cells[9].getNumericCellValue());
                            ocpMulgrpcInfo.setTemperSumAirCt10HoursDry(cells[10].getNumericCellValue());
                            ocpMulgrpcInfo.setTemperSumAirCt10HoursWet(cells[11].getNumericCellValue());
                            ocpMulgrpcInfo.setTemperSumAirCt50HoursDry(cells[12].getNumericCellValue());
                            ocpMulgrpcInfo.setTemperSumAirCt50HoursWet(cells[13].getNumericCellValue());
                            ocpMulgrpcInfo.setTemperSumAirCt100HoursDry(cells[14].getNumericCellValue());
                            ocpMulgrpcInfo.setTemperSumAirCt100HoursWet(cells[15].getNumericCellValue());
                            ocpMulgrpcInfo.setMoistureSumDehumCah10HoursMoi(cells[16].getNumericCellValue());
                            ocpMulgrpcInfo.setMoistureSumDehumCah10HoursDry(cells[17].getNumericCellValue());
                            ocpMulgrpcInfo.setMoistureSumDehumCah50HoursMoi(cells[18].getNumericCellValue());
                            ocpMulgrpcInfo.setMoistureSumDehumCah50HoursDry(cells[19].getNumericCellValue());
                            ocpMulgrpcInfo.setMoistureSumDehumCah100HoursMoi(cells[20].getNumericCellValue());
                            ocpMulgrpcInfo.setMoistureSumDehumCah100HoursDry(cells[21].getNumericCellValue());
                            ocpMulgrpcInfo.setMoistureWinHumCah10HoursMoi(cells[22].getNumericCellValue());
                            ocpMulgrpcInfo.setMoistureWinHumCah10HoursDry(cells[23].getNumericCellValue());
                            ocpMulgrpcInfo.setMoistureWinHumCah50HoursMoi(cells[24].getNumericCellValue());
                            ocpMulgrpcInfo.setMoistureWinHumCah50HoursDry(cells[25].getNumericCellValue());
                            ocpMulgrpcInfo.setMoistureWinHumCah100HoursMoi(cells[26].getNumericCellValue());
                            ocpMulgrpcInfo.setMoistureWinHumCah100HoursDry(cells[27].getNumericCellValue());
                            ocpMulgrpcInfo.setEnthalpySumFreshCe10HoursEnt(cells[28].getNumericCellValue());
                            ocpMulgrpcInfo.setEnthalpySumFreshCe10HoursDry(cells[29].getNumericCellValue());
                            ocpMulgrpcInfo.setEnthalpySumFreshCe50HoursEnt(cells[30].getNumericCellValue());
                            ocpMulgrpcInfo.setEnthalpySumFreshCe50HoursDry(cells[31].getNumericCellValue());
                            ocpMulgrpcInfo.setEnthalpySumFreshCe100HoursEnt(cells[32].getNumericCellValue());
                            ocpMulgrpcInfo.setEnthalpySumFreshCe100HoursDry(cells[33].getNumericCellValue());
                            ocpMulgrpcInfo.setEnthalpyWinFreshCe10HoursEnt(cells[34].getNumericCellValue());
                            ocpMulgrpcInfo.setEnthalpyWinFreshCe10HoursDry(cells[35].getNumericCellValue());
                            ocpMulgrpcInfo.setEnthalpyWinFreshCe50HoursEnt(cells[36].getNumericCellValue());
                            ocpMulgrpcInfo.setEnthalpyWinFreshCe50HoursDry(cells[37].getNumericCellValue());
                            ocpMulgrpcInfo.setEnthalpyWinFreshCe100HoursEnt(cells[38].getNumericCellValue());
                            ocpMulgrpcInfo.setEnthalpyWinFreshCe100HoursDry(cells[39].getNumericCellValue());
                            if(ocpMulgrpcInfo.getStationId()!=null&& flag1 == 0) {
                                ocpMulgrpcService.insertOcpMulgrpc(ocpMulgrpcInfo);
                                count++;
                            }else if (ocpMulgrpcInfo != null && flag1 == 1) {
                                System.out.println(cells[0]);
                                ocpMulgrpcService.updateOcpMulgrpc(ocpMulgrpcInfo);
                                count++;
                            }

                    }

                }
                if(count==dataline) {
                    buffer.add("上传完成！");
                }
                jsonObject.put("count","共计"+dataline+"条数据，导入成功"+count+"条数据，导入失败"+(dataline-count)+"条");
            }
        }catch (Exception e) {
            e.printStackTrace();
        }
        jsonObject.put("code",code);
        jsonObject.put("message",buffer.toString());
        return jsonObject;
    }
    @ResponseBody
    @RequestMapping("/flag")
    public JSONObject uploadFlag() {
        JSONObject jsonObject=new JSONObject();
        if(Math.round(flag) ==100) {
            jsonObject.put("code",1);
        }
        jsonObject.put("flag",Math.round(flag));
        return jsonObject;
    }
    /***
     * 判断文件类型是不是2003版本
     * @param
     * @return
     */
    private boolean isExcel2003(String fileName) {
        return fileName.matches("^.+\\.(?i)(xls)$");
    }
    /***
     * 判断文件类型是不是2007版本
     * @param
     * @return
     */
    private boolean isExcel2007(String fileName) {
        return fileName.matches("^.+\\.(?i)(xlsx)$");
    }
}

