package com.mobisys.building.service.impl;

import com.mobisys.building.entity.UserInfo;
import com.mobisys.building.service.LoginService;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

/**
 * @author tao
 * @date 2021/7/14 11:01 上午
 */
public class LoginRealm extends AuthorizingRealm {
    @Autowired
    private LoginService loginService;

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        //获取登录用户名
        String phone = (String) principalCollection.getPrimaryPrincipal();
        //查询用户名称
        UserInfo user = loginService.getUserByPhone(phone);
        //添加角色和权限
        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
//        simpleAuthorizationInfo.addRole("supper_admin");
//        simpleAuthorizationInfo.addRole("admin");
//        simpleAuthorizationInfo.addRole("user");
//        simpleAuthorizationInfo.addStringPermission(permissions.getPermissionsName());
////        for (Role role : user.getRoles()) {
////            //添加角色
////            simpleAuthorizationInfo.addRole(role.getRoleName());
////            //添加权限
////            for (Permissions permissions : role.getPermissions()) {
////                simpleAuthorizationInfo.addStringPermission(permissions.getPermissionsName());
////            }
////        }
        return simpleAuthorizationInfo;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        if (StringUtils.isEmpty(authenticationToken.getPrincipal())) {
            return null;
        }
        //获取用户信息
        String phone = authenticationToken.getPrincipal().toString();
        UserInfo user = loginService.getUserByPhone(phone);
        if (user == null) {
            //这里返回后会报出对应异常
            return null;
        } else {
            //这里验证authenticationToken和simpleAuthenticationInfo的信息
            SimpleAuthenticationInfo simpleAuthenticationInfo = new SimpleAuthenticationInfo(phone, user.getPwd().toString(), getName());
            return simpleAuthenticationInfo;
        }
    }
}
