package com.mobisys.building.service;

import com.mobisys.building.entity.UserInfo;
import org.apache.catalina.User;

import java.util.List;

public interface LoginService {
    /**
     * 用户登录检查
     */
    boolean login(String phone,String password);

    UserInfo getUserByPhone(String phone);

    List<UserInfo> getAllUser();

    boolean updateUser(UserInfo userInfo);
}
