import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import {GrievancePriorityModel,GrievancePriorityViewModel } from '@src/app/shared/models/GrievancePriority.model';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
// import { environment } from "src/app/Shared/environment";
import{environment} from '../../../environments/environment';
import { SecuredataService } from './securedata.service';
@Injectable({
    providedIn: 'root'
})

export class GrievancePriorityService {
    private data: any;
    private apiUrl = environment.apiEndpoint + "/api/GrievancePriority/";
    token: any;
    username: any;

    constructor(private http: HttpClient,private securService:SecuredataService) {
        //this.data = JSON.parse(sessionStorage.getItem("currentUser"));
        this.data=securService.decrypt(sessionStorage.getItem("currentUser"));

        this.token = this.data.tToken;
        this.username = this.data.tUserName
    }

    // SaveGrievancePriority
    public SaveGrievancePriority(grievancePriorityModel:GrievancePriorityModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl+"AddGrievancePriority/", grievancePriorityModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    // Get AllGrievancePriority
    public GetAllGrievancePriority() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<GrievancePriorityViewModel[]>(this.apiUrl+"GetGrievancePriorityes/", { headers: headers }).
        pipe(tap(data =>data) ,
            catchError(this.handleError)
        );
    }
    
    
    // GetGrievancePriority ID or All
    public GetGrievancePriorityById(ParamId: number) {
        if (ParamId==null)
        {ParamId=0;}
            
        var editUrl = this.apiUrl +"GetGrievancePriority/" + ParamId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<GrievancePriorityModel[]>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    

    // Edit  Grievance Priority
    public UpdateGrievancePriority(grievancePriorityModel:GrievancePriorityModel) {
        var putUrl = this.apiUrl + 'UpdateGrievancePriority/';
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(putUrl, grievancePriorityModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
// Add  Grievance Priority
    public AddGrievancePriority(grievancePriorityModel:GrievancePriorityModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl + 'AddGrievancePriority/', grievancePriorityModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }


    public DeleteParam(paramId) {
        var deleteUrl = this.apiUrl + 'DeleteGrievancePriority/' + paramId;
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
