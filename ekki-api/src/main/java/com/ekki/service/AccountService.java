package com.ekki.service;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ekki.domain.Account;
import com.ekki.domain.User;
import com.ekki.repository.AccountRepository;

@Service
public class AccountService {

	@Autowired
	private AccountRepository accountRepository;

	public Account create(User user) {
		Account a = accountRepository.save(Account.builder().user(user).branchCode("1")
				.balance(BigDecimal.ZERO).build());
		a = accountRepository.save(a);
		a.setAccountNumber(generateAccountNumber(a.getId()));
		update(a);
		return a;
	}

	public Account update(Account account) {
		return accountRepository.saveAndFlush(account);
	}

	public Account findById(Long id) {
		Optional<Account> account = accountRepository.findById(id);
		return account.isPresent() ? account.get() : null;
	}

	public Account findByUser(User user) {
		return accountRepository.getByUser(user);
	}

	public void delete(Account account) {
		accountRepository.delete(account);
	}

	public boolean exists(Long id) {
		return accountRepository.existsById(id);
	}

	public void updateBalance(Account source, Account destination, BigDecimal value, boolean refund) {
		BigDecimal sourceBalance = source.getBalance();
		sourceBalance = !refund ? sourceBalance.subtract(value) : sourceBalance.add(value);
		source.setBalance(sourceBalance);
		update(source);

		if (destination != null) {
			BigDecimal destinationBalance = destination.getBalance();
			destinationBalance = !refund ? destinationBalance.add(value) : destinationBalance.subtract(value);
			destination.setBalance(destinationBalance);
			update(destination);
		}
	}

	private String generateAccountNumber(Long accountId) {
		Random random = new Random();
		String accountNumber = String.format("%s%s%s%s-%s", random.nextInt(9) + 0, random.nextInt(9) + 0,
				random.nextInt(9) + 0, random.nextInt(9) + 0, accountId);
		return accountNumber;
	}

}
