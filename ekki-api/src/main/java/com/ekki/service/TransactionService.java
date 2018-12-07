package com.ekki.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ekki.domain.Transaction;
import com.ekki.domain.Transaction.Status;
import com.ekki.domain.User;
import com.ekki.repository.TransactionRepository;

@Service
public class TransactionService {

	@Autowired
	private TransactionRepository transactionRepository;
	@Autowired
	private AccountService accountService;

	public Transaction create(Transaction transaction) {
		transaction = transactionRepository.save(transaction);
		accountService.updateBalance(transaction.getSource(), transaction.getDestination(), transaction.getAmount(), false);
		return transaction;
	}

	public Transaction update(Transaction transaction) {
		return transactionRepository.saveAndFlush(transaction);
	}

	public Transaction findById(Long id) {
		Optional<Transaction> transaction = transactionRepository.findById(id);
		return transaction.isPresent() ? transaction.get() : null;
	}

	public List<Transaction> findByUser(User user) {
		return transactionRepository.getByUser(user);
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
		accountService.updateBalance(t.getSource(), t.getDestination(), t.getAmount(), true);
	}

	public Transaction getSameTransactionCreateAtLast2Minutes(Transaction t) {
		return transactionRepository.getSameTransactionCreateAtLast2Minutes(LocalDateTime.now().minusMinutes(2),
				LocalDateTime.now(), t.getUser().getId(),
				t.getExternalAccount() != null ? t.getExternalAccount().getId() : null,
				t.getDestination() != null ? t.getDestination().getId() : null, Status.COMPLETED);
	}

}
