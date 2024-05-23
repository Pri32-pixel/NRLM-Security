import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ChartDataForCurrentMonth,ParamRoleUser } from "@src/app/shared/models/Chart.model";
// import { environment } from "src/app/Shared/environment";
import{environment} from '../../../environments/environment';
import { SecuredataService } from './securedata.service';
@Injectable({
    providedIn: 'root'
})
export class ChartService {
    private data: any;
    private apiUrl = environment.apiEndpoint + "/api/Grievance/";
    private apiStateUrl = environment.apiEndpoint + "/api/State/";
    token: any;
    username: any;
    
    constructor(private http: HttpClient,private securService:SecuredataService) {
       // this.data = JSON.parse(sessionStorage.getItem("currentUser"));
       this.data=securService.decrypt(sessionStorage.getItem("currentUser"));

        this.token = JSON.parse(sessionStorage.getItem("token"));
        this.username = this.data.tUserName
    }

    public GetChartDataForCurrentMonth(paramRoleUser: ParamRoleUser) {
        var editUrl1 = environment.apiEndpoint + "/api/User/getKMMonthWiseCount/" + paramRoleUser.nGrievanceUserId;;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
          
        // return this.http.get<any>(editUrl1 , paramRoleUser, { headers: headers })
        // .pipe(
        //     catchError(this.handleError)
        // );
        return this.http.get<ChartDataForCurrentMonth[]>(editUrl1, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public GetUserActivity(paramRoleUser: ParamRoleUser) {
        var editUrl1 = environment.apiEndpoint + "/api/User/getKMMonthWiseCount/" + paramRoleUser.nGrievanceUserId;;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);

        // return this.http.get<any>(editUrl1 , paramRoleUser, { headers: headers })
        // .pipe(
        //     catchError(this.handleError)
        // );
        return this.http.get<any[]>(editUrl1, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    public GetUpcommingEvent(paramRoleUser: ParamRoleUser) {
        var editUrl1 = environment.apiEndpoint + "/api/Event/getEventsMonth/" + paramRoleUser.nGrievanceUserId;;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);

        // return this.http.get<any>(editUrl1 , paramRoleUser, { headers: headers })
        // .pipe(
        //     catchError(this.handleError)
        // );
        return this.http.get<any[]>(editUrl1, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public GetChartDataGrievanceTypeWiseStatusCount(paramRoleUser: ParamRoleUser) {
        //var editUrl = "/api/State/getStates/";
        var editUrl1 = environment.apiEndpoint + "/api/User/getKMCategoryWiseCount/" + paramRoleUser.nGrievanceUserId;;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);

        // return this.http.get<any>(editUrl1 , paramRoleUser, { headers: headers })
        // .pipe(
        //     catchError(this.handleError)
        // );
        return this.http.get<any>(editUrl1, { headers: headers }).pipe(tap(data => data),
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