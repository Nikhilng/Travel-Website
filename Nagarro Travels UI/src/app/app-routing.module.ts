import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientLoginComponent} from "./ClientLogin/ClientLogin.component"
import { RegisterUserComponent} from "./RegisterUser/RegisterUser.component"
import { ConfirmpageComponent } from './Confirmpage/Confirmpage.component';
import { ForgotPasswordComponent } from './ForgotPassword/ForgotPassword.component';
import { HomeComponent } from './Home/Home.component';
import { RegisterTicketComponent } from './Home/register-ticket/register-ticket.component';
import { ConfirmTicketComponent } from './Home/confirm-ticket/confirm-ticket.component';
import {HomeinsideComponent} from './Home/homeinside/homeinside.component'
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';


const routes: Routes = [
    { path: '', component: ClientLoginComponent },
    {path: 'Register', component: RegisterUserComponent},
    {path:'home',component: HomeComponent,
    children:[
        {path: '',component:HomeinsideComponent},
        {path: 'ticket',component: RegisterTicketComponent},
        {path: 'confirm',component:ConfirmTicketComponent}
    ]},
    {path: 'confirm', component: ConfirmpageComponent},
    {path: 'confirm/:id',component:ConfirmpageComponent},
    {path: 'forgotpassword',component: ForgotPasswordComponent},
    {path: 'logout',redirectTo:'/'},
    {path: 'admin',component:AdminComponent,
children:[
    {path:'',component:AdminloginComponent},
    {path:'admin-home',component:AdminHomeComponent}
]}
]

@NgModule({
    imports: [RouterModule.forRoot(routes),RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }