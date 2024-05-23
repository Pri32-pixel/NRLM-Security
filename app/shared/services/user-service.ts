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
export class UserService {
    private data: any;
    private apiUrl = environment.apiEndpoint + "/api/User/";
    private apiroleUrl = environment.apiEndpoint + "/api/Role/";
    private apiDeptUrl = environment.apiEndpoint + "/api/Department/";
    private apiStateUrl = environment.apiEndpoint + "/api/State/";
    private apiDistrictUrl = environment.apiEndpoint + "/api/District/";
    private apiBlockUrl = environment.apiEndpoint + "/api/Block/";
    token: any;
    sesionuserId: any;

    constructor(private http: HttpClient,private securService:SecuredataService) {
        //this.data = JSON.parse(sessionStorage.getItem("currentUser"));
       // this.token = this.data.tToken;
       this.data=securService.decrypt(sessionStorage.getItem("currentUser"));

       this.token = JSON.parse(sessionStorage.getItem("token"));
        this.sesionuserId = this.data.userid;
    }
    // Save Scheme
    public SaveScheme(districtViewModel: UserModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl, districtViewModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    // Get All Global Paramater
    public GetAllUser() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(this.apiUrl+"GetUsers/"+this.sesionuserId, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    
    public GetAllDepartment() {        
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(this.apiDeptUrl+"GetDepartments/", { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public GetAllDepartmentActive() {        
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(this.apiDeptUrl+"GetDepartmentsActive/", { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    public GetAllRole() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(this.apiroleUrl+"getRoles/", { headers: headers }).
        pipe(tap(data =>data) ,
            catchError(this.handleError)
        );
    }  

    public GetAllRoleActive() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(this.apiroleUrl+"getRolesActive/", { headers: headers }).
        pipe(tap(data =>data) ,
            catchError(this.handleError)
        );
    }  

    
    
    public GetAllState() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(this.apiStateUrl+"GetStates/", { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    public GetAllStateActive() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(this.apiStateUrl+"GetStatesActive/", { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public getDitrictList(stateId:any) {
        if (stateId==null)
        {stateId=0;}
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(this.apiDistrictUrl+"GetDistrictByState/"+stateId, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public getDitrictListActive(stateId:any) {
        if (stateId==null)
        {stateId=0;}
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(this.apiDistrictUrl+"GetDistrictByStateActive/"+stateId, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    public getBlock(districtId:any) {
        if (districtId==null)
        {districtId=0;}
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(this.apiBlockUrl+"getBlockByDistrictid/"+districtId, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    public getBlockActive(districtId:any) {
        if (districtId==null)
        {districtId=0;}
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(this.apiBlockUrl+"getBlockByDistrictidActive/"+districtId, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    // Get District By UserId
    public GetUser(UserId:number) {
        if (UserId==null)
        {UserId=0;}
            
        var editUrl = this.apiUrl +"getUserByCountryId/" + UserId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<UserModel[]>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    //    
    // Get Global Paramater ID or All
    public GetUserById(UserId: number) {
        if (UserId==null)
        {UserId=0;}
            
        var editUrl = this.apiUrl +"GetUser/" + UserId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<UserModel[]>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    // Add  District
    public AddUser(stateViewModel: UserModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl + 'AddUser/', stateViewModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    // Update District
    public UpdateUser(userViewModel: UserModel) {
        var putUrl = this.apiUrl + 'UpdateUser/' ;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(putUrl, userViewModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    public DeleteUser(UserId) {
        var deleteUrl = this.apiUrl + 'DeleteUser/' + UserId;
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
