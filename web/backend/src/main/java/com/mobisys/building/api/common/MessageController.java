package com.mobisys.building.api.common;

//import com.aliyuncs.CommonRequest;
//import com.aliyuncs.CommonResponse;
//import com.aliyuncs.DefaultAcsClient;
//import com.aliyuncs.IAcsClient;
//import com.aliyuncs.exceptions.ClientException;
//import com.aliyuncs.exceptions.ServerException;
//import com.aliyuncs.http.MethodType;
//import com.aliyuncs.profile.DefaultProfile;
//import net.sf.json.JSONObject;

import com.aliyuncs.CommonResponse;
import com.mobisys.building.service.MessageService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping(value = "/message", method = RequestMethod.GET)
public class MessageController {

    /**
     * （阿里云）发送短信验证码的接口
     * 需要参数：手机号
     * 返回参数包装在Map类型的model里面：1.Statue：发送状态 2.responseData：发送短信的基本信息 3.verificationCode：若发送成功，则会有发送的验证码
     */
    @Resource
    private MessageService messageService;
    @RequestMapping(value = "/sendmessage", method = RequestMethod.GET)
    public Map<String, Object> sendMessages(HttpServletRequest request,String phoneNum){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        Map map = new HashMap();
        try{
            map = messageService.SendSms(phoneNum);
            CommonResponse response = null;
            //将Object类型转化成CommonResponse类型，从而得到里面的data
            if(map.get("response") instanceof CommonResponse){
                response=(CommonResponse)map.get("response");
            }
//            System.out.println(response.getData().substring(11,12));
            if (map.get("Statue").equals("success")){
//                if (response.getData().)
                modelMap.put("success", true);
                modelMap.put("verificationCode",map.get("code"));
                modelMap.put("responseData",response.getData());
            }else {
                modelMap.put("success", false);
                modelMap.put("errMsg",map.get("errMsg"));
                modelMap.put("responseData",response.getData());
            }
        }catch (Exception e){
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        return modelMap;
    }
}
