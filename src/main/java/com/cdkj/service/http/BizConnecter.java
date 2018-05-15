package com.cdkj.service.http;

import java.util.Properties;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.cdkj.service.exception.BizException;
import com.cdkj.service.util.PropertiesUtil;
import com.cdkj.service.util.RegexUtils;

public class BizConnecter {

    private static Logger logger = Logger.getLogger(BizConnecter.class);

    public static final String YES = "0";

    public static final String SMS_URL = PropertiesUtil.Config.SMS_URL;

    public static final String HTWT_URL = PropertiesUtil.Config.HTWT_URL;

    public static String getBizData(String code, String json, String operator) {
        String data = null;
        String resJson = null;
        try {
            Properties formProperties = new Properties();
            formProperties.put("code", code);
            formProperties.put("json", json);
            if (StringUtils.isNotBlank(operator)) {
                formProperties.put("operator", operator);
            }
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
        if (code.startsWith("804")) {
            postUrl = SMS_URL;
        } else {
            postUrl = HTWT_URL;
        }
        return postUrl;
    }
}
