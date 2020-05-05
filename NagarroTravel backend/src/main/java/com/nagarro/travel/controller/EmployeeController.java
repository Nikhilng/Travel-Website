package com.nagarro.travel.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import javax.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import com.nagarro.travel.dao.ClientLoginrepo;
import com.nagarro.travel.dao.EmployeeRepo;
import com.nagarro.travel.dao.TicketPdfRepo;
import com.nagarro.travel.dao.TicketRepo;
import com.nagarro.travel.model.ClientLogin;
import com.nagarro.travel.model.Email;
import com.nagarro.travel.model.EmployeeDetails;
import com.nagarro.travel.model.RequestedTicket;
import com.nagarro.travel.model.Ticket;
import com.nagarro.travel.model.TicketPDF;
import com.nagarro.travel.service.GeneratePassword;
import com.nagarro.travel.service.MailService;
import com.nagarro.travel.util.JwtUtil;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class EmployeeController {

	@Autowired
	TicketRepo ticketrepo;

	@Autowired
	ClientLoginrepo clientrepo;

	@Autowired
	private GeneratePassword pass;

	@Autowired
	private MailService notificationService;

	@Autowired
	private EmployeeRepo erepo;
	
	@Autowired
	private TicketPdfRepo ticketpdfrepo;

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private AuthenticationManager authenticationManager;

	@GetMapping("/home")
	public boolean home() {
		try {
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@PostMapping("/addemployee")
	public boolean employee(@RequestBody EmployeeDetails ed) {
		try {
			ed.setPassword(pass.generate());
			erepo.save(ed);
			notificationService.sendEmail(ed.getEmail(), ed.getPassword());
			return true;
		} catch (Exception e) {
			System.err.println(e);
			return false;
		}

	}

	@GetMapping("/getemployee/{eid}")
	public Optional<EmployeeDetails> getemployees(@PathVariable String eid) {
		return erepo.findById(eid);
	}

	// Email Service
	@GetMapping("/send-mail/{email}")
	public void send(@PathVariable String email) {
		Optional<EmployeeDetails> check = erepo.findById(email);
		try {
			notificationService.sendEmail(email, check.get().getPassword());
		} catch (MailException mailException) {
			System.out.println(mailException);
		}
	}

	// Send Email with attachment
	@GetMapping("/send-mail-attachment/{email}")
	public void sendWithAttachment(@PathVariable String email) throws MessagingException {

		/*
		 * Here we will call sendEmailWithAttachment() for Sending mail to the sender
		 * that contains a attachment.
		 */
		try {
			notificationService.sendEmailWithAttachment(email);
		} catch (MailException mailException) {
			System.out.println(mailException);
		}
		System.out.println("done");
	}

	// Verify Client Login Info
	@PostMapping(path = "/verifyclient")
	public String verifyclient(@RequestBody ClientLogin cl) throws Exception {

		try {
			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(cl.getUsername(), cl.getPassword()));

		} catch (Exception e) {
			throw new Exception("inavalid username/password");
		}

		return jwtUtil.generateToken(cl.getUsername());
	}

	@GetMapping("/logout")
	public boolean logout() {
		return true;
	}

	@PostMapping("/saveticket")
	public boolean saveTicket(@RequestBody RequestedTicket rt) {

		try {
			Optional<EmployeeDetails> emp = erepo.findById(rt.getEmail());
			rt.getTicket().setEmail(emp.get());
			System.out.println(rt.getTicket());
			ticketrepo.save(rt.getTicket());
			return true;
		} catch (Exception e) {
			System.err.print(e);
			return false;
		}
	}
	@PutMapping("/updateticket")
    public boolean updateTicket(@RequestBody RequestedTicket rt) {

 

        try {
            Optional<EmployeeDetails> emp = erepo.findById(rt.getEmail());
            rt.getTicket().setEmail(emp.get());
            System.out.println(rt.getTicket());
            ticketrepo.save(rt.getTicket());
            return true;
        } catch (Exception e) {
            System.err.print(e);
            return false;
        }
    }

	@PostMapping("/viewticket")
	public List<Ticket> ticketlist(@RequestBody Email email) {
		try {
			return ticketrepo.findByEmail(erepo.findById(email.getEmail()).get());
		} catch (Exception e) {
			return null;
		}
	}
	
	@PutMapping("/updatefiledata")
    public boolean uploadimage(@RequestParam("file") MultipartFile file,
            @RequestParam("Id") long id) throws IOException {
        Optional<Ticket> t = ticketrepo.findById(id);
        try {
            InputStream inputStream = null;
            inputStream = file.getInputStream();
            byte[] pdfInBytes = readFully(inputStream);
            TicketPDF tick = new TicketPDF();
            tick.setPdf(pdfInBytes);
            tick.setTicket(t.get());
            ticketpdfrepo.save(tick);
            return true;
            }catch (Exception e) {
                return false;
            }
    }
   
    @PutMapping("/updatestatus")
    public boolean updateStatus(@RequestParam("status") String status,@RequestParam("Id") long id) {
        Optional<Ticket> t = ticketrepo.findById(id);
        t.get().setStatus(status);
        ticketrepo.save(t.get());
        return true;
    }
   
    public static byte[] readFully(InputStream input) throws IOException
    {
        byte[] buffer = new byte[1024];
        int bytesRead;
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        while ((bytesRead = input.read(buffer)) != -1)
        {
            output.write(buffer, 0, bytesRead);
        }
        return output.toByteArray();
    }
    
    @GetMapping("/file/{id}")
    public byte[] download(@PathVariable Long id) {
        Optional<Ticket> tick = ticketrepo.findById(id);
        Optional<TicketPDF> pdf = ticketpdfrepo.findById(tick.get().getId());
       
        return pdf.get().getPdf();
    }

}