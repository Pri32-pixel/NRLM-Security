import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { DocCategoryModel,DocCategoryViewModel } from '@src/app/shared/models/DocCategory.model';
import { EventTypeModel,FileTypeModel,KMVerticalModel,LanguageModel,KMSubVerticalModel } from '@src/app/shared/models/KMMaster';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
// import { environment } from "src/app/Shared/environment";
import{environment} from '../../../environments/environment';
import { SecuredataService } from './securedata.service';

@Injectable({
    providedIn: 'root'
})

export class DocCategoryService {
    private data: any;
    private apiUrl = environment.apiEndpoint + "/api/DocCategory/";
    token: any;
    username: any;

    constructor(private http: HttpClient,private securService:SecuredataService) {
       // this.data = JSON.parse(sessionStorage.getItem("currentUser"));
       this.data=securService.decrypt(sessionStorage.getItem("currentUser"));

        //this.token = this.data.tToken;
        this.token = JSON.parse(sessionStorage.getItem("token"));
        this.username = this.data.tUserName
    }

    // Save DocCategory
    public SaveDocCategory(docCategoryModel: DocCategoryModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl+"AddDocCategory/", docCategoryModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    // Get All DocCategory
    public GetAllDocCategory() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(this.apiUrl+"getDocCategorys/", { headers: headers }).
        pipe(tap(data =>data) ,
            catchError(this.handleError)
        );
    }
    // Get All DocCategory active
    public GetAllDocCategoryActive() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(this.apiUrl+"getDocCategorysActive/", { headers: headers }).
        pipe(tap(data =>data) ,
            catchError(this.handleError)
        );
    }
    
    public GetAllEventType() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any[]>(environment.apiEndpoint+"/api/EventType/getAllEventtype/", { headers: headers }).
        pipe(tap(data =>data) ,
            catchError(this.handleError)
        );
    }


    public GetEventTypeById(ParamId: number) {
        if (ParamId==null)
        {ParamId=0;}
            
        var editUrl = environment.apiEndpoint+"/api/EventType/getAllEventtype/" + ParamId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public UpdateEventType(eventTypeModel: EventTypeModel) {
        var putUrl = environment.apiEndpoint + '/api/EventType/updateEventType/';
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        //headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(putUrl, eventTypeModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    public AddEventType(eventTypeModel: EventTypeModel) {
        var AddUrl = environment.apiEndpoint + '/api/EventType/addEventType/';
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(AddUrl, eventTypeModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }


    public GetAllFileType() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any[]>(environment.apiEndpoint+"/api/Filetype/getAllFiletype/", { headers: headers }).
        pipe(tap(data =>data) ,
            catchError(this.handleError)
        );
    }
    public GetAllFileTypeActive() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any[]>(environment.apiEndpoint+"/api/Filetype/getAllFiletypeActive/", { headers: headers }).
        pipe(tap(data =>data) ,
            catchError(this.handleError)
        );
    }


    public GetFileTypeById(ParamId: number) {
        if (ParamId==null)
        {ParamId=0;}
            
        var editUrl = environment.apiEndpoint+"/api/Filetype/getAllFiletype/" + ParamId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public UpdateFileType(fileTypeModel: FileTypeModel) {
        var putUrl = environment.apiEndpoint + '/api/Filetype/updateFileType/';
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(putUrl, fileTypeModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    public AddFileType(fileTypeModel: FileTypeModel) {
        var AddUrl = environment.apiEndpoint + '/api/Filetype/addFileType/';
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(AddUrl, fileTypeModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    // KM Vertical
    public GetAllKMVertical() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any[]>(environment.apiEndpoint+"/api/KnwMaterialType/getAllKnwMaterialType/", { headers: headers }).
        pipe(tap(data =>data) ,
            catchError(this.handleError)
        );
    }
     // KM Vertical active list
     public GetAllKMVerticalActive() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any[]>(environment.apiEndpoint+"/api/KnwMaterialType/getAllKnwMaterialTypeActive/", { headers: headers }).
        pipe(tap(data =>data) ,
            catchError(this.handleError)
        );
    }
    public GetKMSubVerticalByKMType(ParamId: number) {
       // ParamId=1;
       let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
       headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any[]>(environment.apiEndpoint+"/api/KnwMaterialSubType/getAllKnwMaterialSubTypeByVerticalId/" + ParamId, { headers: headers }).
        pipe(tap(data =>data) ,
            catchError(this.handleError)
        );
    }
    public GetAllKMSubVertical() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any[]>(environment.apiEndpoint+"/api/KnwMaterialSubType/getAllKnwMaterialSubType/", { headers: headers }).
        pipe(tap(data =>data) ,
            catchError(this.handleError)
        );
    }
    public GetKMVerticalById(ParamId: number) {
        if (ParamId==null)
        {ParamId=0;}
            
        var editUrl = environment.apiEndpoint+"/api/KnwMaterialType/getAllKnwMaterialType/" + ParamId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public GetKMSubVerticalById(ParamId: number) {
        if (ParamId==null)
        {ParamId=0;}
        var editUrl = environment.apiEndpoint+"/api/KnwMaterialSubType/getAllKnwMaterialSubType/" + ParamId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public GetKMSubVerticalByVerticalTypeId(ParamId: number) {
        if (ParamId==null)
        {ParamId=0;}
        
        var editUrl = environment.apiEndpoint+"/api/KnwMaterialSubType/getAllKnwMaterialSubTypeByVerticalId/" + ParamId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    public GetKMSubVerticalByVerticalTypeIdActive(ParamId: number) {
        if (ParamId==null)
        {ParamId=0;}
        
        var editUrl = environment.apiEndpoint+"/api/KnwMaterialSubType/getAllKnwMaterialSubTypeByVerActive/" + ParamId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    
    public UpdateKMVertical(fileTypeModel: FileTypeModel) {
        var putUrl = environment.apiEndpoint + '/api/KnwMaterialType/updateknwMaterialType/';
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(putUrl, fileTypeModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    public AddKMVertical(fileTypeModel: FileTypeModel) {
        var AddUrl = environment.apiEndpoint + '/api/KnwMaterialType/addKnwMaterialType/';
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(AddUrl, fileTypeModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    public UpdateKMSubVertical(kmSubVerticalModel: KMSubVerticalModel) {
        var putUrl = environment.apiEndpoint + '/api/KnwMaterialSubType/updateknwMaterialSubType/';
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(putUrl, kmSubVerticalModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    public AddKMSubVertical(kmSubVerticalModel: KMSubVerticalModel) {
        var AddUrl = environment.apiEndpoint + '/api/KnwMaterialSubType/addKnwMaterialSubType/';
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(AddUrl, kmSubVerticalModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
///  Language 

public GetAllLanguage() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this.http.get<any[]>(environment.apiEndpoint+"/api/Language/getAllLanguage/", { headers: headers }).
    pipe(tap(data =>data) ,
        catchError(this.handleError)
    );
}
public GetAllLanguageActive() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this.http.get<any[]>(environment.apiEndpoint+"/api/Language/getAllLanguageActive/", { headers: headers }).
    pipe(tap(data =>data) ,
        catchError(this.handleError)
    );
}


public GetLanguageById(ParamId: number) {
    if (ParamId==null)
    {ParamId=0;}
        
    var editUrl = environment.apiEndpoint+"/api/Language/getAllLanguage/" + ParamId;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this.http.get<any>(editUrl, { headers: headers }).pipe(tap(data => data),
        catchError(this.handleError)
    );
}

public UpdateLanguage(languageModel: LanguageModel) {
    var putUrl = environment.apiEndpoint + '/api/Language/updateLanguage/';
//let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //  headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this.http.post<any>(putUrl, languageModel, { headers: headers })
        .pipe(
            catchError(this.handleError)
        );
}
public AddLanguage(languageModel: LanguageModel) {
    var AddUrl = environment.apiEndpoint + '/api/Language/addLanguage/';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this.http.post<any>(AddUrl, languageModel, { headers: headers })
        .pipe(
            catchError(this.handleError)
        );
}



    // Get DocCategory ID or All
    public GetDocCategoryById(ParamId: number) {
        if (ParamId==null)
        {ParamId=0;}
            
        var editUrl = this.apiUrl +"getDocCategory/" + ParamId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    

    // Edit  Grievance Type
    public UpdateDocCategory(docCategoryModel: DocCategoryModel) {
        var putUrl = this.apiUrl + 'updateDocCategory/';
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(putUrl, docCategoryModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
// Add  Grievance Type
    public AddDocCategory(docCategoryModel: DocCategoryModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl + 'addDocCategory/', docCategoryModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }


    public DeleteParam(paramId) {
        var deleteUrl = this.apiUrl + 'deleteDocCategory/' + paramId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
       headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.delete<any>(deleteUrl, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    public DeleteParamKMVertical(paramId) {
        var deleteUrl = environment.apiEndpoint + '/api/KnwMaterialType/deleteknwMaterialType/' + paramId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
       headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.delete<any>(deleteUrl, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    public DeleteParamKMSubVertical(paramId) {
        var deleteUrl = environment.apiEndpoint + '/api/KnwMaterialSubType/deleteknwMaterialSubType/' + paramId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
       headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.delete<any>(deleteUrl, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    public DeleteLanguage(paramId) {
        var deleteUrl = environment.apiEndpoint + '/api/Language/deleteLanguage/' + paramId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
       headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.delete<any>(deleteUrl, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    public DeleteFileType(paramId) {
        var deleteUrl = environment.apiEndpoint + '/api/Filetype/deleteFileType/' + paramId;
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
