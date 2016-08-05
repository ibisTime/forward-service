package com.xnjr.app.customer.ao.impl;

import org.springframework.stereotype.Service;

import com.xnjr.app.customer.ao.ICustomerAO;
import com.xnjr.app.customer.req.XN602800Req;
import com.xnjr.app.customer.req.XN802012Req;
import com.xnjr.app.customer.req.XN805070Req;
import com.xnjr.app.customer.req.XN805071Req;
import com.xnjr.app.customer.res.XN805070Res;
import com.xnjr.app.exception.BizException;
import com.xnjr.app.http.BizConnecter;
import com.xnjr.app.http.JsonUtils;

@Service
public class CustomerAOImpl implements ICustomerAO {

    @Override
    public Object channeladd(String mobile, String realName, String userReferee,
            String updater, String remark, String kind, String province,
            String city, String district, String detailAddress,
            String isDefault) {
        XN805070Req req = new XN805070Req();
        req.setMobile(mobile);
        req.setRealName(realName);
        req.setUserReferee(userReferee);
        req.setUpdater(updater);
        req.setRemark(remark);
        req.setKind(kind);
        XN805070Res res = BizConnecter.getBizData("805070",
            JsonUtils.object2Json(req), XN805070Res.class);
        if (res == null) {
            throw new BizException("XN805070", "渠道商新增失败");
        }
        String userId = res.getUserId();
        XN602800Req xn602800Req = new XN602800Req();
        xn602800Req.setUserId(userId);
        xn602800Req.setAddressee(realName);
        xn602800Req.setMobile(mobile);
        xn602800Req.setProvince(province);
        xn602800Req.setCity(city);
        xn602800Req.setDistrict(district);
        xn602800Req.setDetailAddress(detailAddress);
        xn602800Req.setIsDefault(isDefault);
        return BizConnecter.getBizData("602800",
            JsonUtils.object2Json(xn602800Req), Object.class);
    }

    @Override
    public Object channeleditName(String userId, String realName) {
        XN805071Req req = new XN805071Req();
        req.setUserId(userId);
        req.setRealName(realName);
        return BizConnecter.getBizData("805071", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object detailmoney(String userId) {
        XN802012Req req = new XN802012Req();
        req.setUserId(userId);
        return BizConnecter.getBizData("802012", JsonUtils.object2Json(req),
            Object.class);
    }
}
