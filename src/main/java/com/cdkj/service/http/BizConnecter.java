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

    public static final String HMONEY_URL = PropertiesUtil.Config.HMONEY_URL;

    public static final String CONTENT_TYPE = "Content-Type";

    public static final String ACCEPT_LANGUAGE = "Accept-Language";

    public static String getBizData(String code, String json, String operator,
            String language) {
        String data = null;
        String resJson = null;
        try {
            Properties formProperties = new Properties();
            formProperties.put("code", code);
            formProperties.put("json", json);
            if (StringUtils.isNotBlank(operator)) {
                formProperties.put("operator", operator);
            }

            Properties requestProperties = new Properties();
            requestProperties.setProperty(ACCEPT_LANGUAGE, language);

            resJson = PostSimulater.requestPostForm(getPostUrl(code),
                formProperties, requestProperties);
        } catch (Exception e) {
            e.printStackTrace();
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
        return PropertiesUtil.Config.HMONEY_URL;
    }
}
