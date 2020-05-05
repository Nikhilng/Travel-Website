package com.nagarro.travel.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nagarro.travel.model.EmployeeDetails;
import com.nagarro.travel.model.Ticket;

public interface TicketRepo extends JpaRepository<Ticket, Long>{
	
	List<Ticket> findByEmail(EmployeeDetails email);

}
