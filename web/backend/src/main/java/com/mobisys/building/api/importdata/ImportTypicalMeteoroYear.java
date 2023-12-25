package com.mobisys.building.api.importdata;

import com.mobisys.building.api.Thread.TypicalMeteoroYearMultiThread;
import com.mobisys.building.entity.TypicalMeteoroLogicalInfo;
import com.mobisys.building.service.TypicalMeteoroLogicalService;
import net.sf.json.JSONObject;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.StringJoiner;
import java.util.concurrent.*;

@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping("/importTypicalMeteoroYear")
public class ImportTypicalMeteoroYear {
    @Autowired
    TypicalMeteoroLogicalService typicalMeteoroLogicalService;
    private double flag=0;
    @ResponseBody
    @RequestMapping("/uploadTypicalMeteoroYear")
    public JSONObject uploadTypicalMeteoroYear(@RequestParam("file") MultipartFile file, String name) {
        JSONObject jsonObject=new JSONObject();
        int count=0,code=0;
        StringJoiner buffer=new StringJoiner("\n");
        try{
            if(name!=null) {
                Workbook workbook=null;
                //底下写死的数据不知道干啥
                int[] stationlist = new int[]{53463, 53692, 54342, 54401, 56187, 56951, 57494, 57816, 58847, 59431, 57131};
                InputStream inputStream=file.getInputStream();
                if(isExcel2003(name)) {
                    workbook=new HSSFWorkbook(inputStream);
                }else if(isExcel2007(name)) {
                    workbook=new XSSFWorkbook(inputStream);
                }
                int sheetNum=workbook.getNumberOfSheets();
                int AllRowNum=-1;
                int successCount=0;
                for(int k=0;k<sheetNum;k++) {
                    if(flag<100) {
                        double d=(double) 100/(sheetNum);
                        flag+=d;
                    }else {
                        flag=100;
                    }
                    Sheet sheet=workbook.getSheetAt(k);
                    int RowNum=sheet.getLastRowNum();
                    AllRowNum+=RowNum;
                    int threadNum=RowNum/500+1;
                    Semaphore semaphore=new Semaphore(threadNum);
                    CountDownLatch countDownLatch=new CountDownLatch(threadNum);
                    ExecutorService executorService= Executors.newFixedThreadPool(threadNum);
                    List<Future<Integer>> futures=new ArrayList<>();

                    for(int i=1;i<=threadNum;i++) {
                        int startRow=(i-1)*500+2;
                        int endRow=i*500;
                        if(i==threadNum) {
                            endRow=RowNum;
                        }
                        Future<Integer> future=executorService.submit(new TypicalMeteoroYearMultiThread(semaphore,sheet,startRow,endRow,stationlist[k],typicalMeteoroLogicalService,countDownLatch));
                        futures.add(future);
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
