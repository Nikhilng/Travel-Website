import { Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})

export class ForgotService{
    private baseUrl = "http://localhost:8080/";

    constructor(private http: HttpClient,
        private toaster:ToastrService){}

    sendemail(user): Observable<any>{
        return this.http.get(this.baseUrl+"send-mail/"+user);
        
    }
}