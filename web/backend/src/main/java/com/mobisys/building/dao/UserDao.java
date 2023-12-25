package com.mobisys.building.dao;

import com.mobisys.building.entity.UserInfo;

import java.util.List;

public interface UserDao {
    /**
     * 按照手机号查询用户
     */
    UserInfo queryUserByPhone(String phone);

    /**
     * 加入新用户
     */
    boolean insertUser(UserInfo user);

    /**
     * 按照用户名查询用户
     */
    UserInfo queryUserByName(String name);

    List<UserInfo> queryAllUser();

    Integer updateUser(UserInfo userInfo);
}
