package com.nagarro.travel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.travel.dao.ClientLoginrepo;
import com.nagarro.travel.model.ClientLogin;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ClientLoginController {
	
	
	@Autowired
	ClientLoginrepo clientrepo;
	
	@PostMapping(path="/addClient")
	public ClientLogin addclient(@RequestBody ClientLogin cl) {
		return clientrepo.save(cl);
		
	}
	
	@GetMapping(path = "/clients")
	public List<ClientLogin> getClient() {
		return clientrepo.findAll();
	}
	
	
	}	
