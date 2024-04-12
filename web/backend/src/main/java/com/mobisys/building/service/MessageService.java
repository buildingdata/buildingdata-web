package com.mobisys.building.service;

import java.util.Map;

public interface MessageService {

    /**
     * 发送短信的方法
     */
    public Map<String,Object> SendSms(String phone);
}
