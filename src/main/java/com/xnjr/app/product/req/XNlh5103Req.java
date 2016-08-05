/**
 * @Title XN601000Req.java 
 * @Package com.xnjr.mall.dto.req 
 * @Description 
 * @author haiqingzheng  
 * @date 2016年5月17日 上午9:08:54 
 * @version V1.0   
 */
package com.xnjr.app.product.req;

public class XNlh5103Req {
	private String modelCode;
	private String modelName;
	private String toLevel;
	private String updater;
	private String start;
	private String limit;
	private String orderColumn;
	private String orderDir;
	
	public String getModelCode() {
		return modelCode;
	}
	public void setModelCode(String modelCode) {
		this.modelCode = modelCode;
	}
	public String getToLevel() {
		return toLevel;
	}
	public void setToLevel(String toLevel) {
		this.toLevel = toLevel;
	}
	public String getUpdater() {
		return updater;
	}
	public void setUpdater(String updater) {
		this.updater = updater;
	}
	public String getStart() {
		return start;
	}
	public void setStart(String start) {
		this.start = start;
	}
	public String getLimit() {
		return limit;
	}
	public void setLimit(String limit) {
		this.limit = limit;
	}
	public String getOrderColumn() {
		return orderColumn;
	}
	public void setOrderColumn(String orderColumn) {
		this.orderColumn = orderColumn;
	}
	public String getOrderDir() {
		return orderDir;
	}
	public void setOrderDir(String orderDir) {
		this.orderDir = orderDir;
	}
	public String getModelName() {
		return modelName;
	}
	public void setModelName(String modelName) {
		this.modelName = modelName;
	}
}
