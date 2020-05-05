import { Component, OnInit } from '@angular/core';
import { ClientService } from '../ClientLogin/ClientLogin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private clientservice:ClientService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }


  logout(){
    this.clientservice.logout();
    this.toastr.error('Logout Successfull','User Loggedout');
    this.goto();
  }

  goto(){
    this.router.navigate(['/']);
  }

}
