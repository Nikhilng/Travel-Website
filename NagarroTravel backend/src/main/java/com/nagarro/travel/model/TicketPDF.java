package com.nagarro.travel.model;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
@Entity
public class TicketPDF implements Serializable {
    
    private static final long serialVersionUID = 5926468583005150707L;
    
    
    @Id
    private Long id;
    
    @OneToOne()
    @MapsId
    private Ticket ticket;
    
    @Column(name = "pdf", nullable = false, columnDefinition = "mediumblob")
    private byte[] pdf;

 

    public Long getId() {
        return id;
    }

 

    public void setId(Long id) {
        this.id = id;
    }

 

    public Ticket getTicket() {
        return ticket;
    }

 

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

 

    public byte[] getPdf() {
        return pdf;
    }

 

    public void setPdf(byte[] pdf) {
        this.pdf = pdf;
    }
}
 