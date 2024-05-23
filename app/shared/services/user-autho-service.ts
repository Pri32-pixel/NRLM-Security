import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { UserModel,RoleDropdownModel,DepartmentDropdownModel,StateDropdownModel } from "@src/app/shared/models/User.model";
import{environment} from '../../../environments/environment';
import { SecuredataService } from './securedata.service';
@Injectable({
    providedIn: 'root'
})
export class UserAuthoService {
    private data: any;
    private apiUrl = environment.apiEndpoint + "/api/User/";
   
    token: any;
    sesionuserId: any;

    constructor(private http: HttpClient,private securService:SecuredataService) {
        //this.data = JSON.parse(sessionStorage.getItem("currentUser"));
        this.data=securService.decrypt(sessionStorage.getItem("currentUser"));

       // this.token = this.data.tToken;
       this.token = JSON.parse(sessionStorage.getItem("token"));
        this.sesionuserId = this.data.userid;
    }
    
     public isAuthorizeUser() {
        var url = this.apiUrl +'isUserAuth/' + this.sesionuserId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(url, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
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
