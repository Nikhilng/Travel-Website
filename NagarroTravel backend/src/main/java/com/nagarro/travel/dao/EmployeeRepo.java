package com.nagarro.travel.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nagarro.travel.model.EmployeeDetails;

public interface EmployeeRepo extends JpaRepository<EmployeeDetails, String>{

}
