import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/ClientLogin/ClientLogin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ticket } from '../ticket';

@Component({
  selector: 'app-register-ticket',
  templateUrl: './register-ticket.component.html',
  styleUrls: ['./register-ticket.component.css']
})
export class RegisterTicketComponent implements OnInit {

  ticket:Ticket = new Ticket();

  constructor(private clientservice: ClientService,
    private router:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.setDates();
    this.activatedRoute.queryParams.subscribe((params) =>{
      if(params.data)
      {this.ticket=JSON.parse(atob(params.data));
    }
    });  
    this.authenticate();
  }
  authenticate(){
    this.clientservice.authenticate()
    .subscribe(data => {if(!data){
      this.router.navigate(['/']);
    }},error => console.log(error,"yeh"))
  }

  onsubmit(){
this.ticket.submitdate = new Date().toISOString().substring(0,10);
this.router.navigate(['/home/confirm'],{
      queryParams:{data:btoa(JSON.stringify(this.ticket))}
    });
  }
setDates(){
this.ticket.startdate = new Date().toISOString().substring(0,10);
this.ticket.enddate = new Date().toISOString().substring(0,10);
  }


}
