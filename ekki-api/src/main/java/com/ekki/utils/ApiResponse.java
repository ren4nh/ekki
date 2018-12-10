package com.ekki.utils;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class ApiResponse {

	private boolean success;
	private Integer status;
	private Integer code;
	private String message;
	private Object data;

	public ApiResponse() {
	}

	public ApiResponse(boolean success, Integer status, Integer code, String message, Object data) {
		this.success = success;
		this.status = status;
		this.code = code;
		this.message = message;
		this.data = data;
	}

	public ApiResponse(Integer status, Integer code, String message) {
		this.status = status;
		this.code = code;
		this.message = message;
		this.success = false;
	}

	public ApiResponse(Object data) {
		this.success = true;
		this.data = data;
	}

	public ApiResponse(boolean success) {
		this.success = success;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

}
