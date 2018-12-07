package com.ekki.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ekki.domain.ExternalAccount;
import com.ekki.domain.User;
import com.ekki.repository.ExternalAccountRepository;

@Service
public class ExternalAccountService {
	
	@Autowired
	private ExternalAccountRepository externalAccountRepository;
	
	public ExternalAccount create(ExternalAccount account) {
		return externalAccountRepository.save(account);
	}

	public ExternalAccount update(ExternalAccount account) {
		return externalAccountRepository.saveAndFlush(account);
	}

	public ExternalAccount findById(Long id) {
		Optional<ExternalAccount> account = externalAccountRepository.findById(id);
		return account.isPresent() ? account.get() : null;
	}

	public List<ExternalAccount> findByUser(User user) {
		return externalAccountRepository.getByUser(user);
	}
	
	public void delete(ExternalAccount account) {
		externalAccountRepository.delete(account);
	}
	
	public boolean exists(Long id) {
		return externalAccountRepository.existsById(id);
	}



}
