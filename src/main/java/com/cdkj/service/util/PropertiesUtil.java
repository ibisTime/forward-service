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

        public static String HTWT_URL = props.getProperty("HTWT_URL");

        public static String CHE_URL = props.getProperty("CHE_URL");

        public static String DEVELOP_MODE = props.getProperty("DEVELOP_MODE");
    }
}
