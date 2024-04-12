package com.mobisys.building.api.importdata;

import com.mobisys.building.entity.*;
import com.mobisys.building.service.*;
import net.sf.json.JSONObject;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.formula.functions.T;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.StringJoiner;

/**
 * 导入冬夏季典型设计气象日参数
 * //    sheet0-4是暖通表2，对应冬季供暖室外计算参数
 * //    sheet5-9是暖通表3，对应冬季空调室外计算参数
 * //    sheet10-28是暖通表4，对应夏季空调室外计算参数
 * //    sheet29-40是暖通表5，对应夏季除湿室外计算参数
 * //    sheet41-52是暖通表6，对应冬季加湿室外计算参数
 * //    sheet53-61是暖通表7，对应夏季新风计算室外计算参数
 * //    sheet62-70是暖通表8，对应冬季新风计算室外计算参数
 */
@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping("/importWinSumTypicalDesignDay")
public class ImportWinSumTypicalDesignDay {
    @Autowired
    TypWinHeatParamService typWinHeatParamService;
    @Autowired
    TypWinHeatTimeService typWinHeatTimeService;
    @Autowired
    TypWinAirParamService typWinAirParamService;
    @Autowired
    TypWinAirTimeService typWinAirTimeService;
    @Autowired
    TypicalSummerAirconditionerParamService typicalSummerAirconditionerParamService;
    @Autowired
    TypicalSummerAirconditionerTimeService typicalSummerAirconditionerTimeService;
    @Autowired
    TypicalSummerDehumidificationTimeService typicalSummerDehumidificationTimeService;
    @Autowired
    TypicalSummerDehumidificationParamService typicalSummerDehumidificationParamService;
    @Autowired
    OcpWahumService ocpWahumService;
    @Autowired
    OcpWahtService ocpWahtService;
    @Autowired
    SummerNewWindParamService summerNewWindParamService;
    @Autowired
    SummerNewWindTimeService summerNewWindTimeService;
    @Autowired
    WinterNewWindParamService winterNewWindParamService;
    @Autowired
    WinterNewWindTimeService winterNewWindTimeService;
//    flag1对应暖通表2的进度标志;flag2对应暖通表3的进度标志
    private double flag1=0;
    private double flag2=0;
    private double flag3=0;
    private double flag4=0;
    private double flag5=0;
    private double flag6=0;
    private double flag7=0;
//  导入暖通表2，对应数据库t_typical_winter_heating_param和t_typical_winter_heating_time
    @ResponseBody
    @RequestMapping("/uploadTypWinHeat")
    public JSONObject uploadTypWinHeat(@RequestParam("file")MultipartFile file,String name) {
        JSONObject jsonObject=new JSONObject();
        StringJoiner buffer=new StringJoiner("\n");
        int code=0,count=0;
        try{
            if(name!=null) {
                Workbook workbook=null;
                InputStream inputStream=file.getInputStream();
                if(isExcel2003(name)) {
                    workbook=new HSSFWorkbook(inputStream);
                }else if(isExcel2007(name)) {
                    workbook=new XSSFWorkbook(inputStream);
                }
                int AllRowNum=0;
                int sheetNum=workbook.getNumberOfSheets();
//                sheet0-4是暖通表2，对应冬季供暖室外计算参数

                for(int i=0;i<sheetNum;i++) {
                    if(flag1<100) {
                        double d=(double)100/sheetNum;
                        flag1+=d;
                    }else {
                        flag1=100;
                    }
                    Sheet sheet=workbook.getSheetAt(i);
                    if(i==(sheetNum-1)) {
                        TypWinHeatParamInfo typWinHeatParamInfo=new TypWinHeatParamInfo();

                        int RowNum=sheet.getLastRowNum();
                        AllRowNum+=RowNum;
                        for(int j=1;j<=RowNum;j++) {
                            int flag = 0;
                            Cell[] cells=new Cell[4];
                            Row row=sheet.getRow(j);
                            for (int k=0;k<cells.length;k++) {
                                cells[k]=row.getCell(k);
                            }
                            if(cells[0].getCellType() != CellType.NUMERIC){
                                System.out.println("已无实际数据");
                                break;
                            }
                            if(cells[0]!=null&&cells[0].getCellType()== CellType.NUMERIC) {
                                TypWinHeatParamInfo typWinHeatParamInfo1= typWinHeatParamService.getTypWinHeatParamById((int)cells[0].getNumericCellValue());
                                if (typWinHeatParamInfo1!=null){
                                    typWinHeatParamInfo = typWinHeatParamInfo1;
                                    flag = 1;
                                }
                                typWinHeatParamInfo.setStationId((int)cells[0].getNumericCellValue());
                            }else {
                                buffer.add("sheet1的第"+i+"行出错，已忽略该行。");
                            }
                            typWinHeatParamInfo.setStationId((int)cells[0].getNumericCellValue());
                            typWinHeatParamInfo.setParam1(cells[1].getNumericCellValue());
                            typWinHeatParamInfo.setParam2(cells[2].getNumericCellValue());
                            typWinHeatParamInfo.setParam3(cells[3].getNumericCellValue());
                            if(typWinHeatParamInfo.getStationId()!=null&& flag == 0) {
                                typWinHeatParamService.addTypWinHeatParam(typWinHeatParamInfo);
                                count++;
                            }else if (typWinHeatParamInfo != null && flag == 1) {
                                System.out.println(cells[0]);
                                typWinHeatParamService.updateTypWinHeatParam(typWinHeatParamInfo);
                                count++;
                            }
                        }
                    }else {
                        TypWinHeatTimeInfo typWinHeatTimeInfo=new TypWinHeatTimeInfo();
                        int RowNum=sheet.getLastRowNum();
                        AllRowNum+=RowNum;
                        for (int j=1;j<=RowNum;j++){
                            int flag = 0;
                            Cell[] cells=new Cell[26];
                            Row row=sheet.getRow(j);
                            for(int k=0;k<cells.length;k++) {
                                cells[k]=row.getCell(k);
                            }

                            if(cells[0].getCellType() != CellType.NUMERIC){
                                System.out.println("已无实际数据");
                                break;
                            }
                            if(cells[0]!=null&&cells[0].getCellType()== CellType.NUMERIC) {
                                //TypWinHeatTimeInfo typWinHeatTimeInfo1= typWinHeatTimeService.getTypWinHeatTimeById((int)cells[0].getNumericCellValue()).get(0);
                                if(typWinHeatTimeService.getTypWinHeatTimeByIT((int)cells[0].getNumericCellValue(),i+1).size()!=0){
                                    TypWinHeatTimeInfo typWinHeatTimeInfo1= typWinHeatTimeService.getTypWinHeatTimeByIT((int)cells[0].getNumericCellValue(),i+1).get(0);
                                    if (typWinHeatTimeInfo1!=null){
                                        typWinHeatTimeInfo = typWinHeatTimeInfo1;
                                        flag = 1;
                                    }
                                }
                                typWinHeatTimeInfo.setStationId((int)cells[0].getNumericCellValue());
                            }else {
                                buffer.add("sheet1的第"+i+"行出错，已忽略该行。");
                            }
                            //typWinHeatTimeInfo.setStationId((int)cells[0].getNumericCellValue());
                            typWinHeatTimeInfo.setParamType(i+1);
                            typWinHeatTimeInfo.setT1(cells[2].getNumericCellValue());
                            typWinHeatTimeInfo.setT2(cells[3].getNumericCellValue());
                            typWinHeatTimeInfo.setT3(cells[4].getNumericCellValue());
                            typWinHeatTimeInfo.setT4(cells[5].getNumericCellValue());
                            typWinHeatTimeInfo.setT5(cells[6].getNumericCellValue());
                            typWinHeatTimeInfo.setT6(cells[7].getNumericCellValue());
                            typWinHeatTimeInfo.setT7(cells[8].getNumericCellValue());
                            typWinHeatTimeInfo.setT8(cells[9].getNumericCellValue());
                            typWinHeatTimeInfo.setT9(cells[10].getNumericCellValue());
                            typWinHeatTimeInfo.setT10(cells[11].getNumericCellValue());
                            typWinHeatTimeInfo.setT11(cells[12].getNumericCellValue());
                            typWinHeatTimeInfo.setT12(cells[13].getNumericCellValue());
                            typWinHeatTimeInfo.setT13(cells[14].getNumericCellValue());
                            typWinHeatTimeInfo.setT14(cells[15].getNumericCellValue());
                            typWinHeatTimeInfo.setT15(cells[16].getNumericCellValue());
                            typWinHeatTimeInfo.setT16(cells[17].getNumericCellValue());
                            typWinHeatTimeInfo.setT17(cells[18].getNumericCellValue());
                            typWinHeatTimeInfo.setT18(cells[19].getNumericCellValue());
                            typWinHeatTimeInfo.setT19(cells[20].getNumericCellValue());
                            typWinHeatTimeInfo.setT20(cells[21].getNumericCellValue());
                            typWinHeatTimeInfo.setT21(cells[22].getNumericCellValue());
                            typWinHeatTimeInfo.setT22(cells[23].getNumericCellValue());
                            typWinHeatTimeInfo.setT23(cells[24].getNumericCellValue());
                            typWinHeatTimeInfo.setT24(cells[25].getNumericCellValue());
                            if(typWinHeatTimeInfo!=null&& flag == 0) {
                                count++;
                                typWinHeatTimeService.addTypWinHeatTime(typWinHeatTimeInfo);
                            }else if (typWinHeatTimeInfo != null && flag == 1) {
                                System.out.println(cells[0]);
                                typWinHeatTimeService.updateTypWinHeatTime(typWinHeatTimeInfo);
                                count++;
                            }
                        }
                    }
                }
                upLoadFlag1();
                jsonObject.put("count", "共计" + AllRowNum + "条数据，导入成功" + count + "条数据，导入失败" + (AllRowNum - count) + "条");
                buffer.add("上传成功");

            }
        }catch (Exception e) {
            e.printStackTrace();
        }
        jsonObject.put("code",code);
        jsonObject.put("message",buffer.toString());
        return jsonObject;
    }
    //    传递冬季供暖上传文件的进度标志flag
    @ResponseBody
    @RequestMapping("/flag1")
    public JSONObject upLoadFlag1() {
        JSONObject jsonObject=new JSONObject();
        if(Math.round(flag1) ==100) {
            jsonObject.put("code",1);
        }
        jsonObject.put("flag",Math.round(flag1));
        return jsonObject;
    }
//    导入暖通表3，对应数据库t_typical_winter_airconditioner_param和t_typical_winter_airconditioner_time
    @ResponseBody
    @RequestMapping("/uploadTrpWinAir")
    public JSONObject uploadTrpWinAir(@RequestParam("file") MultipartFile file,String name) {
        JSONObject jsonObject=new JSONObject();
        StringJoiner buffer=new StringJoiner("\n");
        int code=0,count=0;
        try{
            if(name!=null) {
                Workbook workbook=null;
                InputStream inputStream=file.getInputStream();
                if(isExcel2003(name)) {
                    workbook=new HSSFWorkbook(inputStream);
                }else if(isExcel2007(name)) {
                    workbook=new XSSFWorkbook(inputStream);
                }
                int AllRowNum=0;
                int sheetNum=workbook.getNumberOfSheets();
//                sheet5-9是暖通表3，对应冬季空调室外计算参数
                for(int i=0;i<sheetNum;i++) {
                    if(flag2<100) {
                        double d=(double)100/sheetNum;
                        flag2+=d;
                    }else {
                        flag2=100;
                    }
                    Sheet sheet=workbook.getSheetAt(i);
                    if(i==(sheetNum-1)) {
                        TypWinAirParamInfo typWinAirParamInfo=new TypWinAirParamInfo();
                        int RowNum=sheet.getLastRowNum();
                        AllRowNum+=RowNum;
                        for(int j=1;j<=RowNum;j++) {
                            int flag = 0;
                            Cell[] cells=new Cell[4];
                            Row row=sheet.getRow(j);
                            for (int k=0;k<cells.length;k++) {
                                cells[k]=row.getCell(k);
                            }
                            if(cells[0].getCellType() != CellType.NUMERIC){
                                System.out.println("已无实际数据");
                                break;
                            }
                            if(cells[0]!=null&&cells[0].getCellType()== CellType.NUMERIC) {
                                TypWinAirParamInfo typWinAirParamInfo1= typWinAirParamService.getTypWinAirParamById((int)cells[0].getNumericCellValue());
                                if (typWinAirParamInfo1!=null){
                                    typWinAirParamInfo = typWinAirParamInfo1;
                                    flag = 1;
                                }
                                typWinAirParamInfo.setStationId((int)cells[0].getNumericCellValue());
                            }else {
                                buffer.add("sheet1的第"+i+"行出错，已忽略该行。");
                            }
                            typWinAirParamInfo.setStationId((int)cells[0].getNumericCellValue());
                            typWinAirParamInfo.setParam1(cells[1].getNumericCellValue());
                            typWinAirParamInfo.setParam2(cells[2].getNumericCellValue());
                            typWinAirParamInfo.setParam3(cells[3].getNumericCellValue());
                            if(typWinAirParamInfo!=null&&flag == 0) {
                                typWinAirParamService.addTypWinAirParam(typWinAirParamInfo);
                                count++;
                            }
                            else if (typWinAirParamInfo != null && flag == 1) {
                                System.out.println(cells[0]);
                                typWinAirParamService.updateTypWinAirParam(typWinAirParamInfo);
                                count++;
                            }
                        }
                    }else {
                        TypWinAirTimeInfo typWinAirTimeInfo=new TypWinAirTimeInfo();
                        int RowNum=sheet.getLastRowNum();
                        AllRowNum+=RowNum;
                        for (int j=1;j<=RowNum;j++){
                            int flag = 0;
                            Cell[] cells=new Cell[26];
                            Row row=sheet.getRow(j);
                            for(int k=0;k<cells.length;k++) {
                                cells[k]=row.getCell(k);
                            }
                            if(cells[0].getCellType() != CellType.NUMERIC){
                                System.out.println("已无实际数据");
                                break;
                            }
                            if(cells[0]!=null&&cells[0].getCellType()== CellType.NUMERIC) {
                                if(typWinAirTimeService.getTypWinAirTimeByIT((int)cells[0].getNumericCellValue(),i+1).size()!=0){
                                    TypWinAirTimeInfo typWinAirTimeInfo1= typWinAirTimeService.getTypWinAirTimeByIT((int)cells[0].getNumericCellValue(),i+1).get(0);
                                    if (typWinAirTimeInfo1!=null){
                                        typWinAirTimeInfo = typWinAirTimeInfo1;
                                        flag = 1;
                                    }
                                }
                                typWinAirTimeInfo.setStationId((int)cells[0].getNumericCellValue());
                            }else {
                                buffer.add("sheet1的第"+i+"行出错，已忽略该行。");
                            }
                            typWinAirTimeInfo.setStationId((int)cells[0].getNumericCellValue());
                            typWinAirTimeInfo.setParamType(i+1);
                            typWinAirTimeInfo.setT1(cells[2].getNumericCellValue());
                            typWinAirTimeInfo.setT2(cells[3].getNumericCellValue());
                            typWinAirTimeInfo.setT3(cells[4].getNumericCellValue());
                            typWinAirTimeInfo.setT4(cells[5].getNumericCellValue());
                            typWinAirTimeInfo.setT5(cells[6].getNumericCellValue());
                            typWinAirTimeInfo.setT6(cells[7].getNumericCellValue());
                            typWinAirTimeInfo.setT7(cells[8].getNumericCellValue());
                            typWinAirTimeInfo.setT8(cells[9].getNumericCellValue());
                            typWinAirTimeInfo.setT9(cells[10].getNumericCellValue());
                            typWinAirTimeInfo.setT10(cells[11].getNumericCellValue());
                            typWinAirTimeInfo.setT11(cells[12].getNumericCellValue());
                            typWinAirTimeInfo.setT12(cells[13].getNumericCellValue());
                            typWinAirTimeInfo.setT13(cells[14].getNumericCellValue());
                            typWinAirTimeInfo.setT14(cells[15].getNumericCellValue());
                            typWinAirTimeInfo.setT15(cells[16].getNumericCellValue());
                            typWinAirTimeInfo.setT16(cells[17].getNumericCellValue());
                            typWinAirTimeInfo.setT17(cells[18].getNumericCellValue());
                            typWinAirTimeInfo.setT18(cells[19].getNumericCellValue());
                            typWinAirTimeInfo.setT19(cells[20].getNumericCellValue());
                            typWinAirTimeInfo.setT20(cells[21].getNumericCellValue());
                            typWinAirTimeInfo.setT21(cells[22].getNumericCellValue());
                            typWinAirTimeInfo.setT22(cells[23].getNumericCellValue());
                            typWinAirTimeInfo.setT23(cells[24].getNumericCellValue());
                            typWinAirTimeInfo.setT24(cells[25].getNumericCellValue());
                            if(typWinAirTimeInfo!=null&&flag == 0) {
                                typWinAirTimeService.addTypWinAirTime(typWinAirTimeInfo);
                                count++;
                            }else if (typWinAirTimeInfo != null && flag == 1) {
                                System.out.println(cells[0]);
                                typWinAirTimeService.updateTypWinAirTime(typWinAirTimeInfo);
                                count++;
                            }
                        }
                    }
                }
                upLoadFlag2();
                jsonObject.put("count", "共计" + AllRowNum + "条数据，导入成功" + count + "条数据，导入失败" + (AllRowNum - count) + "条");
                buffer.add("上传成功");


            }
        }catch (Exception e) {
            e.printStackTrace();
        }
        jsonObject.put("code",code);
        jsonObject.put("message",buffer.toString());
        return jsonObject;
    }
    //    传递冬季空调上传文件的进度标志flag2
    @ResponseBody
    @RequestMapping("/flag2")
    public JSONObject upLoadFlag2() {
        JSONObject jsonObject=new JSONObject();
        if(Math.round(flag2) ==100) {
            jsonObject.put("code",1);
        }
        jsonObject.put("flag",Math.round(flag2));
        return jsonObject;
    }
    //上传夏季空调参数，对应数据库t_typical_summer_airconditioner_time和t_typical_summer_airconditioner_param
    @ResponseBody
    @RequestMapping("/uploadTSAT")
    public JSONObject uploadTSAT(@RequestParam("file")MultipartFile file,String name) {
        JSONObject jsonObject=new JSONObject();
        StringJoiner buffer=new StringJoiner("\n");
        int code=0,count=0;
        try{
            if(name!=null) {
                Workbook workbook=null;
                InputStream inputStream=file.getInputStream();
                if(isExcel2003(name)) {
                    workbook=new HSSFWorkbook(inputStream);
                }else if(isExcel2007(name)) {
                    workbook=new XSSFWorkbook(inputStream);
                }
                int AllRowNum=0;
                int sheetNum=workbook.getNumberOfSheets();


                for(int i=0;i<sheetNum;i++) {
                    if(flag3<100) {
                        double d=(double)100/sheetNum;
                        flag3+=d;
                    }else {
                        flag3=100;
                    }
                    Sheet sheet=workbook.getSheetAt(i);
                    if(i==(sheetNum-1)) {
                        TypicalSummerAirconditionerParamInfo typicalSummerAirconditionerParamInfo=new TypicalSummerAirconditionerParamInfo();
                        int RowNum=sheet.getLastRowNum();
                        AllRowNum+=RowNum;
                        for(int j=1;j<=RowNum;j++) {
                            int flag = 0;
                            Cell[] cells=new Cell[10];
                            Row row=sheet.getRow(j);
                            for (int k=0;k<cells.length;k++) {
                                cells[k]=row.getCell(k);
                            }
                            if(cells[0].getCellType() != CellType.NUMERIC){
                                System.out.println("已无实际数据");
                                break;
                            }
                            if(cells[0]!=null&&cells[0].getCellType()== CellType.NUMERIC) {
                                if(typicalSummerAirconditionerParamService.findTSAPById((int)cells[0].getNumericCellValue()).size()!=0){
                                    TypicalSummerAirconditionerParamInfo typicalSummerAirconditionerParamInfo1= typicalSummerAirconditionerParamService.findTSAPById((int)cells[0].getNumericCellValue()).get(0);
                                    if (typicalSummerAirconditionerParamInfo1!=null){
                                        typicalSummerAirconditionerParamInfo = typicalSummerAirconditionerParamInfo1;
                                        flag = 1;
                                    }
                                }
                                typicalSummerAirconditionerParamInfo.setStationId((int)cells[0].getNumericCellValue());
                            }else {
                                buffer.add("sheet1的第"+i+"行出错，已忽略该行。");
                            }
                            typicalSummerAirconditionerParamInfo.setStationId((int)cells[0].getNumericCellValue());
                            typicalSummerAirconditionerParamInfo.setParam1(cells[1].getNumericCellValue());
                            typicalSummerAirconditionerParamInfo.setParam2(cells[2].getNumericCellValue());
                            typicalSummerAirconditionerParamInfo.setParam3(cells[3].getNumericCellValue());
                            typicalSummerAirconditionerParamInfo.setParam4(cells[4].getNumericCellValue());
                            typicalSummerAirconditionerParamInfo.setParam5(cells[5].getNumericCellValue());
                            typicalSummerAirconditionerParamInfo.setParam6(cells[6].getNumericCellValue());
                            typicalSummerAirconditionerParamInfo.setParam7(cells[7].getNumericCellValue());
                            typicalSummerAirconditionerParamInfo.setParam8(cells[8].getNumericCellValue());
                            typicalSummerAirconditionerParamInfo.setParam9(cells[9].getNumericCellValue());
                            if(typicalSummerAirconditionerParamInfo!=null&& flag == 0) {
                                typicalSummerAirconditionerParamService.addTypicalSummerAirconditionerParam(typicalSummerAirconditionerParamInfo);
                                count++;
                            }else if (typicalSummerAirconditionerParamInfo != null && flag == 1) {
                                System.out.println(cells[0]);
                                typicalSummerAirconditionerParamService.updateTypicalSummerAirconditionerParam(typicalSummerAirconditionerParamInfo);
                                count++;
                            }
                        }
                    }else {
                        TypicalSummerAirconditionerTimeInfo typicalSummerAirconditionerTimeInfo=new TypicalSummerAirconditionerTimeInfo();
                        int RowNum=sheet.getLastRowNum();
                        AllRowNum+=RowNum;
                        for (int j=1;j<=RowNum;j++){
                            int flag = 0;
                            Cell[] cells=new Cell[26];
                            Row row=sheet.getRow(j);
                            for(int k=0;k<cells.length;k++) {
                                cells[k]=row.getCell(k);
                            }

                            if(cells[0].getCellType() != CellType.NUMERIC){
                                System.out.println("已无实际数据");
                                break;
                            }
                            if(cells[0]!=null&&cells[0].getCellType()== CellType.NUMERIC) {
                                //TypWinHeatTimeInfo typWinHeatTimeInfo1= typWinHeatTimeService.getTypWinHeatTimeById((int)cells[0].getNumericCellValue()).get(0);
                                if(typicalSummerAirconditionerTimeService.findTSATByIT((int)cells[0].getNumericCellValue(),i+1).size()!=0){
                                    TypicalSummerAirconditionerTimeInfo typicalSummerAirconditionerTimeInfo1= typicalSummerAirconditionerTimeService.findTSATByIT((int)cells[0].getNumericCellValue(),i+1).get(0);
                                    if (typicalSummerAirconditionerTimeInfo1!=null){
                                        typicalSummerAirconditionerTimeInfo = typicalSummerAirconditionerTimeInfo1;
                                        flag = 1;
                                    }
                                }
                                typicalSummerAirconditionerTimeInfo.setStationId((int)cells[0].getNumericCellValue());
                            }else {
                                buffer.add("sheet1的第"+i+"行出错，已忽略该行。");
                            }
                            //typWinHeatTimeInfo.setStationId((int)cells[0].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setParamType(i+1);
                            typicalSummerAirconditionerTimeInfo.setT1(cells[2].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT2(cells[3].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT3(cells[4].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT4(cells[5].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT5(cells[6].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT6(cells[7].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT7(cells[8].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT8(cells[9].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT9(cells[10].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT10(cells[11].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT11(cells[12].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT12(cells[13].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT13(cells[14].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT14(cells[15].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT15(cells[16].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT16(cells[17].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT17(cells[18].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT18(cells[19].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT19(cells[20].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT20(cells[21].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT21(cells[22].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT22(cells[23].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT23(cells[24].getNumericCellValue());
                            typicalSummerAirconditionerTimeInfo.setT24(cells[25].getNumericCellValue());
                            if(typicalSummerAirconditionerTimeInfo!=null&& flag == 0) {
                                count++;
                                typicalSummerAirconditionerTimeService.addTypicalSummerAirconditionerTime(typicalSummerAirconditionerTimeInfo);
                            }else if (typicalSummerAirconditionerTimeInfo != null && flag == 1) {
                                System.out.println(cells[0]);
                                typicalSummerAirconditionerTimeService.updateTypicalSummerAirconditionerTime(typicalSummerAirconditionerTimeInfo);
                                count++;
                            }
                        }
                    }
                }
                upLoadFlag3();
                jsonObject.put("count", "共计" + AllRowNum + "条数据，导入成功" + count + "条数据，导入失败" + (AllRowNum - count) + "条");
                buffer.add("上传成功");

            }
        }catch (Exception e) {
            e.printStackTrace();
        }
        jsonObject.put("code",code);
        jsonObject.put("message",buffer.toString());
        return jsonObject;
    }
    //    传递冬季供暖上传文件的进度标志flag
    @ResponseBody
    @RequestMapping("/flag3")
    public JSONObject upLoadFlag3() {
        JSONObject jsonObject=new JSONObject();
        if(Math.round(flag3) ==100) {
            jsonObject.put("code",1);
        }
        jsonObject.put("flag",Math.round(flag3));
        return jsonObject;
    }
    //上传夏季除湿参数，对应数据库t_typical_summer_airconditioner_time和t_typical_summer_airconditioner_param
    @ResponseBody
    @RequestMapping("/uploadtsd")
    public JSONObject uploadtsd(@RequestParam("file")MultipartFile file,String name) {
        JSONObject jsonObject=new JSONObject();
        StringJoiner buffer=new StringJoiner("\n");
        int code=0,count=0;
        try{
            if(name!=null) {
                Workbook workbook=null;
                InputStream inputStream=file.getInputStream();
                if(isExcel2003(name)) {
                    workbook=new HSSFWorkbook(inputStream);
                }else if(isExcel2007(name)) {
                    workbook=new XSSFWorkbook(inputStream);
                }
                int AllRowNum=0;
                int sheetNum=workbook.getNumberOfSheets();


                for(int i=0;i<sheetNum;i++) {
                    if(flag4<100) {
                        double d=(double)100/sheetNum;
                        flag4+=d;
                    }else {
                        flag4=100;
                    }
                    Sheet sheet=workbook.getSheetAt(i);
                    if(i==(sheetNum-1)) {
                        TypicalSummerDehumidificationParamInfo typicalSummerDehumidificationParamInfo=new TypicalSummerDehumidificationParamInfo();
                        int RowNum=sheet.getLastRowNum();
                        AllRowNum+=RowNum;
                        for(int j=1;j<=RowNum;j++) {
                            int flag = 0;
                            Cell[] cells=new Cell[10];
                            Row row=sheet.getRow(j);
                            for (int k=0;k<cells.length;k++) {
                                cells[k]=row.getCell(k);
                            }
                            if(cells[0].getCellType() != CellType.NUMERIC){
                                System.out.println("已无实际数据");
                                break;
                            }
                            if(cells[0]!=null&&cells[0].getCellType()== CellType.NUMERIC) {
                                if(typicalSummerDehumidificationParamService.findTSDPById((int)cells[0].getNumericCellValue()).size()!=0){
                                    TypicalSummerDehumidificationParamInfo typicalSummerDehumidificationParamInfo1= typicalSummerDehumidificationParamService.findTSDPById((int)cells[0].getNumericCellValue()).get(0);
                                    if (typicalSummerDehumidificationParamInfo1!=null){
                                        typicalSummerDehumidificationParamInfo = typicalSummerDehumidificationParamInfo1;
                                        flag = 1;
                                    }
                                }
                                typicalSummerDehumidificationParamInfo.setStationId((int)cells[0].getNumericCellValue());
                            }else {
                                buffer.add("sheet1的第"+i+"行出错，已忽略该行。");
                            }
                            typicalSummerDehumidificationParamInfo.setStationId((int)cells[0].getNumericCellValue());
                            typicalSummerDehumidificationParamInfo.setParam1(cells[1].getNumericCellValue());
                            typicalSummerDehumidificationParamInfo.setParam2(cells[2].getNumericCellValue());
                            typicalSummerDehumidificationParamInfo.setParam3(cells[3].getNumericCellValue());
                            typicalSummerDehumidificationParamInfo.setParam4(cells[4].getNumericCellValue());
                            typicalSummerDehumidificationParamInfo.setParam5(cells[5].getNumericCellValue());
                            typicalSummerDehumidificationParamInfo.setParam6(cells[6].getNumericCellValue());
                            typicalSummerDehumidificationParamInfo.setParam7(cells[7].getNumericCellValue());
                            typicalSummerDehumidificationParamInfo.setParam8(cells[8].getNumericCellValue());
                            typicalSummerDehumidificationParamInfo.setParam9(cells[9].getNumericCellValue());
                            if(typicalSummerDehumidificationParamInfo!=null&& flag == 0) {
                                typicalSummerDehumidificationParamService.addTypicalSummerDehumidificationParam(typicalSummerDehumidificationParamInfo);
                                count++;
                            }else if (typicalSummerDehumidificationParamInfo != null && flag == 1) {
                                System.out.println(cells[0]);
                                typicalSummerDehumidificationParamService.updateTypicalSummerDehumidificationParam(typicalSummerDehumidificationParamInfo);
                                count++;
                            }
                        }
                    }else {
                        TypicalSummerDehumidificationTimeInfo typicalSummerDehumidificationTimeInfo=new TypicalSummerDehumidificationTimeInfo();
                        int RowNum=sheet.getLastRowNum();
                        AllRowNum+=RowNum;
                        for (int j=1;j<=RowNum;j++){
                            int flag = 0;
                            Cell[] cells=new Cell[26];
                            Row row=sheet.getRow(j);
                            for(int k=0;k<cells.length;k++) {
                                cells[k]=row.getCell(k);
                            }

                            if(cells[0].getCellType() != CellType.NUMERIC){
                                System.out.println("已无实际数据");
                                break;
                            }
                            if(cells[0]!=null&&cells[0].getCellType()== CellType.NUMERIC) {
                                //TypWinHeatTimeInfo typWinHeatTimeInfo1= typWinHeatTimeService.getTypWinHeatTimeById((int)cells[0].getNumericCellValue()).get(0);
                                if(typicalSummerDehumidificationTimeService.findTSDTByIT((int)cells[0].getNumericCellValue(),i+1).size()!=0){
                                    TypicalSummerDehumidificationTimeInfo typicalSummerDehumidificationTimeInfo1= typicalSummerDehumidificationTimeService.findTSDTByIT((int)cells[0].getNumericCellValue(),i+1).get(0);
                                    if (typicalSummerDehumidificationTimeInfo1!=null){
                                        typicalSummerDehumidificationTimeInfo = typicalSummerDehumidificationTimeInfo1;
                                        flag = 1;
                                    }
                                }
                                typicalSummerDehumidificationTimeInfo.setStationId((int)cells[0].getNumericCellValue());
                            }else {
                                buffer.add("sheet1的第"+i+"行出错，已忽略该行。");
                            }
                            //typWinHeatTimeInfo.setStationId((int)cells[0].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setParamType(i+1);
                            typicalSummerDehumidificationTimeInfo.setT1(cells[2].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT2(cells[3].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT3(cells[4].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT4(cells[5].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT5(cells[6].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT6(cells[7].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT7(cells[8].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT8(cells[9].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT9(cells[10].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT10(cells[11].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT11(cells[12].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT12(cells[13].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT13(cells[14].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT14(cells[15].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT15(cells[16].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT16(cells[17].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT17(cells[18].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT18(cells[19].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT19(cells[20].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT20(cells[21].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT21(cells[22].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT22(cells[23].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT23(cells[24].getNumericCellValue());
                            typicalSummerDehumidificationTimeInfo.setT24(cells[25].getNumericCellValue());
                            if(typicalSummerDehumidificationTimeInfo!=null&& flag == 0) {
                                count++;
                                typicalSummerDehumidificationTimeService.addTypicalSummerDehumidificationTime(typicalSummerDehumidificationTimeInfo);
                            }else if (typicalSummerDehumidificationTimeInfo != null && flag == 1) {
                                System.out.println(cells[0]);
                                typicalSummerDehumidificationTimeService.updateTypicalSummerDehumidificationTime(typicalSummerDehumidificationTimeInfo);
                                count++;
                            }
                        }
                    }
                }
                upLoadFlag4();
                jsonObject.put("count", "共计" + AllRowNum + "条数据，导入成功" + count + "条数据，导入失败" + (AllRowNum - count) + "条");
                buffer.add("上传成功");

            }
        }catch (Exception e) {
            e.printStackTrace();
        }
        jsonObject.put("code",code);
        jsonObject.put("message",buffer.toString());
        return jsonObject;
    }
    //    传递冬季供暖上传文件的进度标志flag
    @ResponseBody
    @RequestMapping("/flag4")
    public JSONObject upLoadFlag4() {
        JSONObject jsonObject=new JSONObject();
        if(Math.round(flag4) ==100) {
            jsonObject.put("code",1);
        }
        jsonObject.put("flag",Math.round(flag4));
        return jsonObject;
    }
    //上传冬季加湿参数，对应数据库t_typical_summer_airconditioner_time和t_typical_summer_airconditioner_param
    @ResponseBody
    @RequestMapping("/uploadopcWahum")
    public JSONObject uploadopcWahum(@RequestParam("file")MultipartFile file,String name) {
        JSONObject jsonObject=new JSONObject();
        StringJoiner buffer=new StringJoiner("\n");
        int code=0,count=0;
        try{
            if(name!=null) {
                Workbook workbook=null;
                InputStream inputStream=file.getInputStream();
                if(isExcel2003(name)) {
                    workbook=new HSSFWorkbook(inputStream);
                }else if(isExcel2007(name)) {
                    workbook=new XSSFWorkbook(inputStream);
                }
                int AllRowNum=0;
                int sheetNum=workbook.getNumberOfSheets();


                for(int i=0;i<sheetNum;i++) {
                    if(flag5<100) {
                        double d=(double)100/sheetNum;
                        flag5+=d;
                    }else {
                        flag5=100;
                    }
                    Sheet sheet=workbook.getSheetAt(i);
                    if(i==(sheetNum-1)) {
                        OcpWaHumInfo ocpWaHumInfo=new OcpWaHumInfo();
                        int RowNum=sheet.getLastRowNum();
                        AllRowNum+=RowNum;
                        for(int j=1;j<=RowNum;j++) {
                            int flag = 0;
                            Cell[] cells=new Cell[10];
                            Row row=sheet.getRow(j);
                            for (int k=0;k<cells.length;k++) {
                                cells[k]=row.getCell(k);
                            }
                            if(cells[0].getCellType() != CellType.NUMERIC){
                                System.out.println("已无实际数据");
                                break;
                            }
                            if(cells[0]!=null&&cells[0].getCellType()== CellType.NUMERIC) {
                                if(ocpWahumService.queryWaHumById((int)cells[0].getNumericCellValue()).size()!=0){
                                    OcpWaHumInfo ocpWaHumInfo1= ocpWahumService.queryWaHumById((int)cells[0].getNumericCellValue()).get(0);
                                    if (ocpWaHumInfo1!=null){
                                        ocpWaHumInfo = ocpWaHumInfo1;
                                        flag = 1;
                                    }
                                }
                                ocpWaHumInfo.setStationId((int)cells[0].getNumericCellValue());
                            }else {
                                buffer.add("sheet1的第"+i+"行出错，已忽略该行。");
                            }
                            ocpWaHumInfo.setStationId((int)cells[0].getNumericCellValue());
                            ocpWaHumInfo.setParam1(cells[1].getNumericCellValue());
                            ocpWaHumInfo.setParam2(cells[2].getNumericCellValue());
                            ocpWaHumInfo.setParam3(cells[3].getNumericCellValue());
                            ocpWaHumInfo.setParam4(cells[4].getNumericCellValue());
                            ocpWaHumInfo.setParam5(cells[5].getNumericCellValue());
                            ocpWaHumInfo.setParam6(cells[6].getNumericCellValue());
                            ocpWaHumInfo.setParam7(cells[7].getNumericCellValue());
                            ocpWaHumInfo.setParam8(cells[8].getNumericCellValue());
                            ocpWaHumInfo.setParam9(cells[9].getNumericCellValue());
                            if(ocpWaHumInfo!=null&& flag == 0) {
                                ocpWahumService.addOcpWaHum(ocpWaHumInfo);
                                count++;
                            }else if (ocpWaHumInfo != null && flag == 1) {
                                System.out.println(cells[0]);
                                ocpWahumService.updateOcpWaHum(ocpWaHumInfo);
                                count++;
                            }
                        }
                    }else {
                        OcpWahtInfo ocpWahtInfo=new OcpWahtInfo();
                        int RowNum=sheet.getLastRowNum();
                        AllRowNum+=RowNum;
                        for (int j=1;j<=RowNum;j++){
                            int flag = 0;
                            Cell[] cells=new Cell[26];
                            Row row=sheet.getRow(j);
                            for(int k=0;k<cells.length;k++) {
                                cells[k]=row.getCell(k);
                            }

                            if(cells[0].getCellType() != CellType.NUMERIC){
                                System.out.println("已无实际数据");
                                break;
                            }
                            if(cells[0]!=null&&cells[0].getCellType()== CellType.NUMERIC) {
                                //TypWinHeatTimeInfo typWinHeatTimeInfo1= typWinHeatTimeService.getTypWinHeatTimeById((int)cells[0].getNumericCellValue()).get(0);
                                if(ocpWahtService.queryWahtByIT((int)cells[0].getNumericCellValue(),i+1).size()!=0){
                                    OcpWahtInfo ocpWahtInfo1= ocpWahtService.queryWahtByIT((int)cells[0].getNumericCellValue(),i+1).get(0);
                                    if (ocpWahtInfo1!=null){
                                        ocpWahtInfo = ocpWahtInfo1;
                                        flag = 1;
                                    }
                                }
                                ocpWahtInfo.setStationId((int)cells[0].getNumericCellValue());
                            }else {
                                buffer.add("sheet1的第"+i+"行出错，已忽略该行。");
                            }
                            //typWinHeatTimeInfo.setStationId((int)cells[0].getNumericCellValue());
                            ocpWahtInfo.setParamType(i+1);
                            ocpWahtInfo.setTime1(cells[2].getNumericCellValue());
                            ocpWahtInfo.setTime2(cells[3].getNumericCellValue());
                            ocpWahtInfo.setTime3(cells[4].getNumericCellValue());
                            ocpWahtInfo.setTime4(cells[5].getNumericCellValue());
                            ocpWahtInfo.setTime5(cells[6].getNumericCellValue());
                            ocpWahtInfo.setTime6(cells[7].getNumericCellValue());
                            ocpWahtInfo.setTime7(cells[8].getNumericCellValue());
                            ocpWahtInfo.setTime8(cells[9].getNumericCellValue());
                            ocpWahtInfo.setTime9(cells[10].getNumericCellValue());
                            ocpWahtInfo.setTime10(cells[11].getNumericCellValue());
                            ocpWahtInfo.setTime11(cells[12].getNumericCellValue());
                            ocpWahtInfo.setTime12(cells[13].getNumericCellValue());
                            ocpWahtInfo.setTime13(cells[14].getNumericCellValue());
                            ocpWahtInfo.setTime14(cells[15].getNumericCellValue());
                            ocpWahtInfo.setTime15(cells[16].getNumericCellValue());
                            ocpWahtInfo.setTime16(cells[17].getNumericCellValue());
                            ocpWahtInfo.setTime17(cells[18].getNumericCellValue());
                            ocpWahtInfo.setTime18(cells[19].getNumericCellValue());
                            ocpWahtInfo.setTime19(cells[20].getNumericCellValue());
                            ocpWahtInfo.setTime20(cells[21].getNumericCellValue());
                            ocpWahtInfo.setTime21(cells[22].getNumericCellValue());
                            ocpWahtInfo.setTime22(cells[23].getNumericCellValue());
                            ocpWahtInfo.setTime23(cells[24].getNumericCellValue());
                            ocpWahtInfo.setTime24(cells[25].getNumericCellValue());
                            if(ocpWahtInfo!=null&& flag == 0) {
                                count++;
                                ocpWahtService.addOcpWaht(ocpWahtInfo);
                            }else if (ocpWahtInfo != null && flag == 1) {
                                System.out.println(cells[0]);
                                ocpWahtService.updateOcpWaht(ocpWahtInfo);
                                count++;
                            }
                        }
                    }
                }
                upLoadFlag5();
                jsonObject.put("count", "共计" + AllRowNum + "条数据，导入成功" + count + "条数据，导入失败" + (AllRowNum - count) + "条");
                buffer.add("上传成功");

            }
        }catch (Exception e) {
            e.printStackTrace();
        }
        jsonObject.put("code",code);
        jsonObject.put("message",buffer.toString());
        return jsonObject;
    }
    //    传递冬季供暖上传文件的进度标志flag
    @ResponseBody
    @RequestMapping("/flag5")
    public JSONObject upLoadFlag5() {
        JSONObject jsonObject=new JSONObject();
        if(Math.round(flag5) ==100) {
            jsonObject.put("code",1);
        }
        jsonObject.put("flag",Math.round(flag5));
        return jsonObject;
    }
    //上传夏季新风参数
    @ResponseBody
    @RequestMapping("/uploadsummernewwind")
    public JSONObject uploadsummernewwind(@RequestParam("file")MultipartFile file,String name) {
        JSONObject jsonObject=new JSONObject();
        StringJoiner buffer=new StringJoiner("\n");
        int code=0,count=0;
        try{
            if(name!=null) {
                Workbook workbook=null;
                InputStream inputStream=file.getInputStream();
                if(isExcel2003(name)) {
                    workbook=new HSSFWorkbook(inputStream);
                }else if(isExcel2007(name)) {
                    workbook=new XSSFWorkbook(inputStream);
                }
                int AllRowNum=0;
                int sheetNum=workbook.getNumberOfSheets();


                for(int i=0;i<sheetNum;i++) {
                    if(flag6<100) {
                        double d=(double)100/sheetNum;
                        flag6+=d;
                    }else {
                        flag6=100;
                    }
                    Sheet sheet=workbook.getSheetAt(i);
                    if(i==(sheetNum-1)) {
                        SummerNewWindParamInfo summerNewWindParamInfo=new SummerNewWindParamInfo();
                        int RowNum=sheet.getLastRowNum();
                        AllRowNum+=RowNum;
                        for(int j=1;j<=RowNum;j++) {
                            int flag = 0;
                            Cell[] cells=new Cell[7];
                            Row row=sheet.getRow(j);
                            for (int k=0;k<cells.length;k++) {
                                cells[k]=row.getCell(k);
                            }
                            if(cells[0].getCellType() != CellType.NUMERIC){
                                System.out.println("已无实际数据");
                                break;
                            }
                            if(cells[0]!=null&&cells[0].getCellType()== CellType.NUMERIC) {
                                if(summerNewWindParamService.getSummerNewWindParamById((int)cells[0].getNumericCellValue()).size()!=0){
                                    SummerNewWindParamInfo summerNewWindParamInfo1= summerNewWindParamService.getSummerNewWindParamById((int)cells[0].getNumericCellValue()).get(0);
                                    if (summerNewWindParamInfo1!=null){
                                        summerNewWindParamInfo = summerNewWindParamInfo1;
                                        flag = 1;
                                    }
                                }
                                summerNewWindParamInfo.setStationId((int)cells[0].getNumericCellValue());
                            }else {
                                buffer.add("sheet1的第"+i+"行出错，已忽略该行。");
                            }
                            summerNewWindParamInfo.setStationId((int)cells[0].getNumericCellValue());
                            summerNewWindParamInfo.setParam1(cells[1].getNumericCellValue());
                            summerNewWindParamInfo.setParam2(cells[2].getNumericCellValue());
                            summerNewWindParamInfo.setParam3(cells[3].getNumericCellValue());
                            summerNewWindParamInfo.setParam4(cells[4].getNumericCellValue());
                            summerNewWindParamInfo.setParam5(cells[5].getNumericCellValue());
                            summerNewWindParamInfo.setParam6(cells[6].getNumericCellValue());

                            if(summerNewWindParamInfo!=null&& flag == 0) {
                                summerNewWindParamService.addSummerNewWindParam(summerNewWindParamInfo);
                                count++;
                            }else if (summerNewWindParamInfo != null && flag == 1) {
                                System.out.println(cells[0]);
                                summerNewWindParamService.updateSummerNewWindParam(summerNewWindParamInfo);
                                count++;
                            }
                        }
                    }else {
                        SummerNewWindTimeInfo summerNewWindTimeInfo=new SummerNewWindTimeInfo();
                        int RowNum=sheet.getLastRowNum();
                        AllRowNum+=RowNum;
                        for (int j=1;j<=RowNum;j++){
                            int flag = 0;
                            Cell[] cells=new Cell[26];
                            Row row=sheet.getRow(j);
                            for(int k=0;k<cells.length;k++) {
                                cells[k]=row.getCell(k);
                            }

                            if(cells[0].getCellType() != CellType.NUMERIC){
                                System.out.println("已无实际数据");
                                break;
                            }
                            if(cells[0]!=null&&cells[0].getCellType()== CellType.NUMERIC) {
                                //TypWinHeatTimeInfo typWinHeatTimeInfo1= typWinHeatTimeService.getTypWinHeatTimeById((int)cells[0].getNumericCellValue()).get(0);
                                if(summerNewWindTimeService.getSummerNewWindTimeByIT((int)cells[0].getNumericCellValue(),i+1).size()!=0){
                                    SummerNewWindTimeInfo summerNewWindTimeInfo1= summerNewWindTimeService.getSummerNewWindTimeByIT((int)cells[0].getNumericCellValue(),i+1).get(0);
                                    if (summerNewWindTimeInfo1!=null){
                                        summerNewWindTimeInfo = summerNewWindTimeInfo1;
                                        flag = 1;
                                    }
                                }
                                summerNewWindTimeInfo.setStationId((int)cells[0].getNumericCellValue());
                            }else {
                                buffer.add("sheet1的第"+i+"行出错，已忽略该行。");
                            }
                            //typWinHeatTimeInfo.setStationId((int)cells[0].getNumericCellValue());
                            summerNewWindTimeInfo.setParamType(i+1);
                            summerNewWindTimeInfo.setTime1(cells[2].getNumericCellValue());
                            summerNewWindTimeInfo.setTime2(cells[3].getNumericCellValue());
                            summerNewWindTimeInfo.setTime3(cells[4].getNumericCellValue());
                            summerNewWindTimeInfo.setTime4(cells[5].getNumericCellValue());
                            summerNewWindTimeInfo.setTime5(cells[6].getNumericCellValue());
                            summerNewWindTimeInfo.setTime6(cells[7].getNumericCellValue());
                            summerNewWindTimeInfo.setTime7(cells[8].getNumericCellValue());
                            summerNewWindTimeInfo.setTime8(cells[9].getNumericCellValue());
                            summerNewWindTimeInfo.setTime9(cells[10].getNumericCellValue());
                            summerNewWindTimeInfo.setTime10(cells[11].getNumericCellValue());
                            summerNewWindTimeInfo.setTime11(cells[12].getNumericCellValue());
                            summerNewWindTimeInfo.setTime12(cells[13].getNumericCellValue());
                            summerNewWindTimeInfo.setTime13(cells[14].getNumericCellValue());
                            summerNewWindTimeInfo.setTime14(cells[15].getNumericCellValue());
                            summerNewWindTimeInfo.setTime15(cells[16].getNumericCellValue());
                            summerNewWindTimeInfo.setTime16(cells[17].getNumericCellValue());
                            summerNewWindTimeInfo.setTime17(cells[18].getNumericCellValue());
                            summerNewWindTimeInfo.setTime18(cells[19].getNumericCellValue());
                            summerNewWindTimeInfo.setTime19(cells[20].getNumericCellValue());
                            summerNewWindTimeInfo.setTime20(cells[21].getNumericCellValue());
                            summerNewWindTimeInfo.setTime21(cells[22].getNumericCellValue());
                            summerNewWindTimeInfo.setTime22(cells[23].getNumericCellValue());
                            summerNewWindTimeInfo.setTime23(cells[24].getNumericCellValue());
                            summerNewWindTimeInfo.setTime24(cells[25].getNumericCellValue());
                            if(summerNewWindTimeInfo!=null&& flag == 0) {
                                count++;
                                summerNewWindTimeService.addSummerNewWindTime(summerNewWindTimeInfo);
                            }else if (summerNewWindTimeInfo != null && flag == 1) {
                                System.out.println(cells[0]);
                                summerNewWindTimeService.updateSummerNewWindTime(summerNewWindTimeInfo);
                                count++;
                            }
                        }
                    }
                }
                upLoadFlag6();
                jsonObject.put("count", "共计" + AllRowNum + "条数据，导入成功" + count + "条数据，导入失败" + (AllRowNum - count) + "条");
                buffer.add("上传成功");

            }
        }catch (Exception e) {
            e.printStackTrace();
        }
        jsonObject.put("code",code);
        jsonObject.put("message",buffer.toString());
        return jsonObject;
    }
    //    传递冬季供暖上传文件的进度标志flag
    @ResponseBody
    @RequestMapping("/flag6")
    public JSONObject upLoadFlag6() {
        JSONObject jsonObject=new JSONObject();
        if(Math.round(flag6) ==100) {
            jsonObject.put("code",1);
        }
        jsonObject.put("flag",Math.round(flag6));
        return jsonObject;
    }
    //上传冬季加湿参数，对应数据库t_typical_summer_airconditioner_time和t_typical_summer_airconditioner_param
    @ResponseBody
    @RequestMapping("/uploadwinternewwind")
    public JSONObject uploadwinternewwind(@RequestParam("file")MultipartFile file,String name) {
        JSONObject jsonObject=new JSONObject();
        StringJoiner buffer=new StringJoiner("\n");
        int code=0,count=0;
        try{
            if(name!=null) {
                Workbook workbook=null;
                InputStream inputStream=file.getInputStream();
                if(isExcel2003(name)) {
                    workbook=new HSSFWorkbook(inputStream);
                }else if(isExcel2007(name)) {
                    workbook=new XSSFWorkbook(inputStream);
                }
                int AllRowNum=0;
                int sheetNum=workbook.getNumberOfSheets();


                for(int i=0;i<sheetNum;i++) {
                    if(flag7<100) {
                        double d=(double)100/sheetNum;
                        flag7+=d;
                    }else {
                        flag7=100;
                    }
                    Sheet sheet=workbook.getSheetAt(i);
                    if(i==(sheetNum-1)) {
                        WinterNewWindParamInfo winterNewWindParamInfo=new WinterNewWindParamInfo();
                        int RowNum=sheet.getLastRowNum();
                        AllRowNum+=RowNum;
                        for(int j=1;j<=RowNum;j++) {
                            int flag = 0;
                            Cell[] cells=new Cell[7];
                            Row row=sheet.getRow(j);
                            for (int k=0;k<cells.length;k++) {
                                cells[k]=row.getCell(k);
                            }
                            if(cells[0].getCellType() != CellType.NUMERIC){
                                System.out.println("已无实际数据");
                                break;
                            }
                            if(cells[0]!=null&&cells[0].getCellType()== CellType.NUMERIC) {
                                if(winterNewWindParamService.getWinterNewWindParamById((int)cells[0].getNumericCellValue()).size()!=0){
                                    WinterNewWindParamInfo winterNewWindParamInfo1= winterNewWindParamService.getWinterNewWindParamById((int)cells[0].getNumericCellValue()).get(0);
                                    if (winterNewWindParamInfo1!=null){
                                        winterNewWindParamInfo = winterNewWindParamInfo1;
                                        flag = 1;
                                    }
                                }
                                winterNewWindParamInfo.setStationId((int)cells[0].getNumericCellValue());
                            }else {
                                buffer.add("sheet1的第"+i+"行出错，已忽略该行。");
                            }
                            winterNewWindParamInfo.setStationId((int)cells[0].getNumericCellValue());
                            winterNewWindParamInfo.setParam1(cells[1].getNumericCellValue());
                            winterNewWindParamInfo.setParam2(cells[2].getNumericCellValue());
                            winterNewWindParamInfo.setParam3(cells[3].getNumericCellValue());
                            winterNewWindParamInfo.setParam4(cells[4].getNumericCellValue());
                            winterNewWindParamInfo.setParam5(cells[5].getNumericCellValue());
                            winterNewWindParamInfo.setParam6(cells[6].getNumericCellValue());

                            if(winterNewWindParamInfo!=null&& flag == 0) {
                                winterNewWindParamService.addWinterNewWindParam(winterNewWindParamInfo);
                                count++;
                            }else if (winterNewWindParamInfo != null && flag == 1) {
                                System.out.println(cells[0]);
                                winterNewWindParamService.updateWinterNewWindParam(winterNewWindParamInfo);
                                count++;
                            }
                        }
                    }else {
                        WinterNewWindTimeInfo winterNewWindTimeInfo=new WinterNewWindTimeInfo();
                        int RowNum=sheet.getLastRowNum();
                        AllRowNum+=RowNum;
                        for (int j=1;j<=RowNum;j++){
                            int flag = 0;
                            Cell[] cells=new Cell[26];
                            Row row=sheet.getRow(j);
                            for(int k=0;k<cells.length;k++) {
                                cells[k]=row.getCell(k);
                            }

                            if(cells[0].getCellType() != CellType.NUMERIC){
                                System.out.println("已无实际数据");
                                break;
                            }
                            if(cells[0]!=null&&cells[0].getCellType()== CellType.NUMERIC) {
                                //TypWinHeatTimeInfo typWinHeatTimeInfo1= typWinHeatTimeService.getTypWinHeatTimeById((int)cells[0].getNumericCellValue()).get(0);
                                if(winterNewWindTimeService.getWinterNewWindTimeByIT((int)cells[0].getNumericCellValue(),i+1).size()!=0){
                                    WinterNewWindTimeInfo winterNewWindTimeInfo1= winterNewWindTimeService.getWinterNewWindTimeByIT((int)cells[0].getNumericCellValue(),i+1).get(0);
                                    if (winterNewWindTimeInfo1!=null){
                                        winterNewWindTimeInfo = winterNewWindTimeInfo1;
                                        flag = 1;
                                    }
                                }
                                winterNewWindTimeInfo.setStationId((int)cells[0].getNumericCellValue());
                            }else {
                                buffer.add("sheet1的第"+i+"行出错，已忽略该行。");
                            }
                            //typWinHeatTimeInfo.setStationId((int)cells[0].getNumericCellValue());
                            winterNewWindTimeInfo.setParamType(i+1);
                            winterNewWindTimeInfo.setTime1(cells[2].getNumericCellValue());
                            winterNewWindTimeInfo.setTime2(cells[3].getNumericCellValue());
                            winterNewWindTimeInfo.setTime3(cells[4].getNumericCellValue());
                            winterNewWindTimeInfo.setTime4(cells[5].getNumericCellValue());
                            winterNewWindTimeInfo.setTime5(cells[6].getNumericCellValue());
                            winterNewWindTimeInfo.setTime6(cells[7].getNumericCellValue());
                            winterNewWindTimeInfo.setTime7(cells[8].getNumericCellValue());
                            winterNewWindTimeInfo.setTime8(cells[9].getNumericCellValue());
                            winterNewWindTimeInfo.setTime9(cells[10].getNumericCellValue());
                            winterNewWindTimeInfo.setTime10(cells[11].getNumericCellValue());
                            winterNewWindTimeInfo.setTime11(cells[12].getNumericCellValue());
                            winterNewWindTimeInfo.setTime12(cells[13].getNumericCellValue());
                            winterNewWindTimeInfo.setTime13(cells[14].getNumericCellValue());
                            winterNewWindTimeInfo.setTime14(cells[15].getNumericCellValue());
                            winterNewWindTimeInfo.setTime15(cells[16].getNumericCellValue());
                            winterNewWindTimeInfo.setTime16(cells[17].getNumericCellValue());
                            winterNewWindTimeInfo.setTime17(cells[18].getNumericCellValue());
                            winterNewWindTimeInfo.setTime18(cells[19].getNumericCellValue());
                            winterNewWindTimeInfo.setTime19(cells[20].getNumericCellValue());
                            winterNewWindTimeInfo.setTime20(cells[21].getNumericCellValue());
                            winterNewWindTimeInfo.setTime21(cells[22].getNumericCellValue());
                            winterNewWindTimeInfo.setTime22(cells[23].getNumericCellValue());
                            winterNewWindTimeInfo.setTime23(cells[24].getNumericCellValue());
                            winterNewWindTimeInfo.setTime24(cells[25].getNumericCellValue());
                            if(winterNewWindTimeInfo!=null&& flag == 0) {
                                count++;
                                winterNewWindTimeService.addWinterNewWindTime(winterNewWindTimeInfo);
                            }else if (winterNewWindTimeInfo != null && flag == 1) {
                                System.out.println(cells[0]);
                                winterNewWindTimeService.updateWinterNewWindTime(winterNewWindTimeInfo);
                                count++;
                            }
                        }
                    }
                }
                upLoadFlag7();
                jsonObject.put("count", "共计" + AllRowNum + "条数据，导入成功" + count + "条数据，导入失败" + (AllRowNum - count) + "条");
                buffer.add("上传成功");

            }
        }catch (Exception e) {
            e.printStackTrace();
        }
        jsonObject.put("code",code);
        jsonObject.put("message",buffer.toString());
        return jsonObject;
    }
    //    传递冬季供暖上传文件的进度标志flag
    @ResponseBody
    @RequestMapping("/flag7")
    public JSONObject upLoadFlag7() {
        JSONObject jsonObject=new JSONObject();
        if(Math.round(flag7) ==100) {
            jsonObject.put("code",1);
        }
        jsonObject.put("flag",Math.round(flag7));
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
