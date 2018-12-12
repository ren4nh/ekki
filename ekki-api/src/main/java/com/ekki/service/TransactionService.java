package com.ekki.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ekki.domain.Transaction;
import com.ekki.domain.Transaction.Status;
import com.ekki.repository.TransactionRepository;

@Service
public class TransactionService {

	@Autowired
	private TransactionRepository transactionRepository;
	@Autowired
	private UserService userService;

	public Transaction create(Transaction transaction) {
		transaction = transactionRepository.save(transaction);
		userService.updateBalance(transaction);
		return transaction;
	}

	public Transaction update(Transaction transaction) {
		return transactionRepository.saveAndFlush(transaction);
	}

	public Transaction findById(Long id) {
		Optional<Transaction> transaction = transactionRepository.findById(id);
		return transaction.isPresent() ? transaction.get() : null;
	}

	public List<Transaction> findAllUserTransactions(Long userId) {
		return transactionRepository.findAllUserTransactions(userId);
	}

	public void delete(Transaction transaction) {
		transactionRepository.delete(transaction);
	}

	public boolean exists(Long id) {
		return transactionRepository.existsById(id);
	}
	
	public void cancelTransaction(Transaction t) {
		t.setStatus(Status.CANCELED);
		update(t);
		userService.updateBalance(t);
	}

	public Transaction getSameTransactionCreateAtLast2Minutes(Transaction t) {
		return transactionRepository.getSameTransactionCreateAtLast2Minutes(LocalDateTime.now().minusMinutes(2),
				LocalDateTime.now(), t.getUser().getId(), t.getDestination().getId(), t.getAmount());
	}

}
