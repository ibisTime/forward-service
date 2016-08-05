package com.xnjr.app.account.req;

/**
 * 审批积分
 * @author: xieyj 
 * @since: 2016年7月23日 上午6:57:06 
 * @history:
 */
public class XN802121Req {

    // 充值订单编号(必填)
    private String chargeNo;

    // 审批人(必填)
    private String approveUser;

    // 审批意见(必填)
    private String approveResult;

    // 审批意见说明(必填)
    private String approveNote;

    public String getChargeNo() {
        return chargeNo;
    }

    public void setChargeNo(String chargeNo) {
        this.chargeNo = chargeNo;
    }

    public String getApproveUser() {
        return approveUser;
    }

    public void setApproveUser(String approveUser) {
        this.approveUser = approveUser;
    }

    public String getApproveResult() {
        return approveResult;
    }

    public void setApproveResult(String approveResult) {
        this.approveResult = approveResult;
    }

    public String getApproveNote() {
        return approveNote;
    }

    public void setApproveNote(String approveNote) {
        this.approveNote = approveNote;
    }
}
