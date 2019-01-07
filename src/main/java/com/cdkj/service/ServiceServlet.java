package com.cdkj.service;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.cdkj.service.enums.EBoolean;
import com.cdkj.service.enums.EFunction;
import com.cdkj.service.enums.ELanguage;
import com.cdkj.service.http.JsonUtils;
import com.cdkj.service.proxy.DispatcherImpl;
import com.cdkj.service.proxy.IDispatcher;
import com.cdkj.service.proxy.Result;
import com.cdkj.service.proxy.ReturnMessageUrl;
import com.cdkj.service.spring.SpringContextHolder;

public class ServiceServlet extends HttpServlet {
    static Logger logger = Logger.getLogger(ServiceServlet.class);

    private IDispatcher dispatcher = SpringContextHolder
        .getBean(DispatcherImpl.class);

    /** 
     * @Fields serialVersionUID : TODO(用一句话描述这个变量表示什么) 
     */
    private static final long serialVersionUID = 6175432226630152841L;

    protected void doGet(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        logger.info("Successful Deployment");
        PrintWriter writer = response.getWriter();
        writer.append("Version:1.0.0 \n");
        writer.append("Description:forward-service ogc-standard 1st \n");
        writer.flush();
    }

    protected void doPost(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        String code = request.getParameter("code");
        String json = request.getParameter("json");
        System.out.println(request.getHeader("Content-Type")
                + request.getHeader("Accept-Language"));
        String language = request.getHeader("Accept-Language") == null ? "zh_CN"
                : request.getHeader("Accept-Language");

        if (!ELanguage.zh_CN.getCode().equals(language)
                && !ELanguage.en_US.getCode().equals(language)) {
            language = ELanguage.zh_CN.getCode();
        }
        Result result = dispatcher.doDispatcher(code, json, language);
        if (EFunction.TokenVisit.getCode().equals(code)
                && EBoolean.NO.getCode().equals(result.getErrorCode())) {
            ReturnMessageUrl data = JsonUtils.json2Bean(result.getResult(),
                ReturnMessageUrl.class);
            response.sendRedirect(data.getData().getPostUrl() + "?token="
                    + result.getToken() + "&userId=" + result.getUserId());
        } else {
            PrintWriter writer = response.getWriter();
            writer.append(result.getResult());
            writer.flush();
        }
    }

    public static void main(String[] args) {
        String result = "{\"errorCode\":\"0\",\"errorInfo\":\"成功\",\"data\":{\"postUrl\":\"http://m.funmvp.com/index.html\"}}";
        ReturnMessageUrl data = JsonUtils.json2Bean(result,
            ReturnMessageUrl.class);
        System.out.println(data.getData().getPostUrl());
    }
}
