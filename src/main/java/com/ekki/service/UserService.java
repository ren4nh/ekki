package com.ekki.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ekki.domain.Token;
import com.ekki.domain.Token.Type;
import com.ekki.domain.Transaction.Status;
import com.ekki.domain.Transaction;
import com.ekki.domain.User;
import com.ekki.repository.TokenRepository;
import com.ekki.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private TokenRepository tokenRepository;

	public User create(User u) {
		u.setCreatedAt(LocalDateTime.now());
		return userRepository.save(u);
	}

	public User update(User u) {
		return userRepository.saveAndFlush(u);
	}

	public User findById(Long id) {
		Optional<User> user = userRepository.findById(id);
		return user.isPresent() ? user.get() : null;
	}

	public List<User> findAll() {
		return userRepository.findAll();
	}

	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	public Token generateToken(User user, Type type) {
		Token token = new Token();
		token.setUser(user);
		token.setExpiredAt(LocalDateTime.now().plusMinutes(10));
		token.setToken(
				Base64.getEncoder().encodeToString(new String(user.getUsername() + token.getExpiredAt()).getBytes()));
		token.setType(type);
		return this.tokenRepository.saveAndFlush(token);
	}

	public void changePassword(String password, User user) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		user.setPassword(passwordEncoder.encode(password));
		update(user);
	}

	public Token getToken(String token) {
		return tokenRepository.findByToken(token);
	}

	public Token setTokenUsed(Token token) {
		token.setUsed(true);
		return tokenRepository.saveAndFlush(token);
	}

	public void updateBalance(Transaction t) {
		BigDecimal balanceAmount = t.getAmount().subtract(t.getAmountPayedWithCreditCard());
		BigDecimal sourceBalance = t.getUser().getBalance();
		sourceBalance = t.getStatus().equals(Status.COMPLETED) ? sourceBalance.subtract(balanceAmount)
				: sourceBalance.add(balanceAmount);
		t.getUser().setBalance(sourceBalance);
		update(t.getUser());

		BigDecimal destinationBalance = t.getDestination().getBalance();
		destinationBalance = t.getStatus().equals(Status.COMPLETED) ? destinationBalance.add(t.getAmount())
				: destinationBalance.subtract(t.getAmount());
		t.getDestination().setBalance(destinationBalance);
		update(t.getDestination());
	}

}
