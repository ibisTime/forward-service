package com.cdkj.service.proxy;

import java.io.File;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.cdkj.service.common.OrderNoGenerater;
import com.cdkj.service.common.XmlParse;
import com.cdkj.service.enums.EErrorCode;
import com.cdkj.service.enums.ETokenPrefix;
import com.cdkj.service.exception.BizException;
import com.cdkj.service.exception.ParaException;
import com.cdkj.service.exception.TokenException;
import com.cdkj.service.http.BizConnecter;
import com.cdkj.service.http.JsonUtils;
import com.cdkj.service.token.ITokenDAO;
import com.cdkj.service.token.Token;

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
        ReturnMessage rm = new ReturnMessage();
        try {
            // 1、解析参数，获取code和token；
            Map<String, Object> map = JsonUtils.json2Bean(inputParams,
                Map.class);
            // 2、对功能号进行判断是否需要token
            ClassLoader classLoader = getClass().getClassLoader();
            File file = new File(classLoader.getResource("/function_code.xml")
                .getFile());
            Map<String, Object> codesMap = XmlParse.getNodeLists(file);
            // 3、需要token，判断是否正确
            if (codesMap.containsKey(transcode)) {
                String tokenId = String.valueOf(map.get("token"));
                if (StringUtils.isBlank(tokenId) || "null".equals(tokenId)) {
                    throw new BizException("xn000000", "token不能为空");
                }
                Token token = tokenDAO.getToken(tokenId);
                if (null == token) {
                    throw new TokenException("xn000000", "token失效，请重新登录");
                }
            }
            // 4、验证通过后转发接口
            String resultData = BizConnecter.getBizData(transcode, inputParams);
            // 5、登录接口，组装token返回
            if ("805041".equals(transcode) || "805043".equals(transcode)
                    || "805050".equals(transcode) || "805151".equals(transcode)
                    || "805152".equals(transcode) || "805182".equals(transcode)
                    || "805183".equals(transcode) || "618920".equals(transcode)
                    || "618922".equals(transcode) || "805154".equals(transcode)
                    || "612050".equals(transcode) || "623800".equals(transcode)
                    || "630051".equals(transcode) || "630101".equals(transcode)
                    || "623201".equals(transcode)) {// 618920
                Map<String, Object> resultMap = JsonUtils.json2Bean(resultData,
                    Map.class);
                if (null != resultMap.get("userId")) {
                    String userId = String.valueOf(resultMap.get("userId"));
                    String tokenId = OrderNoGenerater
                        .generateME(ETokenPrefix.TU.getCode() + userId
                                + ETokenPrefix.TK.getCode()); // tokenId与userId相关联,保存在本地
                    resultData = resultData.substring(0,
                        resultData.lastIndexOf("}"))
                            + ", \"token\":\"" + tokenId + "\"}";
                    tokenDAO.saveToken(new Token(tokenId));
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
