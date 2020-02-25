package com.cdkj.service.proxy;

import com.cdkj.service.enums.EDevelopMode;
import com.cdkj.service.enums.EErrorCode;
import com.cdkj.service.exception.BizException;
import com.cdkj.service.exception.ParaException;
import com.cdkj.service.exception.TokenException;
import com.cdkj.service.http.BizConnecter;
import com.cdkj.service.http.JsonUtils;
import com.cdkj.service.token.ITokenDAO;
import com.cdkj.service.token.Jwt;
import com.cdkj.service.token.Token;
import com.cdkj.service.util.PropertiesUtil.Config;
import java.util.Map;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DispatcherImpl implements IDispatcher {

    @Autowired
    protected ITokenDAO tokenDAO;

    // 功能:
    // 1、解析参数，获取code和token
    // 2、对功能号进行判断是否需要token
    // 3、需要token，判断是否正确
    // 4、验证通过后转发接口
    @Override
    @SuppressWarnings("unchecked")
    @Transactional
    public String doDispatcher(String transcode, String inputParams) {
        String result = null;
        String userId = null;
        ReturnMessage rm = new ReturnMessage();
        try {
            // 1、解析参数，获取code和token；
            Map<String, Object> map = JsonUtils.json2Bean(inputParams,
                Map.class);

            String tokenId = String.valueOf(map.get("token"));
            if (StringUtils.isNotBlank(tokenId) && !"null".equals(tokenId)) {
                // 根据tokenId解析出userId
                userId = Jwt.getUserId(tokenId);

                Token token = tokenDAO.getToken(userId);

                if (null == token || !tokenId.equals(token.getTokenId())) {
                    throw new TokenException("xn000000", "token失效，请重新登录");
                }
            }

            // }
            // 4、验证通过后转发接口
            String resultData = BizConnecter.getBizData(transcode, inputParams,
                userId);
            // 5、登录接口，组装token返回
            if ("805041".equals(transcode) || "805050".equals(transcode)
                    || "630051".equals(transcode)) {
                Map<String, Object> resultMap = JsonUtils.json2Bean(resultData,
                    Map.class);
                if (null != resultMap.get("userId")) {

                    userId = String.valueOf(resultMap.get("userId"));

                    if (EDevelopMode.TEST.getCode().equals(Config.DEVELOP_MODE)) {

                        // 查询redis中该用户最新的token
                        Token token = tokenDAO.getToken(userId);
                        if (null == token) {
                            // 生成新的token
                            tokenId = Jwt.getJwt(userId, 1000 * 3600 * 24 * 7);
                            // 保存token至redis
                            tokenDAO.saveToken(new Token(userId, tokenId));
                        } else {
                            tokenId = token.getTokenId();
                            // 检查token是否已经过期
                            try {
                                Jwt.getUserId(tokenId);
                            } catch (Exception e) {
                                // 生成新的token
                                tokenId = Jwt.getJwt(userId, 1000 * 3600 * 24 * 7);
                                // 保存token至redis
                                tokenDAO.saveToken(new Token(userId, tokenId));
                            }
                        }

                    } else {
                        // 生成新的token
                        tokenId = Jwt.getJwt(userId, 1000 * 3600 * 24 * 7);
                        // 保存token至redis
                        tokenDAO.saveToken(new Token(userId, tokenId));
                    }

                    // 返回token添加给前端
                    resultData =
                            resultData.substring(0, resultData.lastIndexOf("}"))
                                    + ", \"token\":\""
                                    + tokenId
                                    + "\"}";
                }
            }
            Object data = JsonUtils.json2Bean(resultData, Object.class);
            rm.setErrorCode(EErrorCode.SUCCESS.getCode());
            rm.setErrorInfo(EErrorCode.SUCCESS.getValue());
            if (data == null) {
                data = new Object();
            }
            rm.setData(data);
        } catch (Exception e) {
            if (e instanceof TokenException) {
                rm.setErrorCode(EErrorCode.TOKEN_ERR.getCode());
                rm.setErrorBizCode(((TokenException) e).getErrorCode());
                rm.setErrorInfo(((TokenException) e).getErrorMessage());
                rm.setData("");
            } else if (e instanceof BizException) {
                rm.setErrorCode(EErrorCode.BIZ_ERR.getCode());
                rm.setErrorBizCode(((BizException) e).getErrorCode());
                rm.setErrorInfo(((BizException) e).getErrorMessage());
                rm.setData("");
            } else if (e instanceof ParaException) {
                rm.setErrorCode(EErrorCode.PARA_ERR.getCode());
                rm.setErrorBizCode(((ParaException) e).getErrorCode());
                rm.setErrorInfo(((ParaException) e).getErrorMessage());
                rm.setData("");
            } else if (e instanceof NullPointerException) {
                rm.setErrorCode(EErrorCode.OTHER_ERR.getCode());
                rm.setErrorInfo(e.getMessage());
                // rm.setErrorInfo("系统错误，请联系管理员");
                rm.setData("");
            } else {
                rm.setErrorCode(EErrorCode.OTHER_ERR.getCode());
                rm.setErrorInfo(e.getMessage());
                // rm.setErrorInfo("系统错误，请联系管理员");
                rm.setData("");
            }
        } finally {
            result = JsonUtils.object2Json(rm);
        }
        return result;
    }
}
