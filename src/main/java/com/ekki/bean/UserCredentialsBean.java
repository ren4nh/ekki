package com.ekki.bean;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * API model user credentials.
 *
 * @author renanh
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserCredentialsBean {

	@NotBlank(message = "Email deve ser informado")
	@Email(message = "Email no formato incorreto")
	private String username;
	@NotBlank(message = "Nome deve ser informado")
	private String name;
	@NotBlank(message = "Senha deve ser informado")
	@Size(min = 6, max = 20, message = "Senha deve ter no minimo 6 caracteres e no maximo 20")
	private String password;
	private String token;

}