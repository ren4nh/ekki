package com.ekki.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
@SequenceGenerator(name = "seqUser", sequenceName = "SEQUSER", allocationSize = 1)
public class User implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "seqUser")
	private Long id;
	@NotEmpty(message = "Username is required")
	private String username;
	@NotEmpty(message = "Password is required")
	@JsonIgnore
	private String password;
	@NotEmpty(message = "Name is required")
	private String name;
	@Builder.Default
	private String role = "USER";
	@Builder.Default
	private boolean active = false;
	private LocalDateTime createdAt;
	@Builder.Default
	private BigDecimal balance = BigDecimal.ZERO;

}
