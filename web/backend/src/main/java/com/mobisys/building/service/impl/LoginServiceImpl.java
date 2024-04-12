package com.mobisys.building.service.impl;

import com.mobisys.building.dao.UserDao;
import com.mobisys.building.entity.UserInfo;
import com.mobisys.building.service.LoginService;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class LoginServiceImpl implements LoginService {
    @Resource
    UserDao userDao;

    /**
     * 登录检测
     * @param phone
     * @return
     */
    @Override
    public boolean login(String phone,String password) {
        UserInfo userInfo = userDao.queryUserByPhone(phone);
        if (userInfo != null){
            if(userInfo.getPwd().equals(password)){
                return true;
            }else{
                return false;
            }
        }else {
            return false;
        }
    }

    @Override
    public UserInfo getUserByPhone(String phone) {
        UserInfo userInfo = userDao.queryUserByPhone(phone);
        if (userInfo != null){
            return userInfo;
        }
        return null;
    }

    @Override
    public List<UserInfo> getAllUser() {
        List<UserInfo> userInfos = userDao.queryAllUser();
        return userInfos;
    }

    @Override
    public boolean updateUser(UserInfo userInfo) {
        Integer i = userDao.updateUser(userInfo);
        if (i==1){
            return true;
        }
        return false;
    }

}
