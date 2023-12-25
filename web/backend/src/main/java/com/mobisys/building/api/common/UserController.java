package com.mobisys.building.api.common;

import com.mobisys.building.entity.UserInfo;
import com.mobisys.building.service.LoginService;
import com.mobisys.building.service.RegisterService;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.UnknownSessionException;
import org.apache.shiro.session.mgt.DefaultSessionKey;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.subject.support.DefaultSubjectContext;
import org.apache.shiro.web.servlet.Cookie;
import org.apache.shiro.web.servlet.SimpleCookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*",allowedHeaders = "*")
@RestController
@RequestMapping(value = "/user",method = RequestMethod.GET)
public class UserController {
    @Resource
    RegisterService registerService;
    @Autowired
    private LoginService loginService;
    SimpleCookie simpleCookie = new SimpleCookie();

    /**
     * 新用户用户注册
     */
    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public Map<String, Object> userregister(HttpServletRequest request,String phone,String name,String city,String work,String yjfk,Integer type,String qyxm,String pwd){

        Map<String, Object> modelMap = new HashMap<String, Object>();
        Map<String, Object> queryresu = new HashMap<String, Object>();
        UserInfo user = new UserInfo();
        user.setPhoneNum(phone);
        user.setUserName(name);
        user.setType(type);
        user.setCity(city);
        user.setIndustry(work);
        user.setInformation(yjfk);
        user.setCompanyName(qyxm);
        user.setRole(0);
        user.setPwd(pwd);
        Object registerStatue;
        try{
            queryresu = registerService.addUser(user);
            registerStatue = queryresu.get("注册状态");
            if (registerStatue.equals(true)){
                modelMap.put("success", true);
                modelMap.put("registerstatue", queryresu.get("失败原因"));
            }else{
                modelMap.put("success", false);
                modelMap.put("registerstatue", queryresu.get("失败原因"));
            }
        }catch (Exception e){
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }

        return modelMap;
    }

//    @RequestMapping(value = "/test", method = RequestMethod.GET)
//    public void retest(HttpServletRequest request) {
//        UserInfo userInfo = null;
//        userInfo.setPhoneNum("1");
//        System.out.println(userInfo);
//    }

//    @Resource
//    LoginService loginService;
//    @RequestMapping(value = "/testlogin", method = RequestMethod.GET)
//    public UserInfo retest(HttpServletRequest request) {
//       return loginService.login("1");
//    }


    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Map<String, Object> login(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> requestmap) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        String phone = (String) requestmap.get("phone");
        String password = (String) requestmap.get("password");
        System.out.println(requestmap);
        //用户认证信息  shiro
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken(phone, password);
        try {
            //进行验证，这里可以捕获异常，然后返回对应信息
            subject.login(usernamePasswordToken);
            simpleCookie.setName("Authorization");
            simpleCookie.setValue(subject.getSession().getId().toString()+"_"+phone);
            simpleCookie.setMaxAge(24*60*60);
            response.setHeader("Authorization",subject.getSession().getId().toString());
            modelMap.put("Authorization", subject.getSession().getId().toString()+"_"+phone);
            modelMap.put("success", true);
            modelMap.put("loginstatue", "登录成功！");
//            response.sendRedirect("/html/index.html");
//            subject.checkRole("admin");
//            subject.checkPermissions("query", "add");
        } catch (UnknownAccountException e) {
            modelMap.put("success", false);
            modelMap.put("loginstatue", "登录失败，用户名不存在！");
        } catch (AuthenticationException e) {
            modelMap.put("success", false);
            modelMap.put("loginstatue", "登录失败，账户密码错误！");
        } catch (AuthorizationException e) {
            modelMap.put("success", false);
            modelMap.put("loginstatue", "没有权限");
        }catch (Exception e){
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
        }
        return modelMap;
//        try{
//            //判断登陆是否成功
//            if (loginService.login(phone,password)){
//                //登陆成功
//
//                //跨域问题： The value of the 'Access-Control-Allow-Credentials' header in the response is '' which must be 'true' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.
//                response.setHeader("Access-Control-Allow-Credentials","true");
//
//                //创建session对象
//                HttpSession session = request.getSession();
//                //把用户账号和登录状态保存在session域对象中
//                session.setAttribute("loginPhone", phone);
//                session.setAttribute("loginStatue","login");
//
//                System.out.println(session.getAttribute("loginPhone"));
//                System.out.println(session.getId());
//                request.getSession().setMaxInactiveInterval(60*10);//设置session存储时间，以秒为单位
//                //跳转到用户主页
////                response.sendRedirect("/a.html");
//                System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//                modelMap.put("success", true);
//                modelMap.put("loginstatue", "登录成功！");
//            }else {
//                modelMap.put("success", false);
//                modelMap.put("loginstatue", "登录失败，账户密码错误！");
//            }
//        }catch (Exception e){
//            modelMap.put("success", false);
//            modelMap.put("errMsg", e.getMessage());
//        }

    }
    /**
     * 登出操作
     */
    @RequestMapping("/logout")
    public Map<String, Object> logout(HttpSession session, Model model) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
        modelMap.put("success", true);
        modelMap.put("loginstatue", "退出成功！");
        return modelMap;
    }
    /**
     * 未登录
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/unauth")
    @ResponseBody
    public Map<String, Object> unauth(HttpServletRequest request) throws Exception {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success",true);
        modelMap.put("loginstatue","请重新登录");
        return modelMap;
    }
    /**
     * 登录检测
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/loginCheck")
    @ResponseBody
    public Map<String, Object> loginCheck(HttpServletRequest request,String cookieId) throws Exception {
        System.out.println(cookieId);
        Map<String, Object> modelMap = new HashMap<String, Object>();
        //shiro
        String cookieId_true = simpleCookie.getValue();
        System.out.println(cookieId_true);
        if (StringUtils.isNotEmpty(cookieId)&&StringUtils.isNotEmpty(cookieId_true)&&cookieId_true.equals(cookieId)){
            modelMap.put("success",true);
            modelMap.put("loginstatue","检测成功");
        }else{
            modelMap.put("success",false);
            modelMap.put("loginstatue","检测失败");
        }

        return modelMap;
    }
    /**
     * 权限检测
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/checkPermission")
    @ResponseBody
    public Map<String, Object> checkPermission(HttpServletRequest request,String cookieId) throws Exception {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        String[] strs = cookieId.split("_");
        if(strs.length>2){
            UserInfo userInfo = loginService.getUserByPhone(strs[1]);
            if (userInfo.getRole() == 2){
                modelMap.put("success",true);
                modelMap.put("loginstatue","拥有权限");
            }else{
                modelMap.put("success",false);
                modelMap.put("loginstatue","没有使用权限");
            }
        }else {
            modelMap.put("success",false);
            modelMap.put("loginstatue","数据错误");
        }



        return modelMap;
    }
    /**
     * 数据录入权限检测
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/checkInputPermission")
    @ResponseBody
    public Map<String, Object> checkInputPermission(HttpServletRequest request,String cookieId) throws Exception {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        String[] strs = cookieId.split("_");
        UserInfo userInfo = loginService.getUserByPhone(strs[1]);
        if (userInfo.getRole() ==1||userInfo.getRole()==2){
            modelMap.put("success",true);
            modelMap.put("loginstatue","拥有权限");
        }else{
            modelMap.put("success",false);
            modelMap.put("loginstatue","没有使用权限");
        }

        return modelMap;
    }
    /**
     * 通过手机号获取用户
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/getUserByPhone")
    @ResponseBody
    public Map<String, Object> getUserByPhone(HttpServletRequest request,String phoneNum) throws Exception {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        UserInfo userInfos = loginService.getUserByPhone(phoneNum);
        if (userInfos!=null){
            modelMap.put("res",userInfos);
            modelMap.put("success",true);
        }else{
            modelMap.put("success",false);
        }

        return modelMap;
    }
    /**
     * 修改用户权限
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/updateUserRole")
    @ResponseBody
    public Map<String, Object> updateUserRole(HttpServletRequest request,String phoneNum) throws Exception {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        UserInfo userInfos = loginService.getUserByPhone(phoneNum);
        userInfos.setRole(1);
        boolean flag = loginService.updateUser(userInfos);
        if (flag){
            modelMap.put("success",true);
        }else{
            modelMap.put("success",false);
        }

        return modelMap;
    }

}
