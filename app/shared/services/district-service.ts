import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { DistrictViewModel,DistrictDropdownModel } from "@src/app/shared/models/District.model";
// import { environment } from "src/app/Shared/environment";
import{environment} from '../../../environments/environment';
import { SecuredataService } from './securedata.service';

@Injectable({
    providedIn: 'root'
})
export class DistrictService {
    private data: any;
    private apiUrl = environment.apiEndpoint + "/api/District/";
    private apiStateUrl = environment.apiEndpoint + "/api/State/";
    token: any;
    username: any;

    constructor(private http: HttpClient,private securService:SecuredataService) {
       // this.data = JSON.parse(sessionStorage.getItem("currentUser"));
       this.data=securService.decrypt(sessionStorage.getItem("currentUser"));

        this.token = this.data.tToken;
        this.username = this.data.tUserName
    }
    // Save Scheme
    public SaveScheme(districtViewModel: DistrictViewModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl, districtViewModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    // Get All Global Paramater
    public GetAllDistrict() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<DistrictViewModel[]>(this.apiUrl+"getDistricts/", { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    // Get All State
    public GetState() {
        //var editUrl = "/api/State/getStates/";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<DistrictDropdownModel[]>(this.apiStateUrl+"getStates/", { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    // Get District By StateId
    public GetDistrict(StateId:number) {
        if (StateId==null)
        {StateId=0;}
            
        var editUrl = this.apiUrl +"getDistrictByStateId/" + StateId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<DistrictViewModel[]>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    //    
    // Get Global Paramater ID or All
    public GetDistrictById(DistrictId: number) {
        if (DistrictId==null)
        {DistrictId=0;}
            
        var editUrl = this.apiUrl +"GetDistrict/" + DistrictId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<DistrictViewModel[]>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    // Add  District
    public AddDistrict(districtViewModel: DistrictViewModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl + 'AddDistrict/', districtViewModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    // Update District
    public UpdateDistrict(districtViewModel: DistrictViewModel) {
        var putUrl = this.apiUrl + 'UpdateDistrict/' ;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(putUrl, districtViewModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    public DeleteDistrict(DistrictId) {
        var deleteUrl = this.apiUrl + 'DeleteDistrict/' + DistrictId;
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
