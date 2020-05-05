package com.nagarro.travel.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.travel.dao.AdminLoginRepo;
import com.nagarro.travel.dao.TicketRepo;
import com.nagarro.travel.model.AdminLogin;
import com.nagarro.travel.model.Ticket;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AdminLoginController {
	
	@Autowired
	AdminLoginRepo adminrepo;
	
	@Autowired
	TicketRepo tickets;
	
	
	@PostMapping("/admin")
	public boolean adminverify(@RequestBody AdminLogin admin) {
		try {
			Optional<AdminLogin> res = adminrepo.findById(admin.getUsername());
			if(res.get().getUsername().equals(admin.getUsername()) && res.get().getPassword().equals(admin.getPassword())) {
				return true;
			}else {
				return false;
			}
		}catch (Exception e) {
			return false;
		}
	}
	
	@GetMapping("/getalltickets")
	public List<Ticket> addclient() {
//		System.out.println(tickets.findAll());
		return tickets.findAll();
	}

}
