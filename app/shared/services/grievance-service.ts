import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse,HttpParams } from '@angular/common/http';
import{environment} from '../../../environments/environment';
import { FileToUploadModel,TicketResponseModel,TicketAssignModel,KMApproveModel,KMApproveModelOutside,
ListOfTicketViewModel,TicketModel,ListOfTicketModel,ReportParamGrievanceCount, ReportParamGrievanceDetail,GetGrievanceByUserIdandStatus,ReportParamKMSCount } from '@src/app/shared/models/Grievance.model';
import { GrievanceTypeViewModel, } from '@src/app/shared/models/GrievanceType.model';
import { PostDocModel,FeedbackRatingViewModel } from "@src/app/shared/models/PostDoc.model";
import { AddEventModel,ViewEventModel,SearchEventModel } from "@src/app/shared/models/Event.model";
import { RequestOptions } from "@angular/http";
import { map } from 'rxjs/operators';
import { SecuredataService } from './securedata.service';

@Injectable({
    providedIn: 'root'
})

export class GrievanceService {
    private data: any;
    private apiUrl = environment.apiEndpoint + "/api/Material/";
    private apiUrlDash = environment.apiEndpoint + "/api/User/";
    private apiUrlUpload = environment.apiEndpoint + "/api/FileUpload/";
    token: any;
    username: any;


    constructor(private http: HttpClient,private securService:SecuredataService) {
        //this.data = JSON.parse(sessionStorage.getItem("currentUser"));
        this.data=securService.decrypt(sessionStorage.getItem("currentUser"));

       // this.token = this.data.tToken;
       this.token = JSON.parse(sessionStorage.getItem("token"));
 
        this.username = this.data.tUserName
    }

    public GetAllGrievanceType() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<GrievanceTypeViewModel[]>(environment.apiEndpoint+"/api/GrievanceType/GetGrievanceTypes/", { headers: headers }).
        pipe(tap(data =>data) ,
            catchError(this.handleError)
        );
    }

    public getAllMaterialById(ParamId: number) {
        if (ParamId==null)
        {ParamId=0;}
            
        var editUrl = this.apiUrl +"getAllMaterial/" + ParamId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    
    public fileDisplay() {
      var ParamId=1;
        var editUrl = this.apiUrl +"displayFile/" + ParamId;
       // var editUrl = "http://localhost:8085/mnt/NRLM_API/14/1679049504043_CRN7107462648.pdf";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        /*return this.http.get<any>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );*/
        return this.http.get(`${this.apiUrl}/displayFile/download/` + ParamId, { responseType: 'blob' }).pipe(tap((response)=>{
            return {
                filename: '1679049504043_CRN7107462648.pdf',
               // data: response.blob()
            };
        }));
    }

    downloadFile(filename: string,mkid:number): Observable<any> {
       
        var lastItem = filename.split("/").pop();

        var editUrl = this.apiUrl +"downloadFile/"+mkid;
       // var editUrl = "http://localhost:8085/api/FileUpload/downloadFile";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get(`${editUrl}`, { responseType: 'blob',headers:headers }).pipe(map((response)=>{
            return {
                filename: lastItem,
                data: response
            };
        }));
    }



    // Save GrievanceStatus
    public SaveGrievance(ticketModel: TicketModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl+"AddGrievance/", ticketModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    public SaveKnowledgeMaterial(formData:any) {
       // let headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
        //headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        //let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        //let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
             //headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
             var headers = {
                headers: new HttpHeaders()
                  .set('Authorization',  'Bearer ' + `${this.token}`,),
                  
              }

        return this.http.post<any>(this.apiUrlUpload+"uploadKnwlFileDetails/", formData,headers )
            .pipe(
                catchError(this.handleError)
            );
    }
    public UpadteKnowledgeMaterial(formData:any) {
        let headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        
        return this.http.post<any>(this.apiUrlUpload+"uploadKnwlFileDetailsUpdate/", formData)
            .pipe(
                catchError(this.handleError)
            );
    }
    public SaveGrievanceResponse(ticketResponseModel: TicketResponseModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl+"AddGrievanceDet/", ticketResponseModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    public UpdateGrievanceResponse(ticketResponseModel: TicketResponseModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        //headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl+"AddGrievanceDet/", ticketResponseModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    public SaveGrievanceAssign(ticketAssignModel: TicketAssignModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl+"AssignGrievance/", ticketAssignModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    uploadFile(theFile: FileToUploadModel) : Observable<any> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<FileToUploadModel>(
                   environment.apiEndpoint + "/api/FileUpload/UploadFile/", theFile, { headers: headers });
      }  
      
    // Get All GrievanceStatus
    public GetAllGrievance() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any[]>(this.apiUrl+"getAllMaterials/14", { headers: headers }).
        pipe(tap(data =>data) ,
            catchError(this.handleError)
        );
    }

    public GetSearchKM(searchEventModel:SearchEventModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        
        //let params = new HttpParams().set("requestData", JSON.stringify(searchEventModel)).set("authenticationType", this.authType);
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any[]>(this.apiUrl+"searchMaterial/",searchEventModel, { headers: headers }).
        pipe(tap(data =>data) ,
            catchError(this.handleError)
        );
    }


    public GetAllKM(ParamId: number) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any[]>(this.apiUrl+"getAllMaterials/" + ParamId , { headers: headers }).
        pipe(tap(data =>data) ,
            catchError(this.handleError)
        );
    }

    public GetAllKMByUserId(ParamId: number) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any[]>(this.apiUrl+"getAllMaterialByUserId/" + ParamId , { headers: headers }).
        pipe(tap(data =>data) ,
            catchError(this.handleError)
        );
    }

    public GetReviewAndComment(ParamId: number) {
        var editUrl1 = environment.apiEndpoint + "/api/FeedBack/getFeedbackRatingsByMkid/" + ParamId;
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
    public GetAllGrievanceAssigned() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<ListOfTicketViewModel[]>(this.apiUrl+"GetGrievancesAssigned/" , { headers: headers }).
        pipe(tap(data =>data) ,
            catchError(this.handleError)
        );
    }


    //GetGrievanceByUserIdandStatus
    public GetGrievanceByUserIdandStatus(GetGrievanceByUserIdandStatus: ListOfTicketModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post(this.apiUrl+"GetGrievanceByUserIdandStatus/",GetGrievanceByUserIdandStatus, { headers: headers }).pipe(tap((data: any) => {}),
            catchError(this.handleError)
        );
        
    }

    public GetDashBoardCount(UserModel: ReportParamKMSCount) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        var editUrl = this.apiUrlDash +"getDashBoardCount/" + UserModel.userId;
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(editUrl, { headers: headers }).pipe(tap((data: any) => {}),
            catchError(this.handleError)
        );
        
    }


    public GetGrievanceForEndUser(getGrievanceByUserIdandStatus: GetGrievanceByUserIdandStatus) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post(this.apiUrl+"GetGrievanceForEndUser/",getGrievanceByUserIdandStatus, { headers: headers }).pipe(tap((data: any) => {}),
            catchError(this.handleError)
        );
        
    }
    //GetGrievanceByUserIdandStatus
    public GetGrievanceByUserId(ParamId: number) {
        
        var editUrl = this.apiUrl +"GetGrievance/";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<TicketResponseModel>(this.apiUrl+"GetGrievance/" +ParamId, { headers: headers }).pipe(tap(data => data),
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
        return this.http.get<ListOfTicketModel[]>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );

        
    }
    
