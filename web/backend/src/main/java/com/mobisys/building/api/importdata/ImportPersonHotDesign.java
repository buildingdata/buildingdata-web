package com.mobisys.building.api.importdata;

import com.mobisys.building.entity.TdocbInfo;
import com.mobisys.building.service.TdocbService;
import net.sf.json.JSONObject;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.StringJoiner;

/**
 *
 * 导入excel-热工设计室外计算参数
// * @param file：文件名
// * @param name：文件路径
// * @param request：
// * @param response：
 * @return
 * */

@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping("/importPersonHotDesign")
public class ImportPersonHotDesign {
    @Autowired
    private TdocbService tdocbService;
    private double flag=0;
    @ResponseBody
    @RequestMapping("/upload")
    public JSONObject uploadExcel(@RequestParam("file") MultipartFile file, String name) {
        int count=0;
        int code=0;

        JSONObject jsonObject=new JSONObject();
        StringJoiner buffer=new StringJoiner("\n");
//        System.out.println(file.getName());
        try{
            if(name!=null) {
                System.out.println(name);
                InputStream inputStream=file.getInputStream();
                Workbook workbook=null;
                if(isExcel2003(name)) {
                    workbook=new HSSFWorkbook(inputStream);
                }else if(isExcel2007(name)) {
                    workbook=new XSSFWorkbook(inputStream);
                }
                int sheetsNumber=workbook.getNumberOfSheets();
                //先看这个表只有一个sheet的情况
                Sheet sheet = workbook.getSheetAt(0);
                int RowNum = sheet.getLastRowNum();
//                System.out.println("文件总行数："+RowNum);
                if(RowNum==0) {
                    flag=100;
                    buffer.add("导入文件数据为空");
                }
                System.out.println("文件的行数"+RowNum);
                //从第二行开始读取数据
                for(int i=1;i<=RowNum;i++) {
//                    加载状态值，当前进度
                    if(flag<100) {
                        double d=(double) 100/RowNum;
                        flag+=d;
                        System.out.println("flag的值："+flag);
                        System.out.println("d的值："+d);
                    }else {
                        flag=100;
                    }
//                  对应数据库中的tdocb表
                    TdocbInfo tdocbInfo=new TdocbInfo();
//                  获取第i行的数据
                    Row row=sheet.getRow(i);
                    if(row!=null) {
                        Cell[] cells=new Cell[19];
                        for(int k=0;k<19;k++) {
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
//                        if(cells[14].CELL_TYPE_STRING)
//                        判断起始日期是不是没有
                        if(cells[14].getCellType().equals(CellType.STRING)&&cells[14].getStringCellValue().equals("没有计算采暖期"))
                        {
                            tdocbInfo.setEndHeating(null);
                            tdocbInfo.setHeatingMT(null);
                            tdocbInfo.setzD(0);
                            tdocbInfo.setwEAve(null);
                        }else {
                            double temp1=cells[14].getNumericCellValue();
                            Date date1=org.apache.poi.ss.usermodel.DateUtil.getJavaDate(temp1);
                            tdocbInfo.setStartHeating(date1);
                            double temp2=cells[15].getNumericCellValue();
                            Date date2=org.apache.poi.ss.usermodel.DateUtil.getJavaDate(temp2);
                            tdocbInfo.setEndHeating(date2);
//                            System.out.println("单元格14"+result1);
//                            System.out.println("单元格值"+temp1);
                            tdocbInfo.setHeatingMT(cells[16].getNumericCellValue());
                            tdocbInfo.setzD((int)cells[17].getNumericCellValue());
                            tdocbInfo.setwEAve(cells[18].getNumericCellValue());
//                            System.out.println("起始日期"+ HSSFDateUtil.isCellDateFormatted(cells[14]));
//                            System.out.println("单元格类型id"+cells[14].getCellStyle().getDataFormat());
//                            System.out.println("单元格格式"+cells[14].getCellType()+" "+cells[14].toString());
//                            System.out.println("日期"+date1);
                        }
                        if(tdocbInfo.getStationId()!=null) {
                            count++;
                            tdocbService.addTdocb(tdocbInfo);  //保存到数据库
                        }
                    }
                    if(count==RowNum) {
                        buffer.add("上传完成！");
                    }
                    upLoadFlag();
                }
                jsonObject.put("count","共计"+RowNum+"条数据，导入成功"+count+"条数据，导入失败"+(RowNum-count)+"条");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        jsonObject.put("code",code);
        jsonObject.put("message",buffer.toString());
        return jsonObject;
    }

//    传递上传文件的进度标志flag
    @ResponseBody
    @RequestMapping("/flag")
    public JSONObject upLoadFlag() {
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
