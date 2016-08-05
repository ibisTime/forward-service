package com.xnjr.app.account.req;

public class XN802220Req {

    // 来方用户编号(必填)
    private String fromUserId;

    // 去方用户编号账号(必填)
    private String toUserId;

    // 金额（精确到厘）
    private String amount;

    // 人民币价格（精确到厘）(必填)
    private String price;

    // 类型(货品商 1，下家 2)(必填)
    private String type;

    // 申请人(选填)
    private String applyUser;

    public String getFromUserId() {
        return fromUserId;
    }

    public void setFromUserId(String fromUserId) {
        this.fromUserId = fromUserId;
    }

    public String getToUserId() {
        return toUserId;
    }

    public void setToUserId(String toUserId) {
        this.toUserId = toUserId;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getApplyUser() {
        return applyUser;
    }

    public void setApplyUser(String applyUser) {
        this.applyUser = applyUser;
    }
}
