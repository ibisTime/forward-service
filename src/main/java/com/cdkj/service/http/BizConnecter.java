package com.cdkj.service.http;

import java.util.Properties;

import org.apache.log4j.Logger;

import com.cdkj.service.exception.BizException;
import com.cdkj.service.util.PropertiesUtil;
import com.cdkj.service.util.RegexUtils;

public class BizConnecter {

    private static Logger logger = Logger.getLogger(BizConnecter.class);

    public static final String YES = "0";

    public static final String MYXB_URL = PropertiesUtil.Config.MYXB_URL;

    public static final String ACCOUNT_URL = PropertiesUtil.Config.ACCOUNT_URL;

    public static final String SMS_URL = PropertiesUtil.Config.SMS_URL;

    public static <T> T getBizData(String code, String json, Class<T> clazz) {
        String data = getBizData(code, json);
        return JsonUtils.json2Bean(data, clazz);
    }

    public static String getBizData(String code, String json) {
        String data = null;
        String resJson = null;
        try {
            Properties formProperties = new Properties();
            formProperties.put("code", code);
            formProperties.put("json", json);
            resJson = PostSimulater.requestPostForm(getPostUrl(code),
                formProperties);
            logger.info("request:code<" + code + ">  json<" + json + ">\n");
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
                || code.startsWith("807")) {
            postUrl = MYXB_URL;
        } else if (code.startsWith("802")) {
            postUrl = ACCOUNT_URL;
        } else if (code.startsWith("804")) {
            postUrl = SMS_URL;
        }
        return postUrl;
    }
}
