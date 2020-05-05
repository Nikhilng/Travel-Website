package com.nagarro.travel.model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import com.fasterxml.jackson.annotation.JsonIgnore;

 @Entity
public class Ticket {
@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    private long id;

 

    private String request;
    private String priority;
    private String travelcity;
    private String fromloc;
    private String startdate;
    private String enddate;
    private String submitdate;
    private String passport;
    private String project;
    private String nagcli;
    private String otherinfo;
    private String status;
    
    
    

 

    @ManyToOne()
    @JoinColumn(name = "email")
    @JsonIgnore
    private EmployeeDetails email;
    
    @JsonIgnore
    @OneToOne(mappedBy = "ticket")
    TicketPDF pdf;

 

    public String getRequest() {
        return request;
    }

 

    public void setRequest(String request) {
        this.request = request;
    }

 

    public String getPriority() {
        return priority;
    }

 

    public void setPriority(String priority) {
        this.priority = priority;
    }

 

    public String getTravelcity() {
        return travelcity;
    }

 

    public void setTravelcity(String travelcity) {
        this.travelcity = travelcity;
    }

 

    public String getFromloc() {
        return fromloc;
    }

 

    public void setFromloc(String fromloc) {
        this.fromloc = fromloc;
    }

 

    public String getStartdate() {
        return startdate;
    }

 

    public void setStartdate(String startdate) {
        this.startdate = startdate;
    }

 

    public String getEnddate() {
        return enddate;
    }

 

    public void setEnddate(String enddate) {
        this.enddate = enddate;
    }

 

    public String getPassport() {
        return passport;
    }

 

    public void setPassport(String passport) {
        this.passport = passport;
    }

 

    public String getProject() {
        return project;
    }

 

    public void setProject(String project) {
        this.project = project;
    }

 

    public String getNagcli() {
        return nagcli;
    }

 

    public void setNagcli(String nagcli) {
        this.nagcli = nagcli;
    }

 

    public String getOtherinfo() {
        return otherinfo;
    }

 

    public void setOtherinfo(String otherinfo) {
        this.otherinfo = otherinfo;
    }

 

    public long getId() {
        return id;
    }

 

    public void setId(long id) {
        this.id = id;
    }

 

    public String getStatus() {
        return status;
    }

 

    public void setStatus(String status) {
        this.status = status;
    }

 

    public EmployeeDetails getEmail() {
        return email;
    }

 

    public void setEmail(EmployeeDetails email) {
        this.email = email;
    }

 

    public String getSubmitdate() {
        return submitdate;
    }

 

    public void setSubmitdate(String submitdate) {
        this.submitdate = submitdate;
    }

 

    public TicketPDF getPdf() {
        return pdf;
    }

 

    public void setPdf(TicketPDF pdf) {
        this.pdf = pdf;
    }
    

 

}
 