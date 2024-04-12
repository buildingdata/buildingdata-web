package com.mobisys.building.api.importdata;

import com.mobisys.building.api.Thread.ExtremeMeteoroYearInnerMutiThread;
import com.mobisys.building.service.ExtremMeteoroLogicalService;
import net.sf.json.JSONObject;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.StringJoiner;
import java.util.concurrent.*;

/**
 * 导入极端气象年（室内过热极端年）的数据，共有11个台站每天24个时刻的数据，对应数据库中的表为t_extreme_meteorological_inner
 */
@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping(value = "/importextrememeteorologicalyearinner")
public class ImportExtremeMeteorologicalYearInner {
    @Autowired
    ExtremMeteoroLogicalService extremMeteoroLogicalService;
    private double flag=0;
    /**
     * 导入极端气象年（空调负荷极端年）的数据，共有11个台站每天24个时刻的数据，对应数据库中的表为t_extreme_meteorological_air
     */
    @ResponseBody
    @RequestMapping(value = "/uploadextrememeteorologicalyearinner")
    public JSONObject uploadextrememeteorologicalyearinner(@RequestParam("file") MultipartFile file, String name) {
        JSONObject jsonObject=new JSONObject();
        int count=0,code=0;
        StringJoiner buffer=new StringJoiner("\n");
        //int[] stationlist = new int[]{};
        try {
            if(name!=null) {
                InputStream inputStream=file.getInputStream();
                Workbook workbook=null;
                if(isExcel2003(name)) {
                    workbook=new HSSFWorkbook(inputStream);
                }else if(isExcel2007(name)) {
                    workbook=new XSSFWorkbook(inputStream);
                }
                int sheetNum=workbook.getNumberOfSheets();
                int AllRowNum=0;
                int successCount=0;
                for(int i=0;i<sheetNum;i++) {
                    if(flag<100) {
                        double d=(double)100/sheetNum;
                        flag+=d;
                    }else {
                        flag=100;
                    }
                    Sheet sheet=workbook.getSheetAt(i);
                    int RowNum=sheet.getLastRowNum();
                    AllRowNum+=RowNum;
                    int threadNum=RowNum/500+1;
                    Semaphore semaphore=new Semaphore(threadNum);
                    CountDownLatch countDownLatch=new CountDownLatch(threadNum);
                    ExecutorService executorService= Executors.newFixedThreadPool(threadNum);
                    List<Future<Integer>> futures=new ArrayList<>();
                    for(int j=1;j<=threadNum;j++) {
                        int startRow=(j-1)*500+1;
                        int endRow=j*500;
                        if(j==threadNum) {
                            endRow=RowNum;
                        }
                        Future<Integer> future=executorService.submit(new ExtremeMeteoroYearInnerMutiThread(semaphore,sheet,startRow,endRow,extremMeteoroLogicalService,countDownLatch));
                        futures.add(null);
                    }
                    for(Future<Integer> future:futures) {
                        successCount+=future.get();
                    }
                    countDownLatch.await(60,TimeUnit.SECONDS);
                    executorService.shutdown();
                }
                upLoadFlag();
                jsonObject.put("count", "共计" + AllRowNum + "条数据，导入成功" + successCount + "条数据，导入失败" + (AllRowNum - successCount) + "条");
                if(successCount==AllRowNum) {
                    buffer.add("导入成功");
                }
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
