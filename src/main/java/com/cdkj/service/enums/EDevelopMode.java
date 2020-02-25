package com.cdkj.service.enums;

import java.util.HashMap;
import java.util.Map;

public enum EDevelopMode {
    TEST("TEST", "测试"), ONLINE("ONLINE", "线上");

    EDevelopMode(String code, String value) {
        this.code = code;
        this.value = value;
    }

    public static String getValue(String key) {
        String result = null;
        Map<String, String> map = new HashMap<String, String>();
        for (EDevelopMode status : EDevelopMode.values()) {
            map.put(status.getCode(), status.getValue());
        }
        if (map.containsKey(key)) {
            result = map.get(key);
        }
        return result;
    }

    private String code;

    private String value;

    public String getCode() {
        return code;
    }

    public String getValue() {
        return value;
    }
}
