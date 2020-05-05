import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeDetails } from './RegisterUser';

@Component({
  selector: 'RegisterUser-root',
  templateUrl: './RegisterUser.component.html',
  styleUrls: ['./RegisterUser.component.css']
})
export class RegisterUserComponent implements OnInit {

  empdetails:EmployeeDetails = new EmployeeDetails();
  submitted=false;
  form:any
    constructor(private router: Router,
        private activatedRoute: ActivatedRoute){    
         }

        ngOnInit(){
          //this.empdetails.fname ='';
          this.getdataifany()
        }

        getdataifany(){
          this.activatedRoute.queryParams.subscribe((params) =>{
            if(params.data)
            {this.empdetails=JSON.parse(atob(params.data));}
          });   
        }
       
        submit() {
          this.submitted = true;
          this.save();    
        } 

        save() {        
      this.gotoList();
        }
        gotoList(){

          this.router.navigate(['/confirm'],{
            queryParams:{data:btoa(JSON.stringify(this.empdetails))}
          });
         
        }
    
}
