package com.mobisys.building.service.impl;

import com.mobisys.building.dao.UserDao;
import com.mobisys.building.entity.UserInfo;
import com.mobisys.building.service.RegisterService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@Service
public class RegisterServiceImpl implements RegisterService {

    @Resource
    UserDao userDao;

    @Override
    public Map<String,Object> addUser(UserInfo user) {
        Map<String,Object> Moudel = new HashMap<>();
        if(userDao.queryUserByPhone(user.getPhoneNum()) == null){
            try{
                userDao.insertUser(user);
                Moudel.put("注册状态",true);
                Moudel.put("失败原因","注册成功，请登录！");
            }catch(Exception e){
                Moudel.put("注册状态",false);
                Moudel.put("失败原因","注册失败，请重新注册！");
            }
        }else{
            Moudel.put("注册状态",false);
            Moudel.put("失败原因","注册失败，此账户已被注册！");
        }
        return Moudel;
    }
}
