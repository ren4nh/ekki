package com.ekki.resource;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ekki.domain.CreditCard;
import com.ekki.domain.ExternalAccount;
import com.ekki.domain.User;
import com.ekki.service.ExternalAccountService;
import com.ekki.service.TransactionService;
import com.ekki.service.UserService;
import com.ekki.utils.ApiResponse;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("external-account")
public class ExternalAccountResource {
	
	@Autowired
	private ExternalAccountService externalAccountService;
	@Autowired
	private UserService userService;
	
	@PostMapping
	@ApiOperation(value = "Create a new external account")
	public ResponseEntity<Object> create(@Valid @RequestBody ExternalAccount externalAccount) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User u = userService.findByUsername(authentication.getName());
		if (u == null) {
			return new ResponseEntity<Object>(new ApiResponse(404, 404, "Usuário não encontrado"), HttpStatus.NOT_FOUND);
		}
		externalAccount.setUser(u);
		externalAccount = externalAccountService.create(externalAccount);
		return new ResponseEntity<Object>(new ApiResponse(true), HttpStatus.CREATED);
	}
	
	@GetMapping("/user")
	@ApiOperation(value = "Get all external accounts")
	public ResponseEntity<Object> getAllExternalAccounts() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User u = userService.findByUsername(authentication.getName());
		if (u == null) {
			return new ResponseEntity<Object>(new ApiResponse(404, 404, "Usuário não encontrado"), HttpStatus.NOT_FOUND);
		}
		List<ExternalAccount> externalAccounts = externalAccountService.findByUser(u);
		return new ResponseEntity<Object>(new ApiResponse(externalAccounts), HttpStatus.OK);
	}

	@PutMapping("/{externalAccountId}")
	@ApiOperation(value = "Update a external account")
	public ResponseEntity<Object> updateExternalAccount(@PathVariable("externalAccountId") Long externalAccountId, @Valid @RequestBody ExternalAccount externalAccount) {
		if (!externalAccountService.exists(externalAccountId)) {
			return new ResponseEntity<Object>(new ApiResponse(404, 404, "Favorecido não encontrado"), HttpStatus.NOT_FOUND);
		}
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User u = userService.findByUsername(authentication.getName());
		if (u == null) {
			return new ResponseEntity<Object>(new ApiResponse(404, 404, "Usuário não encontrado"), HttpStatus.NOT_FOUND);
		}
		externalAccount.setId(externalAccountId);
		externalAccount.setUser(u);
		externalAccount = externalAccountService.update(externalAccount);
		return new ResponseEntity<Object>(new ApiResponse(externalAccount), HttpStatus.OK);
	}

	@DeleteMapping("/{externalAccountId}")
	@ApiOperation(value = "Delete a external account")
	public ResponseEntity<Object> deleteExternalAccount(@PathVariable("externalAccountId") Long externalAccountId) {
		ExternalAccount externalAccount = externalAccountService.findById(externalAccountId);
		if (externalAccount == null) {
			return new ResponseEntity<Object>(new ApiResponse(404, 404, "Favorecido não encontrado"), HttpStatus.NOT_FOUND);
		}
		externalAccountService.delete(externalAccount);
		return new ResponseEntity<Object>(new ApiResponse(true), HttpStatus.OK);
	}

}
