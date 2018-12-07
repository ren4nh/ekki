package com.ekki.domain;

import java.io.Serializable;

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
@Table(name = "external_account")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SequenceGenerator(name = "seqExternalAccount", sequenceName = "SEQEXTERNALACCOUNT", allocationSize = 1)
public class ExternalAccount implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "seqExternalAccount")
	private Long id;
	@NotNull(message = "Agência deve ser informada")
	private String branchCode;
	@NotNull(message = "Conta deve ser informada")
	private String accountNumber;
	@NotNull(message = "Banco deve ser informado")
	private String bank;
	@NotNull(message = "Descrição deve ser informada")
	private String description;
	@ManyToOne
	@JoinColumn(name = "USERID")
	private User user;

}
