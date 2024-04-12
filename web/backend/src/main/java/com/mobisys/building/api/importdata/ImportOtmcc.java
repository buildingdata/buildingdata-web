package com.mobisys.building.api.importdata;

import com.mobisys.building.entity.OtmccInfo;
import com.mobisys.building.service.OtmccService;
import net.sf.json.JSONObject;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.StringJoiner;

//上传围护结构隔热设计室外计算参数表，数据库表对应otmcc
@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping("/importotmcc")
public class ImportOtmcc {
    @Autowired
    OtmccService otmccService;
    private double flag=0;
    @ResponseBody
    @RequestMapping("/uploadotmcc")
    public JSONObject uploadOtmcc(@RequestParam("file") MultipartFile file,String name) {
        int count=0;
        int code=0;
        JSONObject jsonObject=new JSONObject();
        StringJoiner buffer=new StringJoiner("\n");
        try {
            if(name!=null) {
                InputStream inputStream=file.getInputStream();
                Workbook workbook = null;
                if(isExcel2003(name)) {
                    workbook= new HSSFWorkbook(inputStream);
                }else if(isExcel2007(name)) {
                    workbook=new XSSFWorkbook(inputStream);
                }
                Sheet sheet=workbook.getSheetAt(0);
                int RowNum=sheet.getLastRowNum();
                if(RowNum==0) {
                    flag=100;
                    buffer.add("导入文件数据为空");
                }
//                从第二行开始读取数据
                flag = (double) 100/RowNum;
                for(int i=2;i<=RowNum;i++) {
                    if(flag<100) {
                        double d=(double) 100/RowNum;
                        flag+=d;
//                        flag+=(double)100/RowNum;
                    }else {
                        flag=100;
                    }
                    OtmccInfo otmccInfo=new OtmccInfo();
                    Row row=sheet.getRow(i);
                    if(row!=null) {
                        Cell[] cells=new Cell[7];
                        for(int k=0;k<cells.length;k++) {
                            cells[k]=row.getCell(k);
                        }
//                        数据校验，判断第列是不是台站号
                        int flag1 = 0;
                        System.out.println(cells[0]);
                        if(cells[0]!=null&&cells[0].getCellType()== CellType.NUMERIC) {
                            OtmccInfo otmccInfo1 = otmccService.getOtmccByIT((int)cells[0].getNumericCellValue(),(int)cells[1].getNumericCellValue());
                            if (otmccInfo1!=null){
                                otmccInfo = otmccInfo1;
                                flag1 = 1;
                            }
                            otmccInfo.setStationId((int)cells[0].getNumericCellValue());
                        }else {
                            buffer.add("sheet1的第"+i+"行出错，已忽略该行。");
                        }
//                        数据插入
                        otmccInfo.setTime(i);
                        otmccInfo.setOutdoorAirTep(cells[1].getNumericCellValue());
                        otmccInfo.setHorizontal(cells[2].getNumericCellValue());
                        otmccInfo.setEast(cells[5].getNumericCellValue());
                        otmccInfo.setSouth(cells[3].getNumericCellValue());
                        otmccInfo.setWest(cells[6].getNumericCellValue());
                        otmccInfo.setNorth(cells[4].getNumericCellValue());
                        if(otmccInfo.getStationId()!=null&& flag1 == 0) {
                            count++;
                            otmccService.addOtmcc(otmccInfo);
                        }else if (otmccInfo != null && flag1 == 1) {
                            System.out.println(cells[0]);
                            otmccService.updateOtmcc(otmccInfo);
                            count++;
                        }
                    }
                    if(count==RowNum-1) {
                        buffer.add("上传完成！");
                    }
                    upLoadFlag();
                }
                jsonObject.put("count","共计"+RowNum+"条数据，导入成功"+count+"条数据，导入失败"+(RowNum-count)+"条");

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



