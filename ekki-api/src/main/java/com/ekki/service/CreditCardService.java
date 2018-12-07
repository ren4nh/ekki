package com.ekki.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ekki.domain.CreditCard;
import com.ekki.domain.User;
import com.ekki.repository.CreditCardRepository;

@Service
public class CreditCardService {
	
	@Autowired
	private CreditCardRepository creditCardRepository;
	
	public CreditCard create(CreditCard creditCard) {
		return creditCardRepository.save(creditCard);
	}

	public CreditCard update(CreditCard creditCard) {
		return creditCardRepository.saveAndFlush(creditCard);
	}

	public CreditCard findById(Long id) {
		Optional<CreditCard> creditCard = creditCardRepository.findById(id);
		return creditCard.isPresent() ? creditCard.get() : null;
	}

	public List<CreditCard> findByUser(User user) {
		return creditCardRepository.getByUser(user);
	}
	
	public void delete(CreditCard creditCard) {
		creditCardRepository.delete(creditCard);
	}
	
	public boolean exists(Long id) {
		return creditCardRepository.existsById(id);
	}



}
