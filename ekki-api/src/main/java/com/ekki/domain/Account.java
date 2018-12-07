package com.ekki.domain;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "account")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SequenceGenerator(name = "seqAccount", sequenceName = "SEQACCOUNT", allocationSize = 1)
public class Account implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "seqAccount")
	private Long id;
	@NotNull(message = "Branch code is required")
	private String branchCode;
	private String accountNumber;
	private BigDecimal balance;
	@ManyToOne
	@JoinColumn(name = "USERID")
	private User user;
	

}
