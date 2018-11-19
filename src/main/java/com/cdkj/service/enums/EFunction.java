package com.cdkj.service.enums;

import java.util.HashMap;
import java.util.Map;

public enum EFunction {
    TokenVisit("600109", "免登录访问");

    EFunction(String code, String value) {
        this.code = code;
        this.value = value;
    }

    private String code;

    private String value;

    public String getCode() {
        return code;
    }

    public String getValue() {
        return value;
    }

    public static String getValue(String key) {
        String result = null;
        Map<String, String> map = new HashMap<String, String>();
        for (EFunction function : EFunction.values()) {
            map.put(function.getCode(), function.getValue());
        }
        if (map.containsKey(key)) {
            result = map.get(key);
        }
        return result;
    }

}
