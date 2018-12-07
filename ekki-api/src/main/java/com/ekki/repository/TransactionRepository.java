package com.ekki.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ekki.domain.Transaction;
import com.ekki.domain.Transaction.Status;
import com.ekki.domain.User;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

	List<Transaction> getByUser(User user);

	@Query(value = "select t from Transaction t where t.createdAt >=:initialDate and t.createdAt <=:finalDate and t.user.id=:userId and t.externalAcccount.id=:externalAccountId and t.destination.id=:destinationId and t.status=:status order by t.createAt desc limit 1")
	Transaction getSameTransactionCreateAtLast2Minutes(@Param("initialDate") LocalDateTime initialDate,
			@Param("finalDate") LocalDateTime finalDate, @Param("userId") Long userId,
			@Param("externalAccountId") Long externalAccountId, @Param("destinationId") Long destinationId, Status status);

}
