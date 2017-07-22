package com.cdkj.service.enums;

public enum ETokenPrefix {
    TK("TK", "token前缀"), TU("T", "userId前缀");

    ETokenPrefix(String code, String value) {
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
