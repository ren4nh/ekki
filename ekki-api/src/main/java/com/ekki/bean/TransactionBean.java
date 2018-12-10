package com.ekki.bean;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionBean {
	
	private BigDecimal amount;
	private Long destinationId;
	private Long creditCardId;

}
