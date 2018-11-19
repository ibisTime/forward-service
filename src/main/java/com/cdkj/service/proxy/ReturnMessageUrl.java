package com.cdkj.service.proxy;

public class ReturnMessageUrl {

    private String errorCode;

    private String errorBizCode;

    private String errorInfo;

    // 方法调用返回结果
    private ReturnMessagePostUrl data;

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorBizCode() {
        return errorBizCode;
    }

    public void setErrorBizCode(String errorBizCode) {
        this.errorBizCode = errorBizCode;
    }

    public String getErrorInfo() {
        return errorInfo;
    }

    public void setErrorInfo(String errorInfo) {
        this.errorInfo = errorInfo;
    }

    public ReturnMessagePostUrl getData() {
        return data;
    }

    public void setData(ReturnMessagePostUrl data) {
        this.data = data;
    }
}
