package com.nagarro.travel.service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailService {
	
	/*
	 * The Spring Framework provides an easy abstraction for sending email by using
	 * the JavaMailSender interface, and Spring Boot provides auto-configuration for
	 * it as well as a starter module.
	 */
	

	private String bmessage = "You have requested your user name and password for the your access to the Nagarro Travel Portal:\r\n" + 
			"\r\n"+"Usename: "; 

	private String amessage="\r\n" + 
			"Please contact the Travel team if you have any questions.\r\n" + 
			"\r\n" + 
			"Thank you,\r\n" + 
			"Nagarro Travel Team.\r\n" + 
			"";
	private JavaMailSender javaMailSender;
	
	@Autowired
	public MailService(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}
	
	public void sendEmail(String email,String pass) {
		
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo(email);
		mail.setSubject("Nagarro Travel Portal Information");
		mail.setText(bmessage+email+"\r\n Password: "+pass+"\r\n"+amessage);
		
		/*
		 * This send() contains an Object of SimpleMailMessage as an Parameter
		 */
		
		javaMailSender.send(mail);
	}
	
	
	public void sendEmailWithAttachment(String email) throws MailException, MessagingException {

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
		helper.setTo(email);
		helper.setSubject("Testing Mail API with Attachment");
		helper.setText("Please find the attached document below.");
		ClassPathResource classPathResource = new ClassPathResource("Attachment.pdf");
		helper.addAttachment(classPathResource.getFilename(), classPathResource);
		javaMailSender.send(mimeMessage);

	}

}
