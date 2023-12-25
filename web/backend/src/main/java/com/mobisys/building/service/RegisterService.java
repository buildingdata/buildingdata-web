package com.mobisys.building.service;

import com.mobisys.building.entity.UserInfo;

import java.util.Map;

public interface RegisterService {
    /**
     * 注册新用户，检查用户是否存在，存在报错，不存在则插入
     */
    Map<String,Object> addUser(UserInfo user);
}
