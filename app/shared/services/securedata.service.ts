import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { UtilityHelper } from './utility-service';
import { environment } from '@src/environments/environment.prod';
import { map, catchError } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';
import { Observable, throwError } from 'rxjs'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecuredataService {
   secret:string='P@ssw0rd';
   //for 30 minute
  //logoutTime=1800000;
   logoutTime=10000;
   apiLogoutURL:'http://68.178.174.84/NRLMApp/'
   //apiLogoutURL:'localhost:4200'

  constructor( private http: HttpClient,private utliHelper:UtilityHelper,    private router: Router) {


   }

  encrypt(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.secret,
     {
        keySize: 128 / 8,
        iv: this.secret,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString();
    }
    decrypt(data) {
        if(data!=null)
        {
  
  
        return JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(data,  this.secret, 
        {
            keySize: 128 / 8,
            iv: this.secret,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          })));
        }
        else return null;
    }
    logout1()
    {
     console.log("Expired token data"); 
    /* sessionStorage.removeItem('token');
     sessionStorage.removeItem('currentUser');
     sessionStorage.clear();
    //this.loginService.LogoutUser();
   // alert('No you can logout');
  // this.openPage('/login', true);
   //this.router.navigate(['/login'], { replaceUrl: true });
   //this.utliHelper.tesCall();
   //alert('Session has expired, Please login');
   //window.location.href = this.env.apiEndpoint+'/login';
   window.location.href = 'localhost:4200/login';*/
  document.onmouseover=this.resetTimer;
  document.onkeyup=this.resetTimer;
  document.onkeydown=this.resetTimer;
  
   //this.router.navigate(['login']);
 
   //window.location.href = 'http://localhost:4200/login';
   
    }
    openPage(navItemRoute: string, clearHistory: boolean): void {
      this.router.navigate([navItemRoute], { replaceUrl: clearHistory });
    }
    resetTimer()
    {
      const myTimeout = setTimeout(this.logout1,this.logoutTime)
    }
    logout(): Observable<any> {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('currentUser');
      sessionStorage.clear();
      return this.http
        .get('http://localhost:4200/login')
        .pipe(
          map(a => this.mapLogoutResult()),
          catchError(this.handleError)
        );
    }
    mapLogoutResult()
    {

    }
    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
      } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError('Something bad happened; please try again later.');
  };
}


