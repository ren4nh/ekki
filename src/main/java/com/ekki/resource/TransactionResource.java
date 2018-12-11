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
import com.ekki.domain.CreditCard;
import com.ekki.domain.Transaction;
import com.ekki.domain.Transaction.Status;
import com.ekki.domain.User;
import com.ekki.service.CreditCardService;
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
	private CreditCardService creditCardService;

	@PostMapping
	@ApiOperation(value = "Create a new transaction")
	public ResponseEntity<Object> createTransaction(@RequestBody TransactionBean transactionBean) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User u = userService.findByUsername(authentication.getName());
		if (u == null) {
			return new ResponseEntity<Object>(new ApiResponse(400, 400, "Usuário não encontrado"),
					HttpStatus.BAD_REQUEST);
		}
		if(u.getUsername().equalsIgnoreCase(transactionBean.getDestination())) {
			return new ResponseEntity<Object>(new ApiResponse(400, 400, "Não é possivel transferir para si mesmo"),
					HttpStatus.BAD_REQUEST);
		}
		if(transactionBean.getAmount().compareTo(u.getBalance()) == 1 && transactionBean.getCreditCard() == null) {
			return new ResponseEntity<Object>(new ApiResponse(400, 400, "Saldo insuficiente, cartão de crédito deve ser informado"),
					HttpStatus.BAD_REQUEST);
		}
		Transaction t = Transaction.builder().amount(transactionBean.getAmount()).user(u).createdAt(LocalDateTime.now()).status(Status.COMPLETED)
				.build();
		User destination = userService.findByUsername(transactionBean.getDestination());
		if (destination == null) {
			return new ResponseEntity<Object>(new ApiResponse(400, 400, "Favorecido não encontrado"),
					HttpStatus.BAD_REQUEST);
		}
		t.setDestination(destination);
		Transaction old = transactionService.getSameTransactionCreateAtLast2Minutes(t);
		if (old != null) {
			transactionService.cancelTransaction(old);
		}
		if (transactionBean.getCreditCard() != null) {
			CreditCard cc = creditCardService.findById(transactionBean.getCreditCard());
			if (cc == null) {
				return new ResponseEntity<Object>(new ApiResponse(400, 400, "Cartão de crédito não encontrado"),
						HttpStatus.BAD_REQUEST);
			}
			t.setDescription("Pago com o cartão" + cc.getDescription());
			t.setAmountPayedWithCreditCard(transactionBean.getAmount().subtract(u.getBalance()));
		}
		transactionService.create(t);
		return new ResponseEntity<Object>(new ApiResponse(true), HttpStatus.CREATED);
	}

	@GetMapping("/user")
	@ApiOperation(value = "Get all transactions")
	public ResponseEntity<Object> getAllUserTransactions() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User u = userService.findByUsername(authentication.getName());
		if (u == null) {
			return new ResponseEntity<Object>(new ApiResponse(400, 400, "Usuário não encontrado"),
					HttpStatus.BAD_REQUEST);
		}
		List<Transaction> transactions = transactionService.findAllUserTransactions(u.getId());
		return new ResponseEntity<Object>(new ApiResponse(transactions), HttpStatus.OK);
	}

}
