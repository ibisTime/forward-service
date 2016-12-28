/**
 * @Title BaseController.java 
 * @Package com.hsnet.pz.controller 
 * @Description 
 * @author miyb  
 * @date 2014-8-19 上午10:54:17 
 * @version V1.0   
 */
package com.cdkj.service.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.cdkj.service.base.ControllerContext;
import com.cdkj.service.session.ISessionProvider;
import com.cdkj.service.session.SessionUser;
import com.cdkj.service.session.UserDetailHolder;

@Controller
public class BaseController {

    @Autowired
    protected ISessionProvider sessionProvider;

    /**
     * 获取session user
     * 
     * @return
     */
    protected SessionUser getSessionUser() {
        SessionUser user = (SessionUser) UserDetailHolder.getUserDetail();
        return user;
    }

    /**
     * 获取IP地址
     * 
     * @return
     */
    protected String getRemoteHost() {
        String ip = ControllerContext.getRequest().getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = ControllerContext.getRequest().getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = ControllerContext.getRequest().getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = ControllerContext.getRequest().getRemoteAddr();
        }
        return ip.equals("0:0:0:0:0:0:0:1") ? "127.0.0.1" : ip;
    }

    @RequestMapping(value = "/ip", method = RequestMethod.GET)
    public void getIp(HttpServletRequest request, HttpServletResponse response) {
        PrintWriter writer;
        try {
            writer = response.getWriter();
            writer.append("{ \"ip\" : \"" + getRemoteHost() + "\" }");
            writer.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
