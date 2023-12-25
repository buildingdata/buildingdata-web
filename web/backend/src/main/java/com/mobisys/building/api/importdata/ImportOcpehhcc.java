package com.mobisys.building.api.importdata;

import com.mobisys.building.api.Thread.OcpehhccMultiThread;
import com.mobisys.building.entity.OcpehhccInfo;
import com.mobisys.building.entity.OtmccInfo;
import com.mobisys.building.service.OcpehhccService;
import com.mobisys.building.service.OtmccService;
import net.sf.json.JSONObject;
import org.apache.commons.lang.ArrayUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.StringJoiner;
import java.util.concurrent.*;



/*@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping("/importocpehhcc")
//导入热湿耦合数据，对应数据库中的ocpehhcc
public class ImportOcpehhcc {
    @Autowired
    OcpehhccService ocpehhccService;
    private double flag=0;
    @ResponseBody
    @RequestMapping("/uploadocpehhcc")
    public JSONObject uploadocpehhcc(@RequestParam("file") MultipartFile file, String name) {
        JSONObject jsonObject=new JSONObject();
        int count=0,code=0;
        StringJoiner buffer=new StringJoiner("\n");
        OcpehhccInfo ocpehhccInfo=new OcpehhccInfo();
        try {
            if(name!=null) {
                InputStream inputStream = file.getInputStream();
//            System.out.println(inputStream);
                byte b[] = new byte[(int) file.getSize()];
                inputStream.read(b);
                inputStream.close();
                String[] lines = new String(b).split("\n");
                int threadNum=(lines.length-1)/500+1;
                int successCount=0;
                Semaphore semaphore=new Semaphore(threadNum);
                ExecutorService executorService= Executors.newFixedThreadPool(threadNum);
                List<Future<Integer>> futures=new ArrayList<>();
                CountDownLatch countDownLatch=new CountDownLatch(threadNum);
                for(int j=1;j<=threadNum;j++) {
                    if (flag < 100) {
                        double d = (double) 100 / threadNum;
                        flag += d;
                    } else {
                        flag = 100;
                    }
                    //     第一行是表头，从第二行开始读取数据
                    int start=(j-1)*500+1;
                    int end=j*500;
                    if(j==threadNum) {
                        end=lines.length-1;
                    }
                    Future<Integer> future=executorService.submit(new OcpehhccMultiThread(semaphore,start,end,lines,ocpehhccService,countDownLatch));
                    futures.add(future);
                }
                for(Future<Integer> future:futures) {
                    successCount+=future.get();
                }
                countDownLatch.await(60,TimeUnit.SECONDS);
                executorService.shutdown();
                jsonObject.put("count", "共计" + (lines.length - 1) + "条数据，导入成功" + successCount + "条数据，导入失败" + ((lines.length - 1) - successCount) + "条");
                if (count == (lines.length - 1)) {
                    buffer.add("导入成功");
                }
            }
        }catch (Exception e) {
            System.out.println("读取文件出错");
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
}*/
@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping("/importocpehhcc")
public class ImportOcpehhcc {
    @Autowired
    OcpehhccService ocpehhccService;
    private double flag=0;
    @ResponseBody
    @RequestMapping("/uploadocpehhcc")
    public JSONObject uploadOcpehhcc(@RequestParam("file") MultipartFile file,String name) {
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
                    OcpehhccInfo ocpehhccInfo=new OcpehhccInfo();
                    Row row=sheet.getRow(i);
                    if(row!=null) {
                        Cell[] cells=new Cell[16];
                        for(int k=0;k<cells.length;k++) {
                            cells[k]=row.getCell(k);
                        }
//                        数据校验，判断第列是不是台站号
                        int flag1 = 0;
                        System.out.println(cells[0]);
                        if(cells[0]!=null&&cells[0].getCellType()== CellType.NUMERIC) {
                            if(ocpehhccService.getOcpehhccByIT((int)cells[0].getNumericCellValue(),(int)cells[1].getNumericCellValue(),(int)cells[2].getNumericCellValue(),(int)cells[3].getNumericCellValue()).size()!=0){
                                OcpehhccInfo ocpehhccInfo1 = ocpehhccService.getOcpehhccByIT((int)cells[0].getNumericCellValue(),(int)cells[1].getNumericCellValue(),(int)cells[2].getNumericCellValue(),(int)cells[3].getNumericCellValue()).get(0);
                                if (ocpehhccInfo1!=null){
                                    ocpehhccInfo = ocpehhccInfo1;
                                    flag1 = 1;
                                }
                            }
                            ocpehhccInfo.setStationId((int)cells[0].getNumericCellValue());
                        }else {
                            buffer.add("sheet1的第"+i+"行出错，已忽略该行。");
                        }
//                        数据插入
                        //ocpehhccInfo.setYear((int)cells[1].getNumericCellValue());
                        ocpehhccInfo.setMonth((int)cells[1].getNumericCellValue());
                        ocpehhccInfo.setDay((int)cells[2].getNumericCellValue());
                        ocpehhccInfo.setTime((int)cells[3].getNumericCellValue());
                        ocpehhccInfo.setDbt((int)cells[4].getNumericCellValue());
                        ocpehhccInfo.setPre((int)cells[5].getNumericCellValue());
                        ocpehhccInfo.setRhm((int)cells[6].getNumericCellValue());
                        ocpehhccInfo.setwDir((int)cells[7].getNumericCellValue());
                        ocpehhccInfo.setwSpd((int)cells[8].getNumericCellValue());
                        ocpehhccInfo.setDpt((int)cells[9].getNumericCellValue());
                        //ocpehhccInfo.setWbt((int)cells[10].getNumericCellValue());
                        ocpehhccInfo.setGsr(cells[11].getNumericCellValue());
                        ocpehhccInfo.setDif(cells[12].getNumericCellValue());
                        ocpehhccInfo.setDir(cells[13].getNumericCellValue());
                        ocpehhccInfo.setPct(cells[14].getNumericCellValue());
                        if(ocpehhccInfo!=null&& flag1 == 0) {
                            count++;
                            ocpehhccService.addOcpehhcc(ocpehhccInfo);
                        }else if (ocpehhccInfo != null && flag1 == 1) {
                            System.out.println(cells[0]);
                            ocpehhccService.updateOcpehhcc(ocpehhccInfo);
                            count++;
                        }
                    }
                    buffer.add("上传完成！");
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

