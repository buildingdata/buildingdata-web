package com.mobisys.building.service.impl;

import com.aliyuncs.CommonRequest;
import com.aliyuncs.CommonResponse;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.exceptions.ServerException;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;
import com.mobisys.building.service.MessageService;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class MessageServiceImpl implements MessageService {

    //TODO 此处是阿里云的AK，需要的话可以替换成开发者自己的AK(在阿里云访问控制台寻找)
    static final String accessKeyId = "accessKeyId";
    static final String accessKeySecret = "accessKeySecret";
    //短信签名名称——请在控制台签名管理页面签名名称一列查看。
    static final String SignName = "建筑节能";
    //短信模板ID——请在控制台模板管理页面模板CODE一列查看。
    static final String TemplateCode = "SMS_177243057";

    /**
     * 随机生成6位数字作为验证码
     * @return
     */
    public static String getCode(){
        int code=(int)(Math.random()*9000+100000);
        return code + "";
    }

    /**
     * 发送短信的方法
     */
    @Override
    public Map<String, Object> SendSms(String phone) {
        //初始化IAcsClient
        DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", accessKeyId, accessKeySecret);
        IAcsClient client = new DefaultAcsClient(profile);

        Map<String,Object> MessageInfo = new HashMap<>();
        //组装请求对象
        CommonRequest request = new CommonRequest();
        request.setMethod(MethodType.POST);
        //云通信产品-短信API服务产品域名（接口地址固定，无需修改）
        request.setDomain("dysmsapi.aliyuncs.com");
        request.setVersion("2017-05-25");
        request.setAction("SendSms");
        request.putQueryParameter("RegionId", "cn-hangzhou");
        //必填：待发送的电话号码
        request.putQueryParameter("PhoneNumbers", phone);
        //必填：短信签名——可在短信控制台中查找
        request.putQueryParameter("SignName", SignName);
        //必填：短信模板号——可在短信控制台中查找
        request.putQueryParameter("TemplateCode", TemplateCode);
        //需要将验证码以JSON的形式放入模板中，所以做如下操作
        HashMap map = new HashMap<>();
        String verificationCode = getCode();
        map.put("code",verificationCode);
        JSONObject object = JSONObject.fromObject(map);
        //必填：模板参数，可在模板中查看，为JSON字符串形式
        request.putQueryParameter("TemplateParam", object.toString());
//        //可选填：上行短信扩展码，无特殊需要此字段的用户请忽略此字段。
//        request.putQueryParameter("SmsUpExtendCode", SmsUpExtendCode);
//        //可选填：外部流水扩展字段。
//        request.putQueryParameter("OutId", "waibuliushuikuozhan");
        try {
            CommonResponse response = client.getCommonResponse(request);
            System.out.println(response.getData());
            map.put("Statue","success");
            map.put("response",response);
            return map;
        } catch (ServerException e) {
            e.printStackTrace();
            map.put("Statue","false");
            map.put("errMsg",e.getMessage());
            return map;
        } catch (ClientException e) {
            e.printStackTrace();
            map.put("Statue","false");
            map.put("errMsg",e.getMessage());
            return map;
        }
    }
}
