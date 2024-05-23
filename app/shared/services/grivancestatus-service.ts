import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { GrievanceStatusModel } from '@src/app/shared/models/GrievanceStatus.model';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { GrievanceStatusViewModel } from '@src/app/shared/models/GrievanceStatus.model';
// import { environment } from "src/app/Shared/environment";
import{environment} from '../../../environments/environment';
import { SecuredataService } from './securedata.service';
@Injectable({
    providedIn: 'root'
})

export class GrievanceStatusService {
    private data: any;
    private apiUrl = environment.apiEndpoint + "/api/GrievanceStatus/";
    token: any;
    username: any;

    constructor(private http: HttpClient,private securService:SecuredataService) {
        //this.data = JSON.parse(sessionStorage.getItem("currentUser"));
        this.data=securService.decrypt(sessionStorage.getItem("currentUser"));
       // this.token = this.data.tToken;
       this.token = JSON.parse(sessionStorage.getItem("token"));
 
        this.username = this.data.tUserName
    }

    // Save GrievanceStatus
    public SaveGrievanceStatus(grievanceStatusModel: GrievanceStatusModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl+"AddGrievanceStatus/", grievanceStatusModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    // Get All GrievanceStatus
    public GetAllGrievanceStatus() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<GrievanceStatusViewModel[]>(this.apiUrl+"GetGrievanceStatuses/", { headers: headers }).
        pipe(tap(data =>data) ,
            catchError(this.handleError)
        );
    }
    
    
    // Get GrievanceStatus ID or All
    public GetGrievanceStatusById(ParamId: number) {
        if (ParamId==null)
        {ParamId=0;}
            
        var editUrl = this.apiUrl +"GetGrievanceStatus/" + ParamId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<GrievanceStatusModel[]>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    

    // Edit  Grievance Status
    public UpdateGrievanceStatus(grievanceStatusModel: GrievanceStatusModel) {
        var putUrl = this.apiUrl + 'UpdateGrievanceStatus/';
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(putUrl, grievanceStatusModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
// Add  Grievance Status
    public AddGrievanceStatus(grievanceStatusModel: GrievanceStatusModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl + 'AddGrievanceStatus/', grievanceStatusModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }


    public DeleteParam(paramId) {
        var deleteUrl = this.apiUrl + 'DeleteGrievanceStatus/' + paramId;
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
