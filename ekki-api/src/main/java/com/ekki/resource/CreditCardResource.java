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
import com.ekki.domain.User;
import com.ekki.service.CreditCardService;
import com.ekki.service.UserService;
import com.ekki.utils.ApiResponse;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("credit-card")
public class CreditCardResource {

	@Autowired
	private CreditCardService creditCardService;
	@Autowired
	private UserService userService;

	@PostMapping
	@ApiOperation(value = "Creates a new credit card")
	public ResponseEntity<Object> createCreditCard(@Valid @RequestBody CreditCard creditCard) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User u = userService.findByUsername(authentication.getName());
		if (u == null) {
			return new ResponseEntity<Object>(new ApiResponse(400, 400, "Usuário não encontrado"), HttpStatus.BAD_REQUEST);
		}
		creditCard.setUser(u);
		creditCard = creditCardService.create(creditCard);
		return new ResponseEntity<Object>(new ApiResponse(creditCard), HttpStatus.CREATED);
	}

	@GetMapping("/user")
	@ApiOperation(value = "Get all user credit cards")
	public ResponseEntity<Object> getAllUserCreditCards() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User u = userService.findByUsername(authentication.getName());
		if (u == null) {
			return new ResponseEntity<Object>(new ApiResponse(400, 400, "Usuário não encontrado"), HttpStatus.BAD_REQUEST);
		}
		List<CreditCard> creditCards = creditCardService.findByUser(u);
		return new ResponseEntity<Object>(new ApiResponse(creditCards), HttpStatus.OK);
	}

	@PutMapping("/{creditCardId}")
	@ApiOperation(value = "Update a credit card")
	public ResponseEntity<Object> updateCreditCard(@PathVariable("creditCardId") Long creditCardId, @Valid @RequestBody CreditCard creditCard) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User u = userService.findByUsername(authentication.getName());
		if (u == null) {
			return new ResponseEntity<Object>(new ApiResponse(400, 400, "Usuário não encontrado"), HttpStatus.BAD_REQUEST);
		}
		if (!creditCardService.exists(creditCardId)) {
			return new ResponseEntity<Object>(new ApiResponse(400, 400, "Cartão de crédito não encontrado"), HttpStatus.BAD_REQUEST);
		}
		creditCard.setId(creditCardId);
		creditCard.setUser(u);
		creditCard = creditCardService.update(creditCard);
		return new ResponseEntity<Object>(new ApiResponse(creditCard), HttpStatus.OK);
	}

	@DeleteMapping("/{creditCardId}")
	@ApiOperation(value = "Delete a credit card")
	public ResponseEntity<Object> deleteCreditCard(@PathVariable("creditCardId") Long creditCardId) {
		CreditCard creditCard = creditCardService.findById(creditCardId);
		if (creditCard == null) {
			return new ResponseEntity<Object>(new ApiResponse(400, 400, "Cartão de crédito não encontrado"), HttpStatus.BAD_REQUEST);
		}
		creditCardService.delete(creditCard);
		return new ResponseEntity<Object>(new ApiResponse(true), HttpStatus.OK);
	}

}
