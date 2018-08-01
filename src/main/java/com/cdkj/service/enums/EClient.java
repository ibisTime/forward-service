package com.cdkj.service.enums;

public enum EClient {
    WEB_H5("WEB_H5", "H5移动网页端");

    EClient(String code, String value) {
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

}
