package com.mobisys.building.api.Thread;

import com.mobisys.building.entity.OcpehhccInfo;
import com.mobisys.building.service.OcpehhccService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Semaphore;

import static java.lang.Double.parseDouble;
import static java.lang.Integer.parseInt;

public class OcpehhccMultiThread implements Callable<Integer> {
    private Logger logger=LoggerFactory.getLogger(OcpehhccMultiThread.class);
    private Semaphore semaphore;
    private Integer start;
    private Integer end;
    private String[] lines;
    private OcpehhccService ocpehhccService;
    private CountDownLatch latch;
    public OcpehhccMultiThread(Semaphore semaphore, Integer start, Integer end, String[] lines, OcpehhccService ocpehhccService, CountDownLatch latch) {
        this.semaphore=semaphore;
        this.start=start;
        this.end=end;
        this.lines=lines;
        this.latch=latch;
        this.ocpehhccService=ocpehhccService;
    }

    @Override
    public Integer call() throws Exception {
        logger.info("线程ID：<{}>开始运行，startRow:{},endRow:{}",Thread.currentThread().getId(),start,end);
        semaphore.acquire();
        logger.info("消耗了一个信号量，剩余信号量为:{}",semaphore.availablePermits());
        latch.countDown();
        int count=0;
        List<OcpehhccInfo> ocpehhccInfoList=new ArrayList<OcpehhccInfo>();
        for(int i=start;i<=end;i++) {
            OcpehhccInfo ocpehhccInfo=new OcpehhccInfo();
            String[] datas=lines[i].split("\\s+");
            ocpehhccInfo.setStationId(parseInt(datas[0]));
            //ocpehhccInfo.setYear(parseInt(datas[1]));
            ocpehhccInfo.setMonth(parseInt(datas[1]));
            ocpehhccInfo.setDay(parseInt(datas[2]));
            ocpehhccInfo.setTime(parseInt(datas[3]));
            ocpehhccInfo.setDbt(parseInt(datas[4]));
            ocpehhccInfo.setPre(parseInt(datas[5]));
            ocpehhccInfo.setRhm(parseInt(datas[6]));
            ocpehhccInfo.setwDir(parseInt(datas[7]));
            ocpehhccInfo.setwSpd(parseInt(datas[8]));
            ocpehhccInfo.setDpt(parseInt(datas[9]));
            ocpehhccInfo.setCc(parseDouble(datas[10]));
            ocpehhccInfo.setGsr(parseDouble(datas[11]));
            ocpehhccInfo.setDif(parseDouble(datas[12]));
            ocpehhccInfo.setDir(parseDouble(datas[13]));
            if (datas.length == 16) {
                ocpehhccInfo.setPct(parseDouble(datas[14]));
            } else {
                ocpehhccInfo.setPct(null);
            }
            ocpehhccInfoList.add(ocpehhccInfo);
            count++;
        }
        if(!ocpehhccInfoList.isEmpty()) {
            ocpehhccService.addOcpehhccList(ocpehhccInfoList);
        }
        semaphore.release();
        return count;
    }
}
