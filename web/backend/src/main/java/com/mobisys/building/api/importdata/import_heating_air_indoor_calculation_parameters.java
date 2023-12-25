package com.mobisys.building.api.importdata;


import com.mobisys.building.entity.indoorDiffBuilInfo;
import net.sf.json.JSONObject;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.mobisys.building.entity.HeatingAirIndoorCalculationParametersInfo;
import com.mobisys.building.service.HeatingAirIndoorCalculationParametersService;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.StringJoiner;

@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping(value = "/import_heating_air_indoor_calculation_parameters")
public class import_heating_air_indoor_calculation_parameters {
    //表heating_air_indoor_calculation_parameters
    @Autowired
    private HeatingAirIndoorCalculationParametersService heatingAirIndoorCalculationParametersService;

    private double flag = 0;
    int count=0;
    @ResponseBody
    @RequestMapping("/upload_heating_air_indoor_calculation_parameters")
    public JSONObject UploadOcpnvd(@RequestParam("file") MultipartFile file, String name, HttpServletRequest request, HttpServletResponse response) throws IOException {
        StringJoiner buffer=new StringJoiner("/n");
        JSONObject jsonObject =new JSONObject();
        try {
            if(name!=null){
                InputStream inputStream=file.getInputStream();
                Workbook workbook=null;
                if(isExcel2003(name)) {
                    workbook= new HSSFWorkbook(inputStream);
                }else if(isExcel2007(name)) {
                    workbook=new XSSFWorkbook(inputStream);
                }

                Sheet sheet=workbook.getSheetAt(0);    //获得第0个工作薄
                int RowNum=sheet.getLastRowNum();         //如果sheet中一行数据都没有则返回-1，只有第一行有数据则返回0，最后有数据的行是第n行则返回 n-1


                //判断导入的文件是否为空
                if(RowNum==0) {
                    flag=100;
                    buffer.add("导入文件数据为空！");
                }

                for (int i = 1; i <= RowNum; i++){
                    if (flag < 100) {
                        double d = (double) 100 / RowNum;
                        flag += d;
                    } else {
                        flag = 100;
                    }
                    HeatingAirIndoorCalculationParametersInfo heatingAirIndoorCalculationParametersInfo=new HeatingAirIndoorCalculationParametersInfo();
                    Row row = sheet.getRow(i);     //获取指定行
                    if (row != null) {
                        Cell[] cells = new Cell[6];
                        for (int k = 0; k < 6; k++) {
                            cells[k] = row.getCell(k);//获取单元格

                        }
                        if (cells[0]!=null){
                            cells[0].setCellType(CellType.NUMERIC);//设置单元格格式
                            heatingAirIndoorCalculationParametersInfo.setStationId((int) cells[0].getNumericCellValue());
                        }else{
                            buffer.add("数据集缺少重要信息！！");
                            jsonObject.put("message",buffer.toString());
                            return jsonObject;
                        }

                        if (cells[1]!=null){
                            cells[1].setCellType(CellType.STRING);//设置单元格格式
                            heatingAirIndoorCalculationParametersInfo.setTypeAndLevel(cells[1].getStringCellValue());
                        }else{
                            buffer.add("数据集缺少重要信息！！");
                            jsonObject.put("message",buffer.toString());
                            return jsonObject;
                        }


                        if (cells[2]!=null){
                            cells[2].setCellType(CellType.NUMERIC);//设置单元格格式
                            heatingAirIndoorCalculationParametersInfo.setWinterDesignTemperature(cells[2].getNumericCellValue());
                        }else{
                            heatingAirIndoorCalculationParametersInfo.setWinterDesignTemperature(null);
                        }

                        if (cells[3]!=null){
                            cells[3].setCellType(CellType.NUMERIC);//设置单元格格式
                            heatingAirIndoorCalculationParametersInfo.setSummerDesignTemperature(cells[3].getNumericCellValue());
                        }else{
                            heatingAirIndoorCalculationParametersInfo.setSummerDesignTemperature(null);
                        }
                        if (cells[4]!=null){
                            cells[4].setCellType(CellType.STRING);//设置单元格格式
                            heatingAirIndoorCalculationParametersInfo.setWinterRelativeHumidity(cells[4].getStringCellValue());
                        }else{
                            heatingAirIndoorCalculationParametersInfo.setWinterDesignTemperature(null);
                        }
                        if (cells[5]!=null){
                            cells[5].setCellType(CellType.STRING);//设置单元格格式
                            heatingAirIndoorCalculationParametersInfo.setSummerRelativeHumidity(cells[5].getStringCellValue());
                        }else{
                            heatingAirIndoorCalculationParametersInfo.setSummerRelativeHumidity(null);
                        }
                        //插入数据
                        System.out.println("我是第" + i + "行");
                    }

                    if (heatingAirIndoorCalculationParametersInfo!= null) {
                        //根据台站号查询一下数据库，有就更新，没有就添加
                        List<HeatingAirIndoorCalculationParametersInfo> heatingAirIndoorCalculationParametersList;
                        try{
                            heatingAirIndoorCalculationParametersList = heatingAirIndoorCalculationParametersService.getHeatingAirIndoorCalculationParametersById(heatingAirIndoorCalculationParametersInfo.getStationId());
                            if (heatingAirIndoorCalculationParametersList!=null){
                                heatingAirIndoorCalculationParametersService.update_heating_air_indoor_calculation_parameters(heatingAirIndoorCalculationParametersInfo);

                            }else{
                                heatingAirIndoorCalculationParametersService.addHeatingAirIndoorCalculationParameters(heatingAirIndoorCalculationParametersInfo);
                            }
                            System.out.println("走了！");
                            count++;


                        }catch (Exception e){
                            System.out.println(e);
                        }


                    }
                    if (count == RowNum) {
                        buffer.add("上传完成！");
                    }
                    upLoadflag();

                }
                jsonObject.put("count", "共计" + RowNum + "条数据，导入成功" + count + "条数据，导入失败" + (RowNum - count) + "条");
                RowNum=0;
                count=0;
            }

        }catch (Exception e){

            System.out.println("出错了！");

        }
        jsonObject.put("message",buffer.toString());

        return jsonObject;
    }
    //    传递上传文件的进度标志flag
    @ResponseBody
    @RequestMapping("/flag")
    public JSONObject upLoadflag() {
        JSONObject jsonObject=new JSONObject();
        if(Math.round(flag)==100) {
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
