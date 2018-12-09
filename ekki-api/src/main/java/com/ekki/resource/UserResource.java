package com.ekki.resource;

import java.time.LocalDateTime;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ekki.bean.ChangePasswordRequestBean;
import com.ekki.bean.UserCredentialsBean;
import com.ekki.domain.Account;
import com.ekki.domain.Token;
import com.ekki.domain.Token.Type;
import com.ekki.domain.User;
import com.ekki.mail.MailSenderService;
import com.ekki.mail.SimpleMail;
import com.ekki.service.AccountService;
import com.ekki.service.UserService;
import com.ekki.utils.ApiResponse;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/user")
public class UserResource {

	@Autowired
	private UserService userService;
	@Autowired
	private MailSenderService mailSenderService;
	@Autowired
	private BCryptPasswordEncoder encoder;
	@Autowired
	private AccountService accountService;

	@ApiOperation(value = "Get a logged user")
	@GetMapping("/me")
	public ResponseEntity<Object> getLoggedUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User u = userService.findByUsername(authentication.getName());
		if (u == null) {
			return new ResponseEntity<Object>(new ApiResponse(404, 404, "User not found"), HttpStatus.NOT_FOUND);
		}
		return ResponseEntity.ok(new ApiResponse(u));
	}
	
	@ApiOperation(value = "Get a logged user")
	@GetMapping("/account")
	public ResponseEntity<Object> getAccount() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User u = userService.findByUsername(authentication.getName());
		if (u == null) {
			return new ResponseEntity<Object>(new ApiResponse(404, 404, "User not found"), HttpStatus.NOT_FOUND);
		}
		Account a = accountService.findByUser(u);
		return ResponseEntity.ok(new ApiResponse(a));
	}
	
	@ApiOperation(value = "Register a new user")
	@PostMapping("/register")
	public ResponseEntity<Object> createUser(@Valid @RequestBody UserCredentialsBean cred) {
		User user = userService.findByUsername(cred.getUsername());
		if (user != null) {
			return new ResponseEntity<Object>(new ApiResponse(400, 400, "Username in use"), HttpStatus.BAD_REQUEST);
		}
		user = User.builder().name(cred.getName()).password(encoder.encode(cred.getPassword())).username(cred.getUsername()).createdAt(LocalDateTime.now()).active(true).build();
		user = userService.create(user);
		accountService.create(user);
		return new ResponseEntity<Object>(new ApiResponse(true), HttpStatus.CREATED);
	}
	
	@ApiOperation(value = "Forgot password request method")
	@PostMapping("forgotPassword")
	public ResponseEntity<Object> forgotPassword(@RequestBody UserCredentialsBean cred) {
		User user = userService.findByUsername(cred.getUsername());
		if (user == null) {
			return new ResponseEntity<Object>(new ApiResponse(400, 400, "User not found"), HttpStatus.NOT_FOUND);
		}
		Token token = userService.generateToken(user, Type.FORGOT_PASSWORD);
		String content = String.format("http://localhost:3000/changePassword?token=%s&email=%s", token.getToken(), user.getUsername());
		mailSenderService.sendHTMLMail(SimpleMail.builder().to(user.getUsername()).content(content).subject("Esqueci minha senha").build());
		return ResponseEntity.ok(new ApiResponse(true));
	}

	@ApiOperation(value = "Used to change the password of the user")
	@PostMapping("changePassword")
	public ResponseEntity<Object> changePassword(@Valid @RequestBody ChangePasswordRequestBean cpr) {
		if (!cpr.getPassword().equals(cpr.getConfirmPassword())) {
			return new ResponseEntity<Object>(new ApiResponse(400, 400, "Password need to be equals"),
					HttpStatus.BAD_REQUEST);
		}
		Token tk = userService.getToken(cpr.getToken());
		ResponseEntity<Object> response = validateToken(tk, Type.FORGOT_PASSWORD);
		if (response != null) {
			return response;
		}
		if (tk.getUser() == null) {
			return new ResponseEntity<Object>(new ApiResponse(400, 400, "User not found"), HttpStatus.BAD_REQUEST);
		}
		if (!tk.getUser().getUsername().equalsIgnoreCase(cpr.getUsername())) {
			return new ResponseEntity<Object>(new ApiResponse(400, 400, "Invalid token"), HttpStatus.BAD_REQUEST);
		}
		userService.changePassword(cpr.getPassword(), tk.getUser());
		userService.setTokenUsed(tk);
		return ResponseEntity.ok(new ApiResponse(true));
	}

	private ResponseEntity<Object> validateToken(Token tk, Type type) {
		if (tk == null) {
			return new ResponseEntity<Object>(new ApiResponse(400, 400, "Invalid token"), HttpStatus.BAD_REQUEST);
		}
		if (tk.isUsed()) {
			return new ResponseEntity<Object>(new ApiResponse(400, 400, "Token already used"), HttpStatus.BAD_REQUEST);
		}
		if (tk.getExpiredAt().isBefore(LocalDateTime.now())) {
			return new ResponseEntity<Object>(new ApiResponse(400, 400, "Token expired"), HttpStatus.BAD_REQUEST);
		}
		if (!tk.getType().equals(type)) {
			return new ResponseEntity<Object>(new ApiResponse(400, 400, "Invalid token"), HttpStatus.BAD_REQUEST);
		}
		return null;
	}

}
