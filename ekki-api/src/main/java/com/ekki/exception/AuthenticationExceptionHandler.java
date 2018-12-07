package com.ekki.exception;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.ekki.utils.ApiResponse;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class AuthenticationExceptionHandler {
	
	@ResponseStatus(BAD_REQUEST)
    @ResponseBody
    @ExceptionHandler(DisabledException.class)
    public ApiResponse disabledException(DisabledException ex) {
        return new ApiResponse(401, 401, "Usuário desabilitado");
    }
	
	@ResponseStatus(BAD_REQUEST)
    @ResponseBody
    @ExceptionHandler(BadCredentialsException.class)
    public ApiResponse disabledException(BadCredentialsException ex) {
        return new ApiResponse(401, 401, "Usuário ou senha incorretos");
    }

}
