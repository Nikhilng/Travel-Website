package com.nagarro.travel.service;

import java.util.Random;

import org.springframework.stereotype.Component;

@Component
public class GeneratePassword {
	
	private int leftLimit = 48; // numeral '0'
    private int rightLimit = 122; // letter 'z'
    private int targetStringLength = 8;	
	
	public String generate() {
		
	    Random random = new Random();
	 
	    String generatedString = random.ints(this.leftLimit, this.rightLimit + 1)
	      .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
	      .limit(this.targetStringLength)
	      .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
	      .toString();
	 
	    return generatedString;
	}

}
