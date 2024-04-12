package com.mobisys.building.api.importdata;

import com.mobisys.building.entity.OtmccInfo;
import com.mobisys.building.entity.SimultaneousParamInfo;
import com.mobisys.building.service.simultaneousParamService;
import net.sf.json.JSONObject;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.StringJoiner;

/**
 * 导入同时发生参数Excel表格，对应数据库表名为t_simultaneous_param
 */
@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping("/importSimultaneousOccurrenceParam")
public class ImportSimultaneousOccurrenceParam {
    @Autowired
    simultaneousParamService simultaneousParamService;
    private double flag=0;
    @ResponseBody
    @RequestMapping("/uploadSimultaneousOccurrenceParam")
    public JSONObject uploadSimultaneousOccurrenceParam(@RequestParam("file")MultipartFile file,String name) {
        JSONObject jsonObject=new JSONObject();
        int count=0,code=0;
        StringJoiner buffer=new StringJoiner("\n");
        try {
            if(name!=null) {
                Workbook workbook=null;

                InputStream inputStream=file.getInputStream();
                if(isExcel2003(name)) {
                    workbook= new HSSFWorkbook(inputStream);
                }else if(isExcel2007(name)) {
                    workbook=new XSSFWorkbook(inputStream);
                }
//                文件只有一个sheet
                Sheet sheet=workbook.getSheetAt(0);
//                得到文件中数据行的行数
                int RowNum=sheet.getLastRowNum();
                if(RowNum==0) {
                    flag=100;
                    buffer.add("导入文件内容为空！");
                }
                flag = (double) 100/RowNum;
                for(int i=2;i<=RowNum;i++) {
                    List<SimultaneousParamInfo> simultaneousParamInfoList=new ArrayList<SimultaneousParamInfo>();
                    if(flag<100) {
                        double d=(double) 100/RowNum;
                        flag+=d;
                    }else {
                        flag=100;
                    }
                    Row row=sheet.getRow(i);
                    if(row!=null) {
                        Cell[] cells=new Cell[18];

                        for(int j=0;j<cells.length;j++) {
                            cells[j]=row.getCell(j);
                            System.out.println(cells[j]);
                        }
                        int flag1 = 0;
                        System.out.println(cells[0]);
                        /*if(cells[0]!=null&&cells[0].getCellType()== CellType.NUMERIC) {
                            SimultaneousParamInfo simultaneousParamInfo1 = simultaneousParamService.getSimuParamById((int)cells[0].getNumericCellValue()).get(0);
                            if(simultaneousParamInfo1.getId()=null){

                            }
                            if (otmccInfo!=null){
                                otmccInfo = otmccInfo1;
                                flag1 = 1;
                            }
                            otmccInfo.setStationId((int)cells[0].getNumericCellValue());
                        }else {
                            buffer.add("sheet1的第"+i+"行出错，已忽略该行。");
                        }*/
//                        burden、DryTemperature、WetTemperature、TotalRadiation分别是围护结构面积负荷、干球温度、湿球温度、立面总辐射的24小时的数据
                        String[] burden=cells[14].getStringCellValue().split("，");
                        String[] DryTemperature=cells[15].getStringCellValue().split("，");
                        String[] WetTemperature=cells[16].getStringCellValue().split("，");
                        String[] TotalRadiation=cells[17].getStringCellValue().split("，");
                        for(int k=0;k<burden.length;k++) {
                            SimultaneousParamInfo simultaneousParamInfo=new SimultaneousParamInfo();
                        if(i%3==1){
                            simultaneousParamInfo.setStationId((int)cells[0].getNumericCellValue());
                            simultaneousParamInfo.setYear(cells[1].getStringCellValue());
                        }else if(i%3==2) {
                            System.out.println(i);
                            simultaneousParamInfo.setStationId((int)sheet.getRow(i).getCell(0).getNumericCellValue());
                            simultaneousParamInfo.setYear(sheet.getRow(i).getCell(1).getStringCellValue());
                        }else if(i%3==0) {
                            simultaneousParamInfo.setStationId((int)sheet.getRow(i).getCell(0).getNumericCellValue());
                            simultaneousParamInfo.setYear(sheet.getRow(i).getCell(1).getStringCellValue());
                        }
                        simultaneousParamInfo.setDirection(cells[2].getStringCellValue());
                        simultaneousParamInfo.setWallType(cells[3].getStringCellValue());
                        simultaneousParamInfo.setWindowType(cells[4].getStringCellValue());
                        simultaneousParamInfo.setWallWindow(cells[5].getNumericCellValue());
                        simultaneousParamInfo.setSHGCO(cells[6].getNumericCellValue());
                        simultaneousParamInfo.setVentilation(cells[7].getNumericCellValue());
                        simultaneousParamInfo.setIndoorTem(cells[8].getNumericCellValue());
                        simultaneousParamInfo.setR((int)cells[9].getNumericCellValue());
                        simultaneousParamInfo.setInCover(cells[10].getNumericCellValue());
                        simultaneousParamInfo.setRadiation(cells[11].getNumericCellValue());
                        simultaneousParamInfo.setOutSurAbsorb(cells[12].getNumericCellValue());
                        simultaneousParamInfo.setRoom(cells[13].getStringCellValue());

                        simultaneousParamInfo.setAreaLoad(burden[k]);
                        simultaneousParamInfo.setDryTem(DryTemperature[k]);
                        simultaneousParamInfo.setWetTem(WetTemperature[k]);
                        simultaneousParamInfo.setTotalRadiation(TotalRadiation[k]);
                        System.out.println(simultaneousParamInfo.toString());
                        simultaneousParamInfoList.add(simultaneousParamInfo);
                            if(simultaneousParamInfo.getStationId()!=null) {
                                simultaneousParamService.addSimultaneousParam(simultaneousParamInfo);
                                count++;
                            }
                        }
                        System.out.println("下面是list的数据");
                        System.out.println("list大小为："+simultaneousParamInfoList.size());
                        if(!simultaneousParamInfoList.isEmpty()) {
                            System.out.println(simultaneousParamInfoList);
                            simultaneousParamService.addSimultaneousParamList(simultaneousParamInfoList);
                            count++;
                    }
                    }
//
                    if(count==RowNum) {
                        buffer.add("上传完成！");
                    }
                    upLoadFlag();
                }

                jsonObject.put("count","共计"+RowNum*24+"条数据，导入成功"+count*24+"条数据，导入失败"+(RowNum*24-count*24)+"条");
            }
        }catch (Exception e) {
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
