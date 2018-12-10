package com.ekki.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SequenceGenerator(name = "seqTransaction", sequenceName = "SEQTRANSACTION", allocationSize = 1)
public class Transaction implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "seqTransaction")
	private Long id;
	private BigDecimal amount;
	private LocalDateTime createdAt;
	@ManyToOne
	@JoinColumn(name = "USERID")
	private User user;
	@ManyToOne
	@JoinColumn(name = "DESTINATIONID")
	private User destination;
	private String description;
	@Builder.Default
	private BigDecimal amountPayedWithCreditCard = BigDecimal.ZERO;
	private Status status;
	
	public enum Status {
		CANCELED, COMPLETED
	}
	

}
