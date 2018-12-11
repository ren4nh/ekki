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

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "token")
@SequenceGenerator(name = "seqToken", sequenceName = "SEQTOKEN", allocationSize = 1)
public class Token implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "seqToken")
	private Long id;
	private String token;
	private LocalDateTime expiredAt;
	private boolean used = false;
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "USERID")
	private User user;
	private Type type;
	
	public enum Type {
		ACTIVATE, FORGOT_PASSWORD
	}

}
