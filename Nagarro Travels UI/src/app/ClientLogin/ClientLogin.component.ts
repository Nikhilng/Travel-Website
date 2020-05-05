
import { Component, OnInit } from '@angular/core';
import {ClientService} from './ClientLogin.service';
import {Router,ActivatedRoute, ParamMap} from '@angular/router'
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-ClientLogin',
  templateUrl: './ClientLogin.component.html',
  styleUrls: ['./ClientLogin.component.css']
})
export class ClientLoginComponent implements OnInit{

    clientlogin:any;
    submitted=false;  
    constructor(private clientservice: ClientService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr:ToastrService,
        ){}

    ngOnInit(){
    }

    newClient(): void{
        this.submitted = false;
    }

    save() {
        this.clientservice.createClient(this.clientlogin)
          .subscribe(res => {
            this.toastr.success('Login Successfull','User Loggedin')});
        this.gotoList();
      }

    onSubmit() {
        this.submitted = true;
        this.save();    
      } 

      gotoList() {
        this.router.navigate(['/']);

        alert("added successfully");
      }

      verify(){
        let user = (<HTMLInputElement>document.getElementById("username")).value;
        let pass = (<HTMLInputElement>document.getElementById("password")).value
        this.clientservice.verifyclient({username:user,password:pass})
        .subscribe(data =>{if(data){
          this.gotohome();
          this.toastr.success('Login Successfull','Loggedin');
        }else{
          this.toastr.error('Invalid Credentials');
          this.router.navigate(['/']);
        }} ,error => console.log(error));
   

      }
      gotohome(){
        this.router.navigate(['/home']);
      }

      gotoregister():void{
        this.router.navigate(['/Register']);
      }
    }