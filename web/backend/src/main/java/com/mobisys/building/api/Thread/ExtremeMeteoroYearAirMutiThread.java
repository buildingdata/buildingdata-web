package com.mobisys.building.api.Thread;

import com.mobisys.building.entity.ExtremMeteoroLogicalInfo;
import com.mobisys.building.entity.TypicalMeteoroLogicalInfo;
import com.mobisys.building.service.ExtremMeteoroLogicalService;
import com.mobisys.building.service.TypicalMeteoroLogicalService;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Semaphore;

public class ExtremeMeteoroYearAirMutiThread implements Callable {
    private Logger logger= LoggerFactory.getLogger(com.mobisys.building.api.Thread.ExtremeMeteoroYearAirMutiThread.class);
    private Sheet sheet;
    private Integer startRow;
    private Integer endRow;
    private ExtremMeteoroLogicalService extremMeteoroLogicalService;
    private Semaphore semaphore;
    private CountDownLatch latch;
    public ExtremeMeteoroYearAirMutiThread(Semaphore semaphore, Sheet sheet, Integer startRow, Integer endRow, ExtremMeteoroLogicalService extremMeteoroLogicalService, CountDownLatch latch) {
        this.semaphore=semaphore;
        this.sheet=sheet;
        this.startRow=startRow;
        this.endRow=endRow;
        this.latch=latch;
        this.extremMeteoroLogicalService=extremMeteoroLogicalService;
    }
    @Override
    public Object call() throws Exception {
        logger.info("线程ID：<{}>开始运行，startRow:{},endRow:{}",Thread.currentThread().getId(),startRow,endRow);
        semaphore.acquire();
        logger.info("消耗了一个信号量，剩余信号量为:{}",semaphore.availablePermits());
        latch.countDown();
        int count=0;
        List<ExtremMeteoroLogicalInfo> extremMeteoroLogicalInfoList=new ArrayList<ExtremMeteoroLogicalInfo>();
        for(int i=startRow;i<=endRow;i++) {
            ExtremMeteoroLogicalInfo extremMeteoroLogicalInfo=new ExtremMeteoroLogicalInfo();
            Row row=sheet.getRow(i);
            Cell[] cells=new Cell[15];
            for (int k = 0; k < cells.length; k++) {
                cells[k] = row.getCell(k);
            }
            extremMeteoroLogicalInfo.setStationId((int)cells[0].getNumericCellValue());
            extremMeteoroLogicalInfo.setMonth((int)cells[1].getNumericCellValue());
            extremMeteoroLogicalInfo.setDay((int)cells[2].getNumericCellValue());
            extremMeteoroLogicalInfo.setTime((int)cells[3].getNumericCellValue());
            extremMeteoroLogicalInfo.setPressure(cells[4].getNumericCellValue());
            extremMeteoroLogicalInfo.setDryTemp(cells[5].getNumericCellValue());
            extremMeteoroLogicalInfo.setPointTemper(cells[6].getNumericCellValue());
            extremMeteoroLogicalInfo.setRelativeHumidity(cells[7].getNumericCellValue());
            extremMeteoroLogicalInfo.setSunSumRadiation(cells[8].getNumericCellValue());
            extremMeteoroLogicalInfo.setDirectRadiation(cells[9].getNumericCellValue());
            extremMeteoroLogicalInfo.setScatterRadiation(cells[10].getNumericCellValue());
            extremMeteoroLogicalInfo.setCloudiness(cells[11].getNumericCellValue());
            extremMeteoroLogicalInfo.setWinSpeed(cells[12].getNumericCellValue());
//            extremMeteoroLogicalInfo.setWetTemperature(cells[12].getNumericCellValue());
//            extremMeteoroLogicalInfo.setTH(cells[13].getNumericCellValue());
//            extremMeteoroLogicalInfo.setDF(cells[14].getNumericCellValue());
//            extremMeteoroLogicalInfo.setNR(cells[15].getNumericCellValue());
            extremMeteoroLogicalInfoList.add(extremMeteoroLogicalInfo);
            count++;
        }
        if (!extremMeteoroLogicalInfoList.isEmpty()) {
            extremMeteoroLogicalService.addExtremAirList(extremMeteoroLogicalInfoList);
        }
        semaphore.release();
        return count;
    }
}
