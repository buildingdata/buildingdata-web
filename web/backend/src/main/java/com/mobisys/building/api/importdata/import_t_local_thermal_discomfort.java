package com.mobisys.building.api.importdata;

import com.mobisys.building.entity.indoorSuggestInfo;
import net.sf.json.JSONObject;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.mobisys.building.service.localDisconforService;
import com.mobisys.building.entity.localDisconforInfo;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.StringJoiner;


@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping(value = "/import_t_local_thermal_discomfort")
public class import_t_local_thermal_discomfort {

    /**
     导入局部热不舒适的数据，对应数据库中的表为t_local_thermal_discomfort
     */

    @Autowired
    private localDisconforService localDisconforService;

    private double flag = 0;
    int count=0;
    @ResponseBody
    @RequestMapping("/upload_t_local_thermal_discomfort")
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
                    localDisconforInfo localDisconforInfo=new localDisconforInfo();

                    Row row = sheet.getRow(i);     //获取指定行
                    if (row != null) {
                        Cell[] cells = new Cell[13];
//                        for (int k = 0; k < cells.length; k++) {
//                            cells[k] = row.getCell(k);//获取单元格
//                            if (cells[k]!=null&&k!=0){
//                                cells[k].setCellType(CellType.STRING);//设置单元格格式
//                            }
//                        }
                        cells[0]=row.getCell(0);
                        cells[0].setCellType(CellType.STRING);//设置单元格格式
                        cells[1]=row.getCell(1);
                        cells[1].setCellType(CellType.NUMERIC);//设置单元格格式
                        cells[2]=row.getCell(2);
                        cells[2].setCellType(CellType.NUMERIC);//设置单元格格式
                        cells[3]=row.getCell(3);
                        cells[3].setCellType(CellType.NUMERIC);//设置单元格格式
                        cells[4]=row.getCell(4);
                        cells[4].setCellType(CellType.NUMERIC);//设置单元格格式
                        cells[5]=row.getCell(5);
                        cells[5].setCellType(CellType.NUMERIC);//设置单元格格式
                        cells[6]=row.getCell(6);
                        cells[6].setCellType(CellType.NUMERIC);//设置单元格格式
                        cells[7]=row.getCell(7);
                        cells[7].setCellType(CellType.STRING);//设置单元格格式
                        cells[8]=row.getCell(8);
                        cells[8].setCellType(CellType.NUMERIC);//设置单元格格式
                        cells[9]=row.getCell(9);
                        cells[9].setCellType(CellType.STRING);//设置单元格格式
                        cells[10]=row.getCell(10);
                        cells[10].setCellType(CellType.STRING);//设置单元格格式
                        cells[11]=row.getCell(11);
                        cells[11].setCellType(CellType.STRING);//设置单元格格式
                        cells[12]=row.getCell(12);
                        cells[12].setCellType(CellType.STRING);//设置单元格格式
                        //插入数据
                        System.out.println("我是第" + i + "行");
                        System.out.println(cells[0].getStringCellValue());
                        if (cells[0]!=null){
                            localDisconforInfo.setLevel(cells[0].getStringCellValue());

                        }else{
                            buffer.add("数据集为空！！");
                            jsonObject.put("message",buffer.toString());
                            return jsonObject;
                        }


                        if(cells[1]!=null){
                            localDisconforInfo.setWindSpeedMostWin(cells[1].getNumericCellValue());
                        }else {
                            localDisconforInfo.setWindSpeedMostWin(null);
                        }

                        if(cells[2]!=null){
                            localDisconforInfo.setWindSpeedMostSum(cells[2].getNumericCellValue());
                        }else {
                            localDisconforInfo.setWindSpeedMostSum(null);
                        }

                        if(cells[3]!=null){
                            localDisconforInfo.setBlowUnsatiRate(cells[3].getNumericCellValue());
                        }else {
                            localDisconforInfo.setBlowUnsatiRate(null);
                        }

                        if(cells[4]!=null){
                            localDisconforInfo.setVertTempUnsatiRate(cells[4].getNumericCellValue());
                        }else {
                            localDisconforInfo.setVertTempUnsatiRate(null);
                        }
                        if(cells[5]!=null){
                            localDisconforInfo.setVertTempInequal(cells[5].getNumericCellValue());
                        }else {
                            localDisconforInfo.setVertTempInequal(null);
                        }

                        if(cells[6]!=null){
                            localDisconforInfo.setGroTempUnsatiRate(cells[6].getNumericCellValue());
                        }else {
                            localDisconforInfo.setGroTempUnsatiRate(null);
                        }

                        if(cells[7]!=null){
                            localDisconforInfo.setGroudTempRange(cells[7].getStringCellValue());
                        }else {
                            localDisconforInfo.setGroudTempRange(null);
                        }

                        if(cells[8]!=null){
                            localDisconforInfo.setNonRadUnsatiRate(cells[8].getNumericCellValue());
                        }else {
                            localDisconforInfo.setNonRadUnsatiRate(null);
                        }
                        if(cells[9]!=null){
                            localDisconforInfo.setNonRadHotCeil(cells[9].getStringCellValue());
                        }else {
                            localDisconforInfo.setNonRadHotCeil(null);
                        }

                        if(cells[10]!=null){
                            localDisconforInfo.setNonRadColdWall(cells[10].getStringCellValue());
                        }else {
                            localDisconforInfo.setNonRadColdWall(null);
                        }

                        if(cells[11]!=null){
                            localDisconforInfo.setNonRadColdCeil(cells[11].getStringCellValue());
                        }else {
                            localDisconforInfo.setNonRadColdCeil(null);
                        }

                        if(cells[12]!=null){
                            localDisconforInfo.setNonRadHotWall(cells[12].getStringCellValue());
                        }else {
                            localDisconforInfo.setNonRadHotWall(null);
                        }


                        System.out.println("cells[0].getStringCellValue()值"+cells[0].getStringCellValue());
                    }

                    if (localDisconforInfo!= null) {
                        localDisconforService.update_t_local_thermal_discomfort(localDisconforInfo);
                        System.out.println("走了！");
                        count++;
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
