package com.cdkj.service.util;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

public class PropertiesUtil {
    private static Properties props;
    static {
        props = new Properties();
        try {
            props.load(Thread.currentThread().getContextClassLoader()
                .getResourceAsStream("config.properties"));
        } catch (FileNotFoundException e) {
            throw new RuntimeException("找不到config.properties文件", e);
        } catch (IOException e) {
            throw new RuntimeException("读取config.properties文件出错", e);
        }
    }

    public static String getProperty(String key) {
        return props.getProperty(key);
    }

    public static final class Config {

        public static String SMS_URL = props.getProperty("SMS_URL");

        public static String CERTI_URL = props.getProperty("CERTI_URL");

        public static String HMONEY_URL = props.getProperty("HMONEY_URL");

        public static String CORE_URL = props.getProperty("CORE_URL");

    }
}
