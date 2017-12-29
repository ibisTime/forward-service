package com.cdkj.service.token;

public class Token {

    private String userId;

    private String tokenId;

    public Token() {

    }

    public Token(String userId, String tokenId) {
        super();
        this.userId = userId;
        this.tokenId = tokenId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTokenId() {
        return tokenId;
    }

    public void setTokenId(String tokenId) {
        this.tokenId = tokenId;
    }
}
