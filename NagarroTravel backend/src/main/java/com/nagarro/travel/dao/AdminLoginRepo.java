package com.nagarro.travel.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nagarro.travel.model.AdminLogin;

public interface AdminLoginRepo extends JpaRepository<AdminLogin, String> {

}
