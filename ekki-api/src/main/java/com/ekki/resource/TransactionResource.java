package com.ekki.resource;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ekki.bean.TransactionBean;
import com.ekki.domain.Account;
import com.ekki.domain.CreditCard;
import com.ekki.domain.ExternalAccount;
import com.ekki.domain.Transaction;
import com.ekki.domain.User;
import com.ekki.service.AccountService;
import com.ekki.service.CreditCardService;
import com.ekki.service.ExternalAccountService;
import com.ekki.service.TransactionService;
import com.ekki.service.UserService;
import com.ekki.utils.ApiResponse;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("transaction")
public class TransactionResource {
	
	@Autowired
	private TransactionService transactionService;
	@Autowired
	private UserService userService;
	@Autowired
	private ExternalAccountService externalAccountService;
	@Autowired
	private CreditCardService creditCardService;
	@Autowired
	private AccountService accountService;
	
	@PostMapping
	@ApiOperation(value = "Create a new transaction")
	public ResponseEntity<Object> create(@RequestBody TransactionBean transactionBean) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User u = userService.findByUsername(authentication.getName());
		if (u == null) {
			return new ResponseEntity<Object>(new ApiResponse(404, 404, "Usuário não encontrado"), HttpStatus.NOT_FOUND);
		}
		Transaction t = Transaction.builder().amount(transactionBean.getAmount()).user(u).createdAt(LocalDateTime.now()).build();
		if(transactionBean.getDestinationId() != null) {
			Account a = accountService.findById(transactionBean.getDestinationId());
			if(a == null) {
				return new ResponseEntity<Object>(new ApiResponse(404, 404, "Favorecido não encontrado"), HttpStatus.NOT_FOUND);
			}
			t.setDestination(a);
		} else {
			ExternalAccount ea = externalAccountService.findById(transactionBean.getExternalAccountId());
			if(ea == null) {
				return new ResponseEntity<Object>(new ApiResponse(404, 404, "Favorecido não encontrado"), HttpStatus.NOT_FOUND);
			}
			t.setExternalAccount(ea);
		}
		if(transactionBean.getCreditCardId() != null) {
			CreditCard cc = creditCardService.findById(transactionBean.getCreditCardId());
			if(cc == null) {
				return new ResponseEntity<Object>(new ApiResponse(404, 404, "Cartão de crédito não encontrado"), HttpStatus.NOT_FOUND);
			}
			t.setCreditCard(cc);
			t.setAmountPayedWithCreditCard(transactionBean.getAmountPayedByCreditCard());
		}
		Transaction old = transactionService.getSameTransactionCreateAtLast2Minutes(t);
		if(old != null) {
			transactionService.cancelTransaction(t);
		}
		transactionService.create(t);
		return new ResponseEntity<Object>(new ApiResponse(true), HttpStatus.CREATED);
	}
	
	@GetMapping("/user")
	@ApiOperation(value = "Get all transactions")
	public ResponseEntity<Object> getAllExternalAccounts() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User u = userService.findByUsername(authentication.getName());
		if (u == null) {
			return new ResponseEntity<Object>(new ApiResponse(404, 404, "Usuário não encontrado"), HttpStatus.NOT_FOUND);
		}
		List<Transaction> transactions = transactionService.findByUser(u);
		return new ResponseEntity<Object>(new ApiResponse(transactions), HttpStatus.OK);
	}


}
