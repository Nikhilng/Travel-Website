import { Injectable, SystemJsNgModuleLoader } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ConfirmService{
    private baseUrl = "http://localhost:8080/";


    constructor(private http: HttpClient){}

    getuser(user): Observable<any>{
        return this.http.get(this.baseUrl+"getemployee/"+user);
    }

    createuser(user: Object): Observable<Object>{
        return this.http.post(this.baseUrl+"addemployee",user);
    }
}