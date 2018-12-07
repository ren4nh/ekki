package com.ekki.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ekki.domain.ExternalAccount;
import com.ekki.domain.User;

@Repository
public interface ExternalAccountRepository extends JpaRepository<ExternalAccount, Long> {
	
	List<ExternalAccount> getByUser(User user);

}
