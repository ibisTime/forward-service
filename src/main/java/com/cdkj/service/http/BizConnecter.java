package com.cdkj.service.http;

import java.util.Properties;

import org.apache.log4j.Logger;

import com.cdkj.service.exception.BizException;
import com.cdkj.service.util.PropertiesUtil;
import com.cdkj.service.util.RegexUtils;

public class BizConnecter {

    private static Logger logger = Logger.getLogger(BizConnecter.class);

    public static final String YES = "0";

    public static final String USER_URL = PropertiesUtil.Config.USER_URL;

    public static final String ACCOUNT_URL = PropertiesUtil.Config.ACCOUNT_URL;

    public static final String CERTI_URL = PropertiesUtil.Config.CERTI_URL;

    public static final String SMS_URL = PropertiesUtil.Config.SMS_URL;

    public static final String CORE_URL = PropertiesUtil.Config.CORE_URL;

    public static final String ZHPAY_URL = PropertiesUtil.Config.ZHPAY_URL;

    public static final String MALL_URL = PropertiesUtil.Config.MALL_URL;

    public static final String LOAN_URL = PropertiesUtil.Config.LOAN_URL;

    public static final String TOUR_URL = PropertiesUtil.Config.TOUR_URL;

    public static final String PIPE_URL = PropertiesUtil.Config.PIPE_URL;

    public static final String DZT_URL = PropertiesUtil.Config.DZT_URL;

    public static final String ACTIVITY_URL = PropertiesUtil.Config.ACTIVITY_URL;

    public static final String SERVICE_URL = PropertiesUtil.Config.SERVICE_URL;

    public static final String HEALTH_URL = PropertiesUtil.Config.HEALTH_URL;

    public static final String GYM_URL = PropertiesUtil.Config.GYM_URL;

    public static final String RENT_URL = PropertiesUtil.Config.RENT_URL;

    public static String getBizData(String code, String json) {
        String data = null;
        String resJson = null;
        try {
            Properties formProperties = new Properties();
            formProperties.put("code", code);
            formProperties.put("json", json);
            resJson = PostSimulater.requestPostForm(getPostUrl(code),
                formProperties);
        } catch (Exception e) {
            throw new BizException("Biz000", "链接请求超时，请联系管理员");
        }
        // 开始解析响应json
        String errorCode = RegexUtils.find(resJson, "errorCode\":\"(.+?)\"", 1);
        String errorInfo = RegexUtils.find(resJson, "errorInfo\":\"(.+?)\"", 1);
        logger.info("request:code<" + code + ">  json<" + json
                + ">\nresponse:errorCode<" + errorCode + ">  errorInfo<"
                + errorInfo + ">");
        if (YES.equalsIgnoreCase(errorCode)) {
            data = RegexUtils.find(resJson, "data\":(.*)\\}", 1);
        } else {
            throw new BizException(errorCode, errorInfo);
        }
        return data;
    }

    public static String getPostUrl(String code) {
        String postUrl = null;
        if (code.startsWith("805") || code.startsWith("806")
                || code.startsWith("807") || code.startsWith("001")) {
            postUrl = USER_URL;
        } else if (code.startsWith("802") || code.startsWith("002")) {
            postUrl = ACCOUNT_URL;
        } else if (code.startsWith("804")) {
            postUrl = SMS_URL;
        } else if (code.startsWith("808")) {
            postUrl = MALL_URL;
        } else if (code.startsWith("801")) {
            postUrl = CORE_URL;
        } else if (code.startsWith("615")) {
            postUrl = ZHPAY_URL;
        } else if (code.startsWith("617")) {
            postUrl = LOAN_URL;
        } else if (code.startsWith("618")) {
            postUrl = TOUR_URL;
        } else if (code.startsWith("619")) {
            postUrl = PIPE_URL;
        } else if (code.startsWith("620")) {
            postUrl = DZT_URL;
        } else if (code.startsWith("660")) {
            postUrl = ACTIVITY_URL;
        } else if (code.startsWith("612")) {
            postUrl = SERVICE_URL;
        } else if (code.startsWith("621")) {
            postUrl = HEALTH_URL;
        } else if (code.startsWith("622")) {
            postUrl = GYM_URL;
        } else if (code.startsWith("798")) {
            postUrl = CERTI_URL;
        } else if (code.startsWith("810")) {
            postUrl = RENT_URL;
        }
        return postUrl;
    }
}
