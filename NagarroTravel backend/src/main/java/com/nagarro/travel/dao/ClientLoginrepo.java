package com.nagarro.travel.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nagarro.travel.model.ClientLogin;

public interface ClientLoginrepo extends JpaRepository<ClientLogin, String>{

}
