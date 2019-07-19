package com.cdkj.service;

import com.cdkj.service.enums.EBoolean;
import com.cdkj.service.enums.EFunction;
import com.cdkj.service.enums.ELanguage;
import com.cdkj.service.http.JsonUtils;
import com.cdkj.service.proxy.DispatcherImpl;
import com.cdkj.service.proxy.IDispatcher;
import com.cdkj.service.proxy.Result;
import com.cdkj.service.proxy.ReturnMessageUrl;
import com.cdkj.service.spring.SpringContextHolder;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

public class ServiceServlet extends HttpServlet {

    static Logger logger = Logger.getLogger(ServiceServlet.class);

    private IDispatcher dispatcher = SpringContextHolder.getBean(DispatcherImpl.class);

    /**
     * @Fields serialVersionUID : TODO(用一句话描述这个变量表示什么)
     */
    private static final long serialVersionUID = 6175432226630152841L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        logger.info("Successful Deployment");
        PrintWriter writer = response.getWriter();
        writer.append("Version:1.0.0 \n");
        writer.append("Description:forward-service ogc-standard 1st \n");
        writer.flush();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String code = request.getParameter("code");
        String json = request.getParameter("json");

        String ip = getIpAddr(request);
        // 返回token添加给前端
        String subString = json.substring(0, json.lastIndexOf("}"));
        if ("{".equals(subString)) {
            json = subString + "\"ip\":\"" + ip + "\"}";
        } else {
            json = subString + ", \"ip\":\"" + ip + "\"}";
        }

        String language =
                request.getHeader("Accept-Language") == null
                        ? "zh_CN"
                        : request.getHeader("Accept-Language");

        if (!ELanguage.zh_CN.getCode().equals(language)
                && !ELanguage.en_US.getCode().equals(language)) {
            language = ELanguage.zh_CN.getCode();
        }
        Result result = dispatcher.doDispatcher(code, json, language);
        if (EFunction.TokenVisit.getCode().equals(code)
                && EBoolean.NO.getCode().equals(result.getErrorCode())) {
            ReturnMessageUrl data = JsonUtils.json2Bean(result.getResult(), ReturnMessageUrl.class);
            response.sendRedirect(
                    data.getData().getPostUrl()
                            + "?token="
                            + result.getToken()
                            + "&userId="
                            + result.getUserId());
        } else {
            PrintWriter writer = response.getWriter();
            writer.append(result.getResult());
            writer.flush();
        }
    }

    public static void main(String[] args) {
        String json = "{}";
        String subString = json.substring(0, json.lastIndexOf("}"));
        if ("{".equals(subString)) {
            json = subString + "\"ip\":\"" + "4453" + "\"}";
        } else {
            json = subString + ", \"ip\":\"" + "4453" + "\"}";
        }
        System.out.println(json);
    }

    /**
     * 获取访问者IP
     *
     * <p>在一般情况下使用Request.getRemoteAddr()即可，但是经过nginx等反向代理软件后，这个方法会失效。
     *
     * <p>本方法先从Header中获取X-Real-IP，如果不存在再从X-Forwarded-For获得第一个IP(用,分割)， 如果还不存在则调用Request
     * .getRemoteAddr()。
     */
    private String getIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("X-Real-IP");
        if (!StringUtils.isBlank(ip) && !"unknown".equalsIgnoreCase(ip)) {
            return ip;
        }
        ip = request.getHeader("X-Forwarded-For");
        if (!StringUtils.isBlank(ip) && !"unknown".equalsIgnoreCase(ip)) {
            // 多次反向代理后会有多个IP值，第一个为真实IP。
            int index = ip.indexOf(',');
            if (index != -1) {
                return ip.substring(0, index);
            } else {
                return ip;
            }
        } else {
            return request.getRemoteAddr();
        }
    }
}