public UpdateKMStatus(kmApproveModel: KMApproveModel) {
        var putUrl = this.apiUrl + 'updateApproverStatus/';
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(putUrl, kmApproveModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    public UpdateKMStatusPublish(kmApproveModel: KMApproveModel) {
        var putUrl = this.apiUrl + 'updatePublishStatus/';
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(putUrl, kmApproveModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    public updateOutsiderStatus(kmApproveModelOutside: KMApproveModelOutside) {
        var putUrl = this.apiUrl + 'updateOutsiderStatus/';
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(putUrl, kmApproveModelOutside, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    // Edit  Grievance Status
    public UpdateGrievanceStatus(listOfTicketModel: ListOfTicketModel) {
        var putUrl = this.apiUrl + 'UpdateGrievanceStatus/';
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(putUrl, listOfTicketModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
// Add  Grievance Status
    public AddGrievanceStatus(grievanceStatusModel: ListOfTicketModel) {
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


    public GetGrievanceCount(reportParamGrievanceCount: ReportParamGrievanceCount) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post(this.apiUrl+"GetGrievanceStatusCount/",reportParamGrievanceCount, { headers: headers }).pipe(tap((data: any) => {}),
            catchError(this.handleError)
        );
    }

    public GetGrievanceDetailReport(reportParamGrievanceDetail: ReportParamGrievanceDetail) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post(this.apiUrl+"GetRoleStatusWiseGrievance/",reportParamGrievanceDetail, { headers: headers }).pipe(tap((data: any) => {}),
            catchError(this.handleError)
        );
    }
    public GetGrievanceDetailDateWiseReport(reportParamGrievanceDetail: ReportParamGrievanceDetail) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post(this.apiUrl+"GetRoleStatusDateWiseGrievance/",reportParamGrievanceDetail, { headers: headers }).pipe(tap((data: any) => {}),
            catchError(this.handleError)
        );
    }
    public AddEvent(addEventModel: AddEventModel) {
        var putUrl = environment.apiEndpoint + '/api/Event/addEvents/';
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        //headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(putUrl, addEventModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }
    public GetUpcomingEvent(paramId) {
        var putUrl = environment.apiEndpoint + '/api/Event/getUpComingEvents/' +paramId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        //headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<ViewEventModel[]>(putUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );

        
    }
    public addFeedbackRating(feedbackRatingViewModel: FeedbackRatingViewModel) {
        var putUrl = environment.apiEndpoint  + '/api/FeedBack/addFeedbackRating/';
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(putUrl, feedbackRatingViewModel, { headers: headers })
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
