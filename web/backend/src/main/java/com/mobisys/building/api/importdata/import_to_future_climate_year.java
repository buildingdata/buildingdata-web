package com.mobisys.building.api.importdata;

import com.mobisys.building.service.FutureMeteoroLogicalService;
import com.mobisys.building.entity.FutureMeteoroLogicalInfo;
import net.sf.json.JSONObject;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;

@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping(value = "/import_to_future_climate_year")
public class import_to_future_climate_year{
    @Resource
    private FutureMeteoroLogicalService futureMeteoroLogicalService;

    private double flag = 0;
    int count=0;

    @RequestMapping(value = "/upload_to_future_climate_year")
    public JSONObject UploadOcpnvd(@RequestParam("file") MultipartFile file, String name,String table, HttpServletRequest request, HttpServletResponse response) throws IOException {
        StringJoiner buffer=new StringJoiner("/n");
        JSONObject jsonObject =new JSONObject();
        System.out.println("看能不能得到table的值"+table);
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
                    FutureMeteoroLogicalInfo futureMeteoroLogicalInfo=new FutureMeteoroLogicalInfo();
                    Row row = sheet.getRow(i);     //获取指定行
                    if (row != null) {
                        Cell[] cells = new Cell[14];
                        for (int k = 0; k < cells.length; k++) {
                            cells[k] = row.getCell(k);//获取单元格

                        }
                        if (cells[0]!=null){
                            cells[0].setCellType(CellType.NUMERIC);//设置单元格格式
                            futureMeteoroLogicalInfo.setStationId((int) cells[0].getNumericCellValue());
                        }else{
                            buffer.add("数据集缺少重要信息！！");
                            jsonObject.put("message",buffer.toString());
                            return jsonObject;
                        }

                        if (cells[1]!=null){
                            cells[1].setCellType(CellType.NUMERIC);//设置单元格格式
                            futureMeteoroLogicalInfo.setMonth((int) cells[1].getNumericCellValue());
                        }else{
                            buffer.add("数据集缺少重要信息！！");
                            jsonObject.put("message",buffer.toString());
                            return jsonObject;
                        }
                        if (cells[2]!=null){
                            cells[2].setCellType(CellType.NUMERIC);//设置单元格格式
                            futureMeteoroLogicalInfo.setDay((int) cells[2].getNumericCellValue());
                        }else{
                            buffer.add("数据集缺少重要信息！！");
                            jsonObject.put("message",buffer.toString());
                            return jsonObject;
                        }

                        if (cells[3]!=null){
                            cells[3].setCellType(CellType.NUMERIC);//设置单元格格式
                            futureMeteoroLogicalInfo.setTime((int) cells[3].getNumericCellValue());
                        }else{
                            futureMeteoroLogicalInfo.setTime(null);
                        }


                        if (cells[4]!=null){
                            cells[4].setCellType(CellType.NUMERIC);//设置单元格格式
                            futureMeteoroLogicalInfo.setPressure((int)cells[4].getNumericCellValue());
                        }else{
                            futureMeteoroLogicalInfo.setPressure(null);
                        }

                        if (cells[5]!=null){
                            cells[5].setCellType(CellType.NUMERIC);//设置单元格格式
                            futureMeteoroLogicalInfo.setDryTemper(cells[5].getNumericCellValue());
                        }else{
                            futureMeteoroLogicalInfo.setDryTemper(null);
                        }
                        if (cells[6]!=null){
                            cells[6].setCellType(CellType.NUMERIC);//设置单元格格式
                            //
                            futureMeteoroLogicalInfo.setPointTemper(cells[6].getNumericCellValue());
                        }else{
                            futureMeteoroLogicalInfo.setPointTemper(null);
                            //
                        }

                        if (cells[7]!=null){
                            cells[7].setCellType(CellType.NUMERIC);//设置单元格格式
                            futureMeteoroLogicalInfo.setRelativeSolid((int)cells[7].getNumericCellValue());
                        }else{
                            futureMeteoroLogicalInfo.setRelativeSolid(null);
                        }
                        if (cells[8]!=null){
                            cells[8].setCellType(CellType.NUMERIC);//设置单元格格式
                            futureMeteoroLogicalInfo.setSunSumRadiation(cells[8].getNumericCellValue());
                            //
                        }else{
                            futureMeteoroLogicalInfo.setSunSumRadiation(null);
                            //
                        }

                        if (cells[9]!=null){
                            cells[9].setCellType(CellType.NUMERIC);//设置单元格格式
                            futureMeteoroLogicalInfo.setDirectRadiation(cells[9].getNumericCellValue());
                        }else{
                            futureMeteoroLogicalInfo.setDirectRadiation(null);
                        }
                        if (cells[10]!=null){
                            cells[10].setCellType(CellType.NUMERIC);//设置单元格格式
                            futureMeteoroLogicalInfo.setScatterRadiation(cells[10].getNumericCellValue());
                        }else{
                            futureMeteoroLogicalInfo.setScatterRadiation(null);
                        }
                        if (cells[11]!=null){
                            cells[11].setCellType(CellType.NUMERIC);//设置单元格格式
                            futureMeteoroLogicalInfo.setCloudiness((int)cells[11].getNumericCellValue());
                        }else{
                            futureMeteoroLogicalInfo.setCloudiness(null);
                        }
                        if (cells[12]!=null){
                            cells[12].setCellType(CellType.NUMERIC);//设置单元格格式
                            futureMeteoroLogicalInfo.setWindSpeed(cells[12].getNumericCellValue());
                            //
                        }else{
                            futureMeteoroLogicalInfo.setWindSpeed(null);

                        }
                        if (cells[13]!=null){
                            cells[13].setCellType(CellType.NUMERIC);//设置单元格格式
                            futureMeteoroLogicalInfo.setWindDirection((int)cells[13].getNumericCellValue());
                            //
                        }else{
                            futureMeteoroLogicalInfo.setWindDirection(null);
                        }

                        //插入数据
                        System.out.println("我是第" + i + "行");

                    }

                    if (futureMeteoroLogicalInfo!= null) {




                        //
                        if(table.equals("RCP45-2050")){
                            //先查表，看对应数据有没有,有则更新，。没有就添加
                            List<FutureMeteoroLogicalInfo> f1=futureMeteoroLogicalService.getFuture45050InfoById(futureMeteoroLogicalInfo.getStationId(),futureMeteoroLogicalInfo.getMonth(),futureMeteoroLogicalInfo.getDay());
                            if(f1.size()!=0){
                                futureMeteoroLogicalService.update_t_future_meteorological_p45_2050(futureMeteoroLogicalInfo);
                            }else {
                                futureMeteoroLogicalService.insert_t_future_meteorological_p45_2050(futureMeteoroLogicalInfo);

                            }

                        }else if (table.equals("RCP45-2099")){
                            //先查表，看对应数据有没有,有则更新，。没有就添加
                            List<FutureMeteoroLogicalInfo> f1=futureMeteoroLogicalService.getFuture45099InfoById(futureMeteoroLogicalInfo.getStationId(),futureMeteoroLogicalInfo.getMonth(),futureMeteoroLogicalInfo.getDay());
                            if(f1.size()!=0){
                                futureMeteoroLogicalService.update_t_future_meteorological_p45_2099(futureMeteoroLogicalInfo);
                            }else {
                                futureMeteoroLogicalService.insert_t_future_meteorological_p45_2099(futureMeteoroLogicalInfo);

                            }

                        }else if (table.equals("RCP85-2050")){

                            //先查表，看对应数据有没有,有则更新，。没有就添加
                            List<FutureMeteoroLogicalInfo> f1=futureMeteoroLogicalService.getFuture85050InfoById(futureMeteoroLogicalInfo.getStationId(),futureMeteoroLogicalInfo.getMonth(),futureMeteoroLogicalInfo.getDay());
                            if(f1.size()!=0){
                                futureMeteoroLogicalService.update_t_future_meteorological_p85_2050(futureMeteoroLogicalInfo);
                            }else {
                                futureMeteoroLogicalService.insert_t_future_meteorological_p85_2050(futureMeteoroLogicalInfo);

                            }

                        }else if (table.equals("RCP85-2099")){

                            //先查表，看对应数据有没有,有则更新，。没有就添加
                            List<FutureMeteoroLogicalInfo> f1=futureMeteoroLogicalService.getFuture85099InfoById(futureMeteoroLogicalInfo.getStationId(),futureMeteoroLogicalInfo.getMonth(),futureMeteoroLogicalInfo.getDay());
                            if(f1.size()!=0){
                                futureMeteoroLogicalService.update_t_future_meteorological_p85_2099(futureMeteoroLogicalInfo);
                            }else {
                                futureMeteoroLogicalService.insert_t_future_meteorological_p85_2099(futureMeteoroLogicalInfo);
                            }

                        }
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

            System.out.println("出错了！"+e);

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
