package com.cdkj.service.proxy;

import java.io.File;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.cdkj.service.common.XmlParse;
import com.cdkj.service.enums.EErrorCode;
import com.cdkj.service.exception.BizException;
import com.cdkj.service.exception.ParaException;
import com.cdkj.service.http.BizConnecter;
import com.google.gson.Gson;

public class DispatcherImpl implements IDispatcher {

    // 功能:
    // 1、解析参数，获取code和token
    // 2、对功能号进行判断是否需要token
    // 3、需要token，判断是否正确
    // 4、验证通过后转发接口
    @Override
    @SuppressWarnings("unchecked")
    public String doDispatcher(String transcode, String inputParams) {
        String result = null;
        ReturnMessage rm = new ReturnMessage();
        Gson gson = new Gson();
        try {
            // 1、解析参数，获取code和token；
            Map<String, Object> map = gson.fromJson(inputParams, Map.class);
            String token = String.valueOf(map.get("token"));
            // 2、对功能号进行判断是否需要token
            ClassLoader classLoader = getClass().getClassLoader();
            File file = new File(classLoader.getResource("/function_code.xml")
                .getFile());
            Map<String, Object> codesMap = XmlParse.getNodeLists(file);
            if (codesMap.containsKey(transcode) && StringUtils.isBlank(token)) {
                throw new BizException("xn000000", "token不能为空");
            }
            // 3、需要token，判断是否正确
            // 4、验证通过后转发接口
            String resultData = BizConnecter.getBizData(transcode, inputParams);
            // // 5、登录接口，组装token返回
            if ("805043".equals(transcode)) {
                token = "T1234123412kjlkjlkjkl123";
                resultData = resultData.substring(0,
                    resultData.lastIndexOf("}"))
                        + ", \"token\":\"" + token + "\"}";
            }
            Object data = gson.fromJson(resultData, Object.class);
            rm.setErrorCode(EErrorCode.SUCCESS.getCode());
            rm.setErrorInfo(EErrorCode.SUCCESS.getValue());
            if (data == null) {
                data = new Object();
            }
            rm.setData(data);
        } catch (Exception e) {
            if (e instanceof BizException) {
                rm.setErrorCode(EErrorCode.BIZ_ERR.getCode());
                rm.setErrorInfo(((BizException) e).getErrorMessage());
                rm.setData("");
            } else if (e instanceof ParaException) {
                rm.setErrorCode(EErrorCode.PARA_ERR.getCode());
                rm.setErrorInfo(((ParaException) e).getErrorMessage());
                rm.setData("");
            } else if (e instanceof NullPointerException) {
                rm.setErrorCode(EErrorCode.OTHER_ERR.getCode());
                rm.setErrorInfo(e.getMessage());
                rm.setErrorInfo("系统错误，请联系管理员");
                rm.setData("");
            } else {
                rm.setErrorCode(EErrorCode.OTHER_ERR.getCode());
                rm.setErrorInfo(e.getMessage());
                rm.setErrorInfo("系统错误，请联系管理员");
                rm.setData("");
            }
        } finally {
            result = gson.toJson(rm);
        }
        return result;
    }
}
