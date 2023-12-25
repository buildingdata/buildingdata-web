package com.mobisys.building.util;

import javax.servlet.http.HttpServletRequest;

public class CodeUtil {
	public static boolean checkVerifyCode(HttpServletRequest request) {
		String verifyCodeExcepcted = (String)request.getSession().getAttribute(com.google.code.kaptcha.Constants.KAPTCHA_SESSION_KEY);
		String verigyCodeActual = HttpServletRequestUtil.getString(request, "verifyCodeActual");
		
		if (verigyCodeActual == null || !verigyCodeActual.equalsIgnoreCase(verifyCodeExcepcted)) {
			return false;
		}
		return true;
	}
}
