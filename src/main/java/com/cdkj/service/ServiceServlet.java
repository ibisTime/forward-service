package com.cdkj.service;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.cdkj.service.proxy.DispatcherImpl;
import com.cdkj.service.proxy.IDispatcher;
import com.cdkj.service.spring.SpringContextHolder;

public class ServiceServlet extends HttpServlet {
    static Logger logger = Logger.getLogger(ServiceServlet.class);

    private IDispatcher dispatcher = SpringContextHolder
        .getBean(DispatcherImpl.class);

    /** 
     * @Fields serialVersionUID : TODO(用一句话描述这个变量表示什么) 
     */
    private static final long serialVersionUID = 6175432226630152841L;

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        logger.info("Successful Deployment");
        PrintWriter writer = response.getWriter();
        writer.append("Version:1.9.6 \n");
        writer.append("Description:forward-service theia 1st \n");
        writer.flush();
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        String code = request.getParameter("code");
        String json = request.getParameter("json");
        String ip = getIpAddr(request);
        // 返回token添加给前端
        String subString = json.substring(0, json.lastIndexOf("}"));
        if ("{".equals(subString)) {
            json = subString + "\"ip\":\"" + ip + "\"}";
        } else {
            json = subString + ", \"ip\":\"" + ip + "\"}";
        }
        String result = dispatcher.doDispatcher(code, json);
        PrintWriter writer = response.getWriter();
        writer.append(result);
        writer.flush();
    }

    public static void main(String[] args) {
        String json = "{}";
        String subString = json.substring(0, json.lastIndexOf("}"));
        if ("{".equals(subString)) {
            json = subString + "\"ip\":\"" + "4453" + "\"}";
        } else {
            json = subString + ", \"ip\":\"" + "4453" + "\"}";
        }
        System.out.println(json);
    }

    /**
     * 获取访问者IP
     * 
     * 在一般情况下使用Request.getRemoteAddr()即可，但是经过nginx等反向代理软件后，这个方法会失效。
     * 
     * 本方法先从Header中获取X-Real-IP，如果不存在再从X-Forwarded-For获得第一个IP(用,分割)，
     * 如果还不存在则调用Request .getRemoteAddr()。
     * 
     * @param request
     * @return
     */
    private String getIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("X-Real-IP");
        if (!StringUtils.isBlank(ip) && !"unknown".equalsIgnoreCase(ip)) {
            return ip;
        }
        ip = request.getHeader("X-Forwarded-For");
        if (!StringUtils.isBlank(ip) && !"unknown".equalsIgnoreCase(ip)) {
            // 多次反向代理后会有多个IP值，第一个为真实IP。
            int index = ip.indexOf(',');
            if (index != -1) {
                return ip.substring(0, index);
            } else {
                return ip;
            }
        } else {
            return request.getRemoteAddr();
        }
    }
}
