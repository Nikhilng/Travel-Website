package com.nagarro.travel.dao;

 

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

 

import com.nagarro.travel.model.TicketPDF;

 

@Repository
public interface TicketPdfRepo extends JpaRepository<TicketPDF, Long> {

 

}