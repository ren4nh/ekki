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

	@Query(value = "select * from Transactions t where t.created_at >=:initialDate and t.created_at <=:finalDate and t.userid=:userId and t.destinationid=:destinationId and t.status=1 order by t.created_at desc limit 1", nativeQuery = true)
	Transaction getSameTransactionCreateAtLast2Minutes(@Param("initialDate") LocalDateTime initialDate,
			@Param("finalDate") LocalDateTime finalDate, @Param("userId") Long userId, @Param("destinationId") Long destinationId);

}
