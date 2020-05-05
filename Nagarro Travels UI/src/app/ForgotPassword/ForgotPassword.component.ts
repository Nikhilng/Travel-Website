import { Component ,OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup,FormControl,Validators}  from '@angular/forms';
import {ForgotService} from './ForgotPassword.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'forgot-password',
  templateUrl: './ForgotPassword.component.html',
  styleUrls: ['./ForgotPassword.component.css']
})
export class ForgotPasswordComponent implements OnInit{
  

  form:any;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private forgotservice: ForgotService,
    private toastr: ToastrService
    ){
    
    }
  ngOnInit(){
  }
  sendmail(){
     this .form=(<HTMLInputElement>document.getElementById("email")).value;
    this.forgotservice.sendemail(this.form)
    .subscribe((data) => {
    this.toastr.success('Check your email','Password Reset Done')}, error => console.log(error));
    this.goto();
  }

  goto(){
    alert("Please Check your Mail");
    this.router.navigate(['/']);
  }
}

