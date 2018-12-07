package com.ekki.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ekki.domain.CreditCard;
import com.ekki.domain.User;

@Repository
public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {
	
	List<CreditCard> getByUser(User user);

}
