import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { StateViewModel,StateModel,CountryDropdownModel } from "@src/app/shared/models/State.model";
// import { environment } from "src/app/Shared/environment";
import{environment} from '../../../environments/environment';
import { SecuredataService } from './securedata.service';

@Injectable({
    providedIn: 'root'
})
export class StateService {
    private data: any;
    private apiUrl = environment.apiEndpoint + "/api/State/";
    private apiCountryUrl = environment.apiEndpoint + "/api/Country/";
    token: any;
    username: any;

    constructor(private http: HttpClient,private securService:SecuredataService) {
        //this.data = JSON.parse(sessionStorage.getItem("currentUser"));
        this.data=securService.decrypt(sessionStorage.getItem("currentUser"));

        this.token = JSON.parse(sessionStorage.getItem("token"));
 
        //this.token = this.data.tToken;
        this.username = this.data.tUserName
    }
    // Save Scheme
    public SaveScheme(districtViewModel: StateViewModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl, districtViewModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    // Get All Global Paramater
    public GetAllState() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(this.apiUrl+"GetStates/", { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    // Get All State
    public GetCountrys() {        
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(this.apiCountryUrl+"GetCountrys/", { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    // Get District By StateId
    public GetState(CountryId:number) {
        if (CountryId==null)
        {CountryId=0;}
            
        var editUrl = this.apiUrl +"getStateByCountryId/" + CountryId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<StateViewModel[]>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    //    
    // Get Global Paramater ID or All
    public GetStateById(StateId: number) {
        if (StateId==null)
        {StateId=0;}
            
        var editUrl = this.apiUrl +"GetState/" + StateId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    // Add  District
    public AddState(stateViewModel: StateViewModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl + 'AddState/', stateViewModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    // Update District
    public UpdateState(stateModel: StateModel) {
        var putUrl = this.apiUrl + 'UpdateState/' ;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(putUrl, stateModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    public DeleteState(StateId) {
        var deleteUrl = this.apiUrl + 'DeleteState/' + StateId;
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
