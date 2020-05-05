import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClient,HttpClientModule,} from '@angular/common/http'
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './Home/Home.component';
import { HomeinsideComponent } from './Home/homeinside/homeinside.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { ForgotPasswordComponent } from './ForgotPassword/ForgotPassword.component';
import { ConfirmTicketComponent } from './Home/confirm-ticket/confirm-ticket.component';
import { ConfirmpageComponent } from './Confirmpage/Confirmpage.component';
import { ClientLoginComponent } from './ClientLogin/ClientLogin.component';
import { RegisterTicketComponent } from './Home/register-ticket/register-ticket.component';
import { RegisterUserComponent } from './RegisterUser/RegisterUser.component';
import { FormsModule,FormGroup,FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { Observable } from 'rxjs';
import { ToastrService,ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import { ChartsModule } from 'ng2-charts';
import { FileSaverModule } from 'ngx-filesaver';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    HomeinsideComponent,
    AdminHomeComponent,
    AdminComponent,
    AdminloginComponent,
    ForgotPasswordComponent,
    ClientLoginComponent,
    ConfirmTicketComponent,
    ConfirmpageComponent,
    RegisterTicketComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    ChartsModule,
    FileSaverModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
