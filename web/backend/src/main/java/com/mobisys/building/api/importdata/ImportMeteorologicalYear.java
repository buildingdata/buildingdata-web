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
import java.util.concurrent.Future;

@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping(value = "/importmeteorological")
public class ImportMeteorologicalYear {
    @Autowired
    //典型气象年
    private TypicalMeteoroLogicalService typicalMeteoroLogicalService;
    @Autowired
    //未来气象年
    private FutureMeteoroLogicalService futureMeteoroLogicalService;
    @Autowired
    //极端气象年
    private ExtremMeteoroLogicalService extremeMeteoroLogicalService;
    /**
     *
     * @param 导入excel
     * @param name：文件名
     * @param file：文件路径
     * @return
     */
    int flag=0;
    @ResponseBody
    @RequestMapping(value = "/uploadmeteorological")
    public String uploadExcel(@RequestParam("file") MultipartFile file,String name, HttpServletRequest request,HttpServletResponse response) {
        int count=0;
        int code=0;
        StringJoiner buffer = new StringJoiner("\n");
        JSONObject jsonObject = new JSONObject();
        try {
            if(name!=null) {
                InputStream inputStream = file.getInputStream();
                Workbook book = null;
                if (isExcel2003(name)) {
                    book = new HSSFWorkbook(inputStream);
                }
                if (isExcel2007(name)) {
                    book = new XSSFWorkbook(inputStream);
                }
                int sheetsNumber = book.getNumberOfSheets();
                System.out.println(sheetsNumber);
                for (int i = 0; i < sheetsNumber; i++) {
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
                        if (i == 0) {
                            //Sheet1, 对应数据库t_typical_meteorological表（典型气象年）
                            //需要参数的数据类型为TypicalMeteoroLogicalInfo
                            TypicalMeteoroLogicalInfo typicalMeteoroLogicalInfo = new TypicalMeteoroLogicalInfo();
                            Row row = sheet.getRow(j); //获取第i行
                            if (row != null) {
                                Cell[] cells = new Cell[14];
                                for (int k = 0; k < 14; k++) {
                                    cells[k] = row.getCell(k);
                                }
                                //数据校验
                                if (cells[0] != null) {//验证第一列不为空
                                    typicalMeteoroLogicalInfo.setStationId((int) cells[0].getNumericCellValue());
                                } else {
                                    buffer.add("Sheet" + i + "的" + j + "行出错，已忽略该行。");
                                    continue;
                                }
                                typicalMeteoroLogicalInfo.setMonth((int) cells[1].getNumericCellValue());
                                typicalMeteoroLogicalInfo.setDay((int) cells[2].getNumericCellValue());
                                typicalMeteoroLogicalInfo.setTime((int) cells[3].getNumericCellValue());
                                typicalMeteoroLogicalInfo.setPressure((int) cells[4].getNumericCellValue());
                                typicalMeteoroLogicalInfo.setDryTemp(cells[5].getNumericCellValue());
                                typicalMeteoroLogicalInfo.setPointTemper(cells[6].getNumericCellValue());
                                typicalMeteoroLogicalInfo.setRelativeHumidity((int) cells[7].getNumericCellValue());
                                typicalMeteoroLogicalInfo.setWindDirection((Double) cells[13].getNumericCellValue());
                                typicalMeteoroLogicalInfo.setWindSpeed(cells[12].getNumericCellValue());
                                typicalMeteoroLogicalInfo.setCloudiness((int) cells[11].getNumericCellValue());
                                typicalMeteoroLogicalInfo.setSunSumRadiation(cells[8].getNumericCellValue());
                                typicalMeteoroLogicalInfo.setDirectRadiation(cells[9].getNumericCellValue());
                                typicalMeteoroLogicalInfo.setScatterRadiation(cells[10].getNumericCellValue());

                                //数据插入
                                if (typicalMeteoroLogicalInfo.getStationId() != null) {
                                    count++;
                                    typicalMeteoroLogicalService.addTypical(typicalMeteoroLogicalInfo);//保存到数据库
                                }

                            }
                        }

                        jsonObject.put("count", "共计" + allRowNum + "条数据，导入成功" + count + "条数据，导入失败" + (allRowNum - count) + "条");
                        code = 1;

                    }
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
    @RequestMapping("/flag")
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
