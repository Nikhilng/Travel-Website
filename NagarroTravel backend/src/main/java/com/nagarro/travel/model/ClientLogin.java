package com.nagarro.travel.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;


@Entity
public class ClientLogin implements Serializable{
	
	
	private static final long serialVersionUID = 5926468583005150707L;
	
	@Id
	private String username;
	private String password;
	
	public ClientLogin() {
		
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "ClientLogin [username=" + username + ", password=" + password + "]";
	}
	
}
