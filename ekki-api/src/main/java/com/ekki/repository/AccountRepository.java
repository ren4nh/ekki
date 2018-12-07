package com.ekki.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ekki.domain.Account;
import com.ekki.domain.User;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
	
	Account getByUser(User user);

}
