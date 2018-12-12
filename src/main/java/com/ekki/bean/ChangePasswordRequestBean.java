package com.ekki.bean;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordRequestBean {
	
	@NotBlank(message = "Password deve ser informado")
	@Size(min = 6, max = 20, message = "Senha deve ter no minimo 6 caracteres e no maximo 20")
	private String password;
	@NotBlank(message = "Token deve ser informado")
	private String token;
	@NotBlank(message = "Confirmação do password deve ser informado")
	private String confirmPassword;
	@NotBlank(message = "Email deve ser informado")
	@Email(message = "Email no formato incorreto")
	private String username;

}
