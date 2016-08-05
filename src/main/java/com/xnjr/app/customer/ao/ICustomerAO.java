package com.xnjr.app.customer.ao;

/**
 * @author: wu 
 * @since: 2016年5月26日 下午4:57:50 
 * @history:
 */
public interface ICustomerAO {
    /**
    * 新增渠道商
    * @param mobile
    * @param realName
    * @param userReferee
    * @param updater
    * @param remark
    * @param kind
    * @param province
    * @param city
    * @param district
    * @param detailAddress
    * @param isDefault
    * @return 
    * @create: 2016年6月1日 下午3:55:07 XIANDONG
    * @history:
    */
    public Object channeladd(String mobile, String realName, String userReferee,
            String updater, String remark, String kind, String province,
            String city, String district, String detailAddress,
            String isDefault);

    /**
     * 修改渠道名称
     * @param userId
     * @param realName
     * @return 
     * @create: 2016年6月1日 下午12:33:32 XIANDONG
     * @history:
     */
    public Object channeleditName(String userId, String realName);

    public Object detailmoney(String userId);

}
