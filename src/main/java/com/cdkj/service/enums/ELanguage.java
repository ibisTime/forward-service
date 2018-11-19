/**
 * @Title Status.java 
 * @Package com.ibis.pz.enums 
 * @Description 
 * @author miyb  
 * @date 2015-3-7 上午8:41:50 
 * @version V1.0   
 */
package com.cdkj.service.enums;

/** 
 * 英文文本
 * @author: taojian 
 * @since: 2018年9月20日 下午7:43:58 
 * @history:
 */
public enum ELanguage {

    zh_CN("zh_CN", "中文"), en_US("en_US", "英文");

    ELanguage(String code, String value) {
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
