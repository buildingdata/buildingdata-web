package com.mobisys.building.service;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;

/**
 * @Author blankjee
 * @Date 2020/9/2 15:58
 */
public interface OnlineAnalysisService {
    //绘制在线建筑分析图片的入口方法
    BufferedImage createOnlineAnalysisPic(String draft, String thermal_storage_draft, String evaporative, String passive, String dataTime, String beginTime, String toTime, String dataMonth, String beginMonth, String toMonth, String fixedMonth, String city) throws IOException;
    //生成图片文件，由入口方法调用
    BufferedImage createPictureAction(String draft, String thermal_storage_draft, String evaporative, String passive, String dataTime, String beginTime, String toTime, String dataMonth, String beginMonth, String toMonth, String fixedMonth, String city) throws IOException;

    void createPicture(Graphics2D g, String draft,
                       String thermal_storage_draft,
                       String evaporative, String passive,
                       String dataTime, String beginTime, String toTime,
                       String dataMonth, String beginMonth, String toMonth, String fixedMonth, String city);

    void calcuTout(String dataTime, String beginTime,
                   String toTime, String dataMonth,
                   String beginMonth, String toMonth,
                   String fixedMonth, String city);

    void drawSpiral(Graphics2D g, String draft, String thermal_storage_draft, String evaporative, String passive);

    void drawPoint2(Graphics2D g, String draft, String thermal_storage_draft,
                    String evaporative, String passive, String beginTime,
                    String toTime, String beginMonth, String toMonth, String city2); //使用温度 相对湿度为数据源画图
}
