import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ConfirmService} from './Confirmpage.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'confirm-page',
  templateUrl: './Confirmpage.component.html',
  styleUrls: ['./Confirmpage.component.css']
})
export class ConfirmpageComponent implements OnInit {
  empdetails:any;
  constructor(
    private router: Router,
        private activatedRoute: ActivatedRoute,
        private confirmservice: ConfirmService,
        private toastr: ToastrService
  ){
  }

  ngOnInit(){
    this.activatedRoute.queryParams.subscribe((params) =>{
      this.empdetails=JSON.parse(atob(params.data));
    });    
  }

edit(){
  this.router.navigate(['/Register'],{
    queryParams:{data:btoa(JSON.stringify(this.empdetails))}
  })
}

savedata(){
  this.confirmservice.createuser(this.empdetails)
            .subscribe(res =>{
              if(res){this.toastr.success('Registration Successfull','User Registered');
            this.goto()}
            else{
              this.toastr.warning('User Already exist');
              this.goto();
            }});
}

goto(){
this.router.navigate(['/']);
}
}
