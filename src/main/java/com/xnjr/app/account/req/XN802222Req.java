package com.xnjr.app.account.req;

public class XN802222Req {
    // 取现订单编号
    private String withdrawNo;

    // 审批人
    private String approveUser;

    // 审批意见
    private String approveResult;

    // 审批意见说明
    private String approveNote;

    public String getWithdrawNo() {
        return withdrawNo;
    }

    public void setWithdrawNo(String withdrawNo) {
        this.withdrawNo = withdrawNo;
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
