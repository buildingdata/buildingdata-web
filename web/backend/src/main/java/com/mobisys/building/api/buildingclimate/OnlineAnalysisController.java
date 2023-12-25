package com.mobisys.building.api.buildingclimate;

import com.mobisys.building.service.impl.OnlineAnalysisServiceImpl;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import sun.misc.BASE64Encoder;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * @Author blankjee
 * @Date 2020/8/31 19:44
 */
@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping(value = "/basicclimate", method = RequestMethod.GET)
public class OnlineAnalysisController {
    @Resource
    private OnlineAnalysisServiceImpl onlineAnalysisService;

    @RequestMapping(value = "/OADrawPic", method = RequestMethod.GET)
    private Map<String,Object> drawPic(HttpServletRequest request) throws IOException {
        String draft = request.getParameter("draft");
        String thermal_storage_draft = request.getParameter("thermal_storage_draft");
        String evaporative = request.getParameter("evaporative");
        String passive = request.getParameter("passive");
        String dataTime = request.getParameter("dataTime");
        String beginTime = request.getParameter("beginTime");
        String toTime = request.getParameter("toTime");
        String dataMonth = request.getParameter("dataMonth");
        String beginMonth = request.getParameter("beginMonth");
        String toMonth = request.getParameter("toMonth");
        String fixedMonth = request.getParameter("fixedMonth");
        String city = request.getParameter("city");
        BufferedImage img = onlineAnalysisService.createOnlineAnalysisPic( draft,  thermal_storage_draft,  evaporative,  passive,  dataTime,  beginTime,  toTime,  dataMonth,  beginMonth,  toMonth,  fixedMonth,  city);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();//io流
        ImageIO.write(img, "png", baos);//写入流中
        byte[] bytes = baos.toByteArray();//转换成字节
        BASE64Encoder encoder = new BASE64Encoder();
        String png_base64 =  encoder.encodeBuffer(bytes).trim();//转换成base64串
        png_base64 = png_base64.replaceAll("\n", "").replaceAll("\r", "");//删除 \r\n
        Map<String,Object> model = new HashMap<>();
        model.put("code",200);
        model.put("imgb64",png_base64);
        return model;
//        return onlineAnalysisService.createOnlineAnalysisPic();
    }
}
