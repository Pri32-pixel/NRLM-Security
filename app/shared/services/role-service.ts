import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RoleViewModel } from "@src/app/shared/models/Role.model";
// import { environment } from "src/app/Shared/environment";
import{environment} from '../../../environments/environment';
import { SecuredataService } from './securedata.service';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    private data: any;
    private apiUrl = environment.apiEndpoint + "/api/Role/";
    private apiCountryUrl = environment.apiEndpoint + "/api/Country/";
    token: any;
    username: any;

    constructor(private http: HttpClient,private securService:SecuredataService) {
      //  this.data = JSON.parse(sessionStorage.getItem("currentUser"));
       // this.token = this.data.tToken;
       this.data=securService.decrypt(sessionStorage.getItem("currentUser"));

       this.token = JSON.parse(sessionStorage.getItem("token"));
        this.username = this.data.tUserName
    }
    // Save Scheme
    public SaveScheme(districtViewModel: RoleViewModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl, districtViewModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    // Get All Global Paramater
    public GetAllRole() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(this.apiUrl+"getRoles/", { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    
    // Get District By RoleId
    public GetRole(CountryId:number) {
        if (CountryId==null)
        {CountryId=0;}
            
        var editUrl = this.apiUrl +"getRoleByCountryId/" + CountryId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<RoleViewModel[]>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    //    
    // Get Global Paramater ID or All
    public GetRoleById(RoleId: number) {
        if (RoleId==null)
        {RoleId=0;}
            
        var editUrl = this.apiUrl +"getRole/" + RoleId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    // Add  District
    public AddRole(roleViewModel: RoleViewModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl + 'AddRole/', roleViewModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    // Update District
    public UpdateRole1(roleViewModel: RoleViewModel) {
        var putUrl = this.apiUrl + 'updateRole' ;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        //console.log('token'+`${this.token}`);
        return this.http.post<any>(putUrl, roleViewModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    public UpdateRole(roleViewModel: RoleViewModel) {
        var putUrl = this.apiUrl+"updateRole";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        console.log('Token'+this.token+"URL"+putUrl);
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(putUrl, roleViewModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    public DeleteRole(RoleId) {
        var deleteUrl = this.apiUrl + 'deleteRole/' + RoleId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.delete<any>(deleteUrl, { headers: headers })
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
