package com.mobisys.building.api.common;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping(value = "/session", method = RequestMethod.GET)
public class SessionController {

    //登陆检测
    @RequestMapping(value = "/loginCheck", method = RequestMethod.GET)
    public Map<String, Object> userregister(HttpServletRequest request, HttpServletResponse response){
        Map<String, Object> modelMap = new HashMap<String, Object>();

        //跨域问题： The value of the 'Access-Control-Allow-Credentials' header in the response is '' which must be 'true' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.
        response.setHeader("Access-Control-Allow-Credentials","true");
        //得到session对象
        HttpSession session = request.getSession(false);
//        System.out.println("这里这里"+session);
        if(session==null){
            modelMap.put("success", false);
            modelMap.put("msgInfo","没有读取到session");
            return modelMap;
        }
        String phone = (String)session.getAttribute("loginPhone");
        String loginStatue = (String) session.getAttribute("loginStatue");
        System.out.println("登录状态"+loginStatue);
        if(loginStatue.equals("login")){
            modelMap.put("success", true);
            modelMap.put("loginPhone", phone);
            return modelMap;
        }else {
            modelMap.put("success", false);
            modelMap.put("msgInfo","未登陆，请先登陆");
            return modelMap;
        }
    }

    //注销
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public Map<String, Object> logout(HttpServletRequest request, HttpServletResponse response){
        Map<String, Object> modelMap = new HashMap<String, Object>();

        //跨域问题： The value of the 'Access-Control-Allow-Credentials' header in the response is '' which must be 'true' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.
        response.setHeader("Access-Control-Allow-Credentials","true");
        //得到session对象
        HttpSession session = request.getSession(false);
//        System.out.println("这里这里"+session);
        if(session==null){
            modelMap.put("success", false);
            modelMap.put("msgInfo","没有读取到session");
            return modelMap;
        }
        String phone = (String)session.getAttribute("loginPhone");
        session.setAttribute("loginStatue","logout");
        String loginStatue = (String) session.getAttribute("loginStatue");
        System.out.println("登录状态"+loginStatue);
        if(loginStatue.equals("logout")){
            modelMap.put("success", true);
            modelMap.put("successInfo", "注销成功！");
            return modelMap;
        }else {
            modelMap.put("success", false);
            modelMap.put("msgInfo","注销失败，请重新注销！");
            return modelMap;
        }
    }
}
