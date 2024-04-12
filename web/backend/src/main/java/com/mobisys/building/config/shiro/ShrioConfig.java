package com.mobisys.building.config.shiro;

import com.mobisys.building.service.impl.LoginRealm;
import org.apache.shiro.codec.Base64;
import org.apache.shiro.session.mgt.SessionManager;
import org.apache.shiro.session.mgt.eis.EnterpriseCacheSessionDAO;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.CookieRememberMeManager;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.web.servlet.SimpleCookie;
import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.DispatcherType;
import java.util.HashMap;
import java.util.Map;

/**
 * @author tao
 * @date 2021/7/14 10:57 上午
 */
@Configuration
public class ShrioConfig {
    @Bean
    @ConditionalOnMissingBean
    public DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator() {
        DefaultAdvisorAutoProxyCreator defaultAAP = new DefaultAdvisorAutoProxyCreator();
        defaultAAP.setProxyTargetClass(true);
        return defaultAAP;
    }

    //将自己的验证方式加入容器
    @Bean
    public LoginRealm myShiroRealm() {
        LoginRealm LoginRealm = new LoginRealm();
        return LoginRealm;
    }
    //权限管理，配置主要是Realm的管理认证
    @Bean
    public SecurityManager securityManager() {
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        securityManager.setRealm(myShiroRealm());
        securityManager.setSessionManager(sessionManager());
        return securityManager;
    }

    //Filter工厂，设置对应的过滤条件和跳转条件
    @Bean
    public ShiroFilterFactoryBean shiroFilterFactoryBean(SecurityManager securityManager) {
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        shiroFilterFactoryBean.setSecurityManager(securityManager);
        Map<String, String> map = new HashMap<>();
        //登出
        map.put("/logout", "logout");
        //以下页面不检测
        map.put("/user/**", "anon");
        map.put("/message/**", "anon");
        map.put("/html/*.html", "anon");

        //对所有用户认证
        map.put("/**", "anon");
        //登录
        shiroFilterFactoryBean.setLoginUrl("/user/unauth");
        //首页
        //shiroFilterFactoryBean.setSuccessUrl("/html/index.html");
        //错误页面，认证不通过跳转
        shiroFilterFactoryBean.setUnauthorizedUrl("/error");
        shiroFilterFactoryBean.setFilterChainDefinitionMap(map);
        return shiroFilterFactoryBean;
    }
    //跨域请求处理
    @Bean
    public FilterRegistrationBean replaceTokenFilter(){
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setName("MyOptionsFilter");//spring 协助注入，注意名称不要重复
        registration.setFilter( new MyOptionsFilter());
        registration.setDispatcherTypes(DispatcherType.REQUEST); //拦截请求
        registration.addUrlPatterns("/*");//拦截请求url
        registration.setOrder(1);//排序第一，避免影响。
        return registration;
    }
    /**
     * 会话管理
     **/
    @Bean
    public SessionManager sessionManager() {
        MySessionManager sessionManager = new MySessionManager();
        sessionManager.setSessionIdUrlRewritingEnabled(false); //取消登陆跳转URL后面的jsessionid参数
        sessionManager.setGlobalSessionTimeout(-1);//不过期
        sessionManager.setSessionDAO(new EnterpriseCacheSessionDAO());
        return sessionManager;
    }

    @Bean
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(SecurityManager securityManager) {
        AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor = new AuthorizationAttributeSourceAdvisor();
        authorizationAttributeSourceAdvisor.setSecurityManager(securityManager);
        return authorizationAttributeSourceAdvisor;

    }
}
