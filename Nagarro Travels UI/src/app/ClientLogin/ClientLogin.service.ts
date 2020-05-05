import { Injectable, SystemJsNgModuleLoader } from "@angular/core";
import {HttpClient, HttpHeaders,HttpParams} from "@angular/common/http";
import {Observable,of} from "rxjs";
import { catchError, mapTo, tap } from 'rxjs/operators';
import {ClientLogin} from './ClientLogin';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class ClientService{

    private readonly JWT_TOKEN = 'JWT_TOKEN';

  private readonly loggedUser: '';
    private baseUrl = "http://localhost:8080/";

    constructor(private http: HttpClient,
      private router: Router,
      private route: ActivatedRoute){}

    createClient(client: ClientLogin): Observable<Object>{
        return this.http.post(this.baseUrl+"addClient",client);
    }

    getClient(): Observable<any>{
        return this.http.get(this.baseUrl+"clients");
    }

    verifyclient(client): Observable<Object>{
        return this.http.post<string>(this.baseUrl+"verifyclient",client,{responseType: 'text' as 'json' })
        .pipe(tap(tokens => this.doLoginUser(client.username, tokens)),
            mapTo(true),
            catchError(error => {
              return of(false);
            }));;
    }

    private doLoginUser(username, tokens:string) {
        localStorage.setItem(this.loggedUser,username)
        this.storeTokens(tokens);
      }

      private storeTokens(tokens:string) {
        localStorage.setItem(this.JWT_TOKEN, tokens); 
      }

      authenticate(){
          const headers = this.setheader();
          return this.http.get<string>(this.baseUrl+"home", {headers, responseType: 'text' as 'json'})
          .pipe(tap(tokens => console.log()),
            mapTo(true),
            catchError(error => {
              return of(false);
            }));;
      }

      saveticket(data: Object):Observable<Object> {
        const headers = this.setheader();
        return this.http.post<any>(this.baseUrl+"saveticket",{ticket:data,email:localStorage.getItem(this.loggedUser)},{headers, responseType: 'text' as 'json'})
      }

      coronadetails(destination:any): Observable<any>{
        var now = new Date();
        now.setUTCHours(0,0,0,0);
       var today = now.toISOString();
        var isobefore = new Date();
        isobefore.setMonth(isobefore.getMonth()-1);
        isobefore.setUTCHours(0,0,0,0);
        var before = isobefore.toISOString();
        const params = new HttpParams().set('from',before).set('to',today);
        return this.http.get("https://api.covid19api.com/country/"+destination,{params});
      }
      updateticket(data:Object):Observable<Object>{
        const headers = this.setheader();
        return this.http.put<any>(this.baseUrl+"updateticket",{ticket:data,email:localStorage.getItem(this.loggedUser)},{headers, responseType: 'text' as 'json'})
      }

      viewticket(): Observable<any>{
        const headers = this.setheader();
        return this.http.post<any>(this.baseUrl+"viewticket",{email:localStorage.getItem(this.loggedUser)},{headers, responseType: 'text' as 'json'})
      }

      logout(){
        const headers = this.setheader();       
        this.destroyvalue();
          return this.http.get<string>(this.baseUrl+"logout",{headers, responseType: 'text' as 'json'})        
      }

      setheader(){
        let tokenStr = this.settoken();
          const headers = new HttpHeaders().set('Authorization', tokenStr);
          return headers;
      }

      settoken(){
        let tokenStr = "Bearer "+localStorage.getItem(this.JWT_TOKEN);
        return tokenStr;
      }

      destroyvalue(){
        localStorage.removeItem(this.JWT_TOKEN);
        localStorage.removeItem(this.loggedUser);
      }

      adminlogin(user,pass): Observable<any>{
        return this.http.post(this.baseUrl+"admin",{username:user,password:pass});
      }

      getAllTickets(){
        const headers = this.setheader();
        return this.http.get<any>(this.baseUrl+"getalltickets",{headers, responseType: 'text' as 'json'});
      }
        
      updatestatus(status,id){
        const finaldata : FormData = new FormData();
        finaldata.append('Id',id)
          finaldata.append('status',status)
          const headers = this.setheader();
          return this.http.put(this.baseUrl+"updatestatus",finaldata,{headers, responseType: 'text' as 'json'})
      }
 
      fileUpdate(File:File,id:string,status:string){
        const finaldata : FormData = new FormData()
        if(File != null) {
          finaldata.append('file',File)
          finaldata.append('Id',id)
                }
         const headers = this.setheader();
          return this.http.put(this.baseUrl+"updatefiledata",finaldata,{headers, responseType: 'text' as 'json'})
      }
      downloadFile(id): Observable<any>{
        const headers = this.setheader();
        return this.http.get(this.baseUrl+"file/"+id, {headers, responseType: 'blob'});
      }

}