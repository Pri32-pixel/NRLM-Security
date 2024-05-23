import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { DocSourceModel,DocSourceViewModel } from '@src/app/shared/models/DocSource.model';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
// import { environment } from "src/app/Shared/environment";
import{environment} from '../../../environments/environment';
import { SecuredataService } from './securedata.service';

@Injectable({
    providedIn: 'root'
})

export class DocSourceService {
    private data: any;
    private apiUrl = environment.apiEndpoint + "/api/DocSource/";
    token: any;
    username: any;

    constructor(private http: HttpClient,private securService:SecuredataService) {
       // this.data = JSON.parse(sessionStorage.getItem("currentUser"));
       this.data=securService.decrypt(sessionStorage.getItem("currentUser"));

        //this.token = this.data.tToken;
        this.token = JSON.parse(sessionStorage.getItem("token"));;
        this.username = this.data.tUserName
    }

    // Save DocSource
    public SaveDocSource(docSourceModel: DocSourceModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl+"AddDocSource/", docSourceModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    // Get All DocSource
    public GetAllDocSource() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any[]>(this.apiUrl+"getDocSources/", { headers: headers }).
        pipe(tap(data =>data) ,
            catchError(this.handleError)
        );
    }
    public GetAllDocSourceActiveList() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any[]>(this.apiUrl+"getDocSourcesActiveList/", { headers: headers }).
        pipe(tap(data =>data) ,
            catchError(this.handleError)
        );
    }
    
    
    // Get DocSource ID or All
    public GetDocSourceById(ParamId: number) {
        if (ParamId==null)
        {ParamId=0;}
            
        var editUrl = this.apiUrl +"getDocSource/" + ParamId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    
    public GetEventTypeById(ParamId: number) {
        if (ParamId==null)
        {ParamId=0;}
            
        var editUrl = this.apiUrl +"getDocSource/" + ParamId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    // Edit  AddDocSource
    public UpdateDocSource(docSourceModel: DocSourceModel) {
        var putUrl = this.apiUrl + 'updateDocSource/';
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(putUrl, docSourceModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    public UpdateEventType(docSourceModel: DocSourceModel) {
        var putUrl = this.apiUrl + 'updateDocSource/';
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(putUrl, docSourceModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
// Add  AddDocSource
    public AddDocSource(docSourceModel: DocSourceModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl + 'addDocSource/', docSourceModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }


    public DeleteParam(paramId) {
        var deleteUrl = this.apiUrl + 'deleteDocSource/' + paramId;
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
