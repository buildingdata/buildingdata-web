package com.mobisys.building.api.Thread;

import com.mobisys.building.entity.TypicalMeteoroLogicalInfo;
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

public class TypicalMeteoroYearMultiThread implements Callable<Integer> {
    private Logger logger=LoggerFactory.getLogger(com.mobisys.building.api.Thread.TypicalMeteoroYearMultiThread.class);
    private Sheet sheet;
    private Integer startRow;
    private Integer endRow;
    private int stationlist;
    private TypicalMeteoroLogicalService typicalMeteoroLogicalService;
    private Semaphore semaphore;
    private CountDownLatch latch;
    public TypicalMeteoroYearMultiThread(Semaphore semaphore, Sheet sheet, Integer startRow, Integer endRow, int stationlist  , TypicalMeteoroLogicalService typicalMeteoroLogicalService, CountDownLatch latch) {
        this.semaphore=semaphore;
        this.sheet=sheet;
        this.startRow=startRow;
        this.endRow=endRow;
        this.stationlist=stationlist;
        this.latch=latch;
        this.typicalMeteoroLogicalService=typicalMeteoroLogicalService;
    }

    @Override
    public Integer call() throws Exception {
        logger.info("线程ID：<{}>开始运行，startRow:{},endRow:{}",Thread.currentThread().getId(),startRow,endRow);
        semaphore.acquire();
        logger.info("消耗了一个信号量，剩余信号量为:{}",semaphore.availablePermits());
        latch.countDown();
        int count=0;
        List<TypicalMeteoroLogicalInfo> typicalMeteoroLogicalInfoList=new ArrayList<TypicalMeteoroLogicalInfo>();
        for(int i=startRow;i<=endRow;i++) {
            TypicalMeteoroLogicalInfo typicalMeteoroLogicalInfo=new TypicalMeteoroLogicalInfo();
            Row row=sheet.getRow(i);
            Cell[] cells=new Cell[13];
            for (int k = 0; k < cells.length; k++) {
                cells[k] = row.getCell(k);
            }
            typicalMeteoroLogicalInfo.setStationId(stationlist);
            typicalMeteoroLogicalInfo.setMonth((int) cells[0].getNumericCellValue());
            typicalMeteoroLogicalInfo.setDay((int) cells[1].getNumericCellValue());
            typicalMeteoroLogicalInfo.setTime((int) cells[2].getNumericCellValue());
            typicalMeteoroLogicalInfo.setPressure((int) cells[3].getNumericCellValue());
            typicalMeteoroLogicalInfo.setDryTemp(cells[4].getNumericCellValue());
            typicalMeteoroLogicalInfo.setPointTemper(cells[5].getNumericCellValue());
            typicalMeteoroLogicalInfo.setRelativeHumidity((int) cells[6].getNumericCellValue());
            typicalMeteoroLogicalInfo.setSunSumRadiation(cells[7].getNumericCellValue());
            typicalMeteoroLogicalInfo.setDirectRadiation(cells[8].getNumericCellValue());
            typicalMeteoroLogicalInfo.setScatterRadiation(cells[9].getNumericCellValue());
            typicalMeteoroLogicalInfo.setWindSpeed(cells[11].getNumericCellValue());
            typicalMeteoroLogicalInfo.setWindDirection(cells[12].getNumericCellValue());
            typicalMeteoroLogicalInfoList.add(typicalMeteoroLogicalInfo);
            count++;
        }
        if (!typicalMeteoroLogicalInfoList.isEmpty()) {
            typicalMeteoroLogicalService.addTypicalList10(typicalMeteoroLogicalInfoList);
        }
        semaphore.release();
        return count;
    }
}
