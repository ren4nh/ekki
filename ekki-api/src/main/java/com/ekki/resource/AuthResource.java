package com.ekki.resource;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ekki.bean.UserCredentialsBean;
import com.ekki.security.JwtConfig;
import com.ekki.utils.ApiResponse;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@RequestMapping("/auth")
public class AuthResource {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtConfig jwtConfig;

	@PostMapping
	public ResponseEntity<Object> auth(@RequestBody UserCredentialsBean credentials) {
		Authentication authenticationRequest = new UsernamePasswordAuthenticationToken(credentials.getUsername().trim(),
				credentials.getPassword());
		Authentication auth = authenticationManager.authenticate(authenticationRequest);
		Long now = System.currentTimeMillis();
		String token = Jwts.builder().setSubject(auth.getName())
				.claim("authorities",
						auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
				.setIssuedAt(new Date(now)).setExpiration(new Date(now + jwtConfig.getExpiration() * 1000))
				.signWith(SignatureAlgorithm.HS512, jwtConfig.getSecret().getBytes()).compact();
		Map<String, Object> ret = new HashMap<>();
		ret.put("token", token);
		return ResponseEntity.ok(new ApiResponse(ret));
	}

	@PostMapping("validateToken")
	public ResponseEntity<Object> validate(@RequestBody UserCredentialsBean credentials) {
		Claims claims = Jwts.parser().setSigningKey(jwtConfig.getSecret().getBytes())
				.parseClaimsJws(credentials.getToken()).getBody();
		String username = claims.getSubject();
		if (username == null) {
			return new ResponseEntity<Object>(new ApiResponse(400, 400, "Erro ao validar token"),
					HttpStatus.BAD_REQUEST);
		}
		@SuppressWarnings("unchecked")
		List<String> authorities = (List<String>) claims.get("authorities");

		UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(username, null,
				authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));

		Long now = System.currentTimeMillis();
		String token = Jwts.builder().setSubject(auth.getName())
				.claim("authorities",
						auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
				.setIssuedAt(new Date(now)).setExpiration(new Date(now + jwtConfig.getExpiration() * 1000))
				.signWith(SignatureAlgorithm.HS512, jwtConfig.getSecret().getBytes()).compact();
		Map<String, Object> ret = new HashMap<>();
		ret.put("token", token);
		return ResponseEntity.ok(new ApiResponse(ret));
	}
}
