package com.cdkj.service.common;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

public class XmlParse {

    /**
     * 获取文件路径
     * @param filePath
     * @return
     * @throws DocumentException 
     * @create: 2016年12月14日 下午3:12:54 xieyj
     * @history:
     */
    public static Map<String, Object> getNodeLists(File file)
            throws DocumentException {
        Map<String, Object> map = new HashMap<String, Object>();
        SAXReader reader = new SAXReader();
        Document document = reader.read(file);
        // 得到xml根元素
        Element root = document.getRootElement();
        // 得到根元素的所有子节点
        List<Element> elementList = root.elements();
        // 遍历所有子节点
        for (Element e : elementList) {
            map.put(e.getTextTrim(), e.getTextTrim());
        }
        return map;
    }
}
