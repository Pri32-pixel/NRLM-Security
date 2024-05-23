import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { catchError, tap,timeout } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
//import { LoginModel } from '../Models/app.LoginModel';
import { UserModel,ChangePasswordModel } from '../models/user.model';
import { Router } from '@angular/router';
import{environment} from '../../../environments/environment';
import { SecuredataService } from './securedata.service';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    public token: string;
    username: any;
    private data: any;
    public encryptInfo;
    public decryptedInfo;
    secret:string='P@ssW0rd';
     public  timer;
     logoutTime=20000;
    constructor(private _http: HttpClient, private _Route: Router,private securService:SecuredataService)
    {
        //this.data = JSON.parse(sessionStorage.getItem("currentUser"));
       // this.data=this.decrypt(sessionStorage.getItem("currentUser"));
       this.data=securService.decrypt(sessionStorage.getItem("currentUser"));
        this.token = JSON.parse(sessionStorage.getItem("token"));
 
        //this.token = this.data.tToken;
        //this.username = this.data.tUserName
    }
    private apiUrl = environment.apiEndpoint+"/api/User/GetLoginDetails/";

    

   // (body: any)

   public GetAllRole() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.get<any>(environment.apiEndpoint+"/api/Role/GetRoles/", { headers: headers }).
    pipe(tap(data =>data) ,
        catchError(this.handleError)
    );
}  

    // Get User By Role
    public GetUserbyRole(ParamId: number) {
        if (ParamId==null)
        {ParamId=0;}
            
        var editUrl = environment.apiEndpoint+"/api/user/" +"GetUserByRole/" + ParamId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http.get<any>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public ChangePassword(changePasswordModel: ChangePasswordModel) {
   
        var putUrl = environment.apiEndpoint+"/api/User/UpdateUserPassword/";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.token=JSON.parse(sessionStorage.getItem("token"));
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http.post<any>(putUrl, changePasswordModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    public ResetPassword(changePasswordModel: ChangePasswordModel) {
        var putUrl = environment.apiEndpoint+"/api/User/resetPassword/";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        //console.log('Token'+this.token);
        this.token=JSON.parse(sessionStorage.getItem("token"));
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http.post<any>(putUrl, changePasswordModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    public validateLoginUser(userModel: UserModel): Observable <any>
    {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
       // return this._http.post<any>(this.apiUrl, userModel, { headers: headers })
       
    
        return this._http.post<any>(environment.apiEndpoint+"/authenticate", userModel, { headers: headers })
            .pipe(tap((data:any) =>
            {
               // console.log(data);

                if (data.status==200)
                {
                    //sessionStorage.setItem("token", data.ObjReturn.tToken);
                    sessionStorage.setItem("currentUser", JSON.stringify(data.result));
                    sessionStorage.setItem("token", JSON.stringify(data.token));
                  //  this.encryptInfo = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(data.result), '123').toString());
                    //sessionStorage.setItem("currentUser", JSON.stringify(data.result));
                    sessionStorage.setItem("currentUser", this.securService.encrypt(data.result));
                    sessionStorage.setItem("token", JSON.stringify(data.token));
                  //const myTimeout = setTimeout(this.securService.logout1,this.securService.logoutTime );
                  this.inactivityTime();
                
                  // alert('timeout'+timeoutId);
                    // if (data.ObjReturn.nRoleId == "3") {
                    //     // store username and jwt token in local storage to keep user logged in between page refreshes
                    //     // localStorage.setItem('currentUser', 
                    //     // JSON.stringify({ 
                    //     //     username: userModel.tUserLoginId,
                    //     //     roleId: data.ObjReturn.nRoleId,
                    //     //     token: data.ObjReturn.nRoleId }));
                            
                    // }
                    // else if (data.ObjReturn.nRoleId == "2") {
                    //     // store username and jwt token in local storage to keep user logged in between page refreshes
                    //     localStorage.setItem('AdminUser', JSON.stringify({ username: userModel.tUserLoginId, token: data.ObjReturn.nRoleId }));
                    // }
                    // return true to indicate successful login
                  //  const myTimeout = setTimeout(this.action.logout, 10000);
                    return data.result;
                } else {
                    // return false to indicate failed login
                    return data;
                }
            }),
            catchError(this.handleError)
            );
    }
    inactivityTime()
    {
       // console.log('call method');
        let time;
        //window.onload = resetTimer;
        document.onmousemove = resetTimer;
        document.onkeydown = resetTimer;
        function logout() {
          //alert("You are now logged out.")
          sessionStorage.clear();
           window.location.href ="http://68.178.174.84/NRLMApp/";
        }
        function resetTimer() {
          clearTimeout(time);
          time = setTimeout(logout, 900000);
        }
    }
    /*public GetUserDetails(userModel: UserModel): Observable <any>
    {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${userModel.tToken}`);
        return this._http.post<any>(environment.apiEndpoint+"/api/user/GetUserDetails/", userModel, { headers: headers })
            .pipe(tap((data:any) =>
            {
                console.log(data);

                if (data.ReturnCode==200)
                {
                    sessionStorage.setItem("token", data.ObjReturn.tToken);
                    sessionStorage.setItem("currentUser", JSON.stringify(data.ObjReturn));
                    return data;
                } else {
                    // return false to indicate failed login
                    return data;
                }
            }),
            catchError(this.handleError)
            );
    }*/

    public GetUserDetails(userModel: UserModel): Observable <any>
    {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${userModel.tToken}`);
        //return this._http.post<any>(environment.apiEndpoint+"/api/user/GetUserDetails/", userModel, { headers: headers })
        return this._http.post<any>(environment.apiEndpoint+"authenticate", userModel, { headers: headers })
         
        .pipe(tap((data:any) =>
            {
                console.log(data);

                if (data.ReturnCode==200)
                {
                    sessionStorage.setItem("token", data.ObjReturn.tToken);
                    sessionStorage.setItem("currentUser", JSON.stringify(data.ObjReturn));
                    return data;
                } else {
                    // return false to indicate failed login
                    return data;
                }
            }),
            catchError(this.handleError)
            );
    }

    LogoutUser() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('currentUser');
        sessionStorage.clear();
    }
    isUserAdmin(): boolean {
        var data=this.securService.decrypt(sessionStorage.getItem("currentUser"));
        //const user: UserModel = JSON.parse(sessionStorage.getItem("currentUser"));
        const user: UserModel = data;
        return user.roleid === 3 ? true : false;
      }
      isUserDept(): boolean {
        var data=this.securService.decrypt(sessionStorage.getItem("currentUser"));
      //  const user: UserModel = JSON.parse(sessionStorage.getItem("currentUser"));
     const user: UserModel = data;
        //return user.roleid === 6 ? true : false;
        if(user.roleid===4 )
       return true;

      }
    
  

   
      isUserStudent(): boolean {
       // const user: UserModel = JSON.parse(sessionStorage.getItem("currentUser"));
        var data=this.securService.decrypt(sessionStorage.getItem("currentUser"));
        //  const user: UserModel = JSON.parse(sessionStorage.getItem("currentUser"));
       const user: UserModel = data;
        //if(user.roleid==8 || user.roleid==6)
        if(user.roleid>=5)
        {
            return true;    
        }
       // return user.roleid === 8 ? true : false;
      }
    getSelectedUser() {
       // const user: UserModel =sessionStorage.getItem("currentUser");
       var data=this.securService.decrypt(sessionStorage.getItem("currentUser"));
       //  const user: UserModel = JSON.parse(sessionStorage.getItem("currentUser"));
      const user: UserModel = data;
        return user;
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
