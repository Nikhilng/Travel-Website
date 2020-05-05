import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmService } from 'src/app/Confirmpage/Confirmpage.service';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/ClientLogin/ClientLogin.service';
 
@Component({
  selector: 'app-confirm-ticket',
  templateUrl: './confirm-ticket.component.html',
  styleUrls: ['./confirm-ticket.component.css']
})
export class ConfirmTicketComponent implements OnInit {
 
  ticket:any;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private clientservice: ClientService) { }
 
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) =>{
      this.ticket=JSON.parse(atob(params.data));
    });  
    this.authenticate();
  }

  authenticate(){
    this.clientservice.authenticate()
    .subscribe(data => {if(!data){
      this.router.navigate(['/'])
    }},error => console.log(error,"yeh"))
  }
 
  edit(){
    this.router.navigate(['/home/ticket'],{
      queryParams:{data:btoa(JSON.stringify(this.ticket))}
    });
  }
 
  savedata(){
    if(!this.ticket.id){
    this.clientservice.saveticket(this.ticket)
    .subscribe(res =>{
      if(res){this.toastr.success('Ticket Added');
    this.goto()}
    else{
      this.toastr.warning('Ticket Already exist');
      this.goto();
    }});
  }else{
    this.clientservice.updateticket(this.ticket)
    .subscribe(res =>{
      if(res){this.toastr.success('Ticket Updated');
    this.goto()}
    else{
      this.toastr.warning('Ticket Already exist');
      this.goto();
    }});}
  }
 
  goto(){
    this.router.navigate(['/home']);
  }
 
}