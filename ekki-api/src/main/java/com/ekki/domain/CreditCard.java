package com.ekki.domain;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;

import org.hibernate.validator.constraints.br.CPF;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "creditcard")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@SequenceGenerator(name = "seqCreditCard", sequenceName = "SEQCREDITCARD", allocationSize = 1)
public class CreditCard implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "seqCreditCard")
	private Long id;
	@NotNull(message = "Número do cartão é obrigatório")
	private Long cardNumber;
	@NotNull(message = "Nome é obrigatório")
	private String cardName;
	@NotNull(message = "Código de segurança é obrigatório")
	private Long securityCode;
	@NotNull(message = "Data de expiração deve ser informada")
	@Past(message = "Cartão já expirado")
	private LocalDateTime expiredAt;
	@CPF(message = "Cpf inválido")
	private String cpf;
	@ManyToOne
	@JoinColumn(name = "USERID")
	@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
	private User user;
}
