package com.cdkj.service.proxy;

public class Result {

    private String token;

    private String userId;

    private String result;

    private String errorCode;

    public Result() {
    }

    public Result(String token, String userId, String result, String errorCode) {
        this.token = token;
        this.userId = userId;
        this.result = result;
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

}
