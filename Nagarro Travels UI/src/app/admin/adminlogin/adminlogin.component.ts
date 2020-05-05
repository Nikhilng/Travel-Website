import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/ClientLogin/ClientLogin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private clientservice: ClientService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  check(){
    let user = (<HTMLInputElement>document.getElementById("email")).value;
    let pass = (<HTMLInputElement>document.getElementById('password')).value;
    this.admincontrol(user,pass);
  }

  admincontrol(user,pass){
    this.clientservice.adminlogin(user,pass)
    .subscribe(data => {if(data){
      this.goto();
    }
    else{
      this.toastr.error('Invalid Credentials');}
  },error => console.log(error));
  }
  goto(){
    this.router.navigate(['/admin/admin-home']);
    this.toastr.success('Login Successfull','Admin Loggedin');
  }

}
