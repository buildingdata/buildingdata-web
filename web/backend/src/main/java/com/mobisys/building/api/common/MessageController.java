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

//
//    /**
//     * 发送短信的方法
//     */
//    public static Map<String,Object> SendSms(String phone, String verificationCode){
//
//        //初始化IAcsClient
//        DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", accessKeyId, accessKeySecret);
//        IAcsClient client = new DefaultAcsClient(profile);
//
//        Map<String,Object> MessageInfo = new HashMap<>();
//        //组装请求对象
//        CommonRequest request = new CommonRequest();
//        request.setMethod(MethodType.POST);
//        //云通信产品-短信API服务产品域名（接口地址固定，无需修改）
//        request.setDomain("dysmsapi.aliyuncs.com");
//        request.setVersion("2017-05-25");
//        request.setAction("SendSms");
//        request.putQueryParameter("RegionId", "cn-hangzhou");
//        //必填：待发送的电话号码
//        request.putQueryParameter("PhoneNumbers", phone);
//        //必填：短信签名——可在短信控制台中查找
//        request.putQueryParameter("SignName", SignName);
//        //必填：短信模板号——可在短信控制台中查找
//        request.putQueryParameter("TemplateCode", TemplateCode);
//        //需要将验证码以JSON的形式放入模板中，所以做如下操作
//        HashMap map = new HashMap<>();
//        map.put("code",verificationCode);
//        JSONObject object = JSONObject.fromObject(map);
//        //必填：模板参数，可在模板中查看，为JSON字符串形式
//        request.putQueryParameter("TemplateParam", object.toString());
////        //可选填：上行短信扩展码，无特殊需要此字段的用户请忽略此字段。
////        request.putQueryParameter("SmsUpExtendCode", SmsUpExtendCode);
////        //可选填：外部流水扩展字段。
////        request.putQueryParameter("OutId", "waibuliushuikuozhan");
//        try {
//            CommonResponse response = client.getCommonResponse(request);
//            System.out.println(response.getData());
//            map.put("Statue","success");
//            map.put("response",response);
//            return map;
//        } catch (ServerException e) {
//            e.printStackTrace();
//            map.put("Statue","false");
//            map.put("errMsg",e.getMessage());
//            return map;
//        } catch (ClientException e) {
//            e.printStackTrace();
//            map.put("Statue","false");
//            map.put("errMsg",e.getMessage());
//            return map;
//        }
//    }
//
//    /**
//     * 随机生成6位数字作为验证码
//     * @return
//     */
//    public static String getCode(){
//        int code=(int)(Math.random()*9000+100000);
//        return code + "";
//    }
//
//    /**
//     * 测试主函数
//     * @param args
//     * @throws ClientException
//     * @throws InterruptedException
//     */
//    public static void main(String[] args) throws ClientException, InterruptedException {
//        String verificationCode = getCode();
//        System.out.println(verificationCode);
//        //发短信
//        Map response = SendSms("17319907136",verificationCode);
//    }

