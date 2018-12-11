package com.ekki.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ekki.domain.Token;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {

	Token findByToken(String token);

}
