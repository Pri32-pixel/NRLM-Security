import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs'
import { catchError, tap ,map,retry, timeout } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
// import { environment } from "src/app/Shared/environment";
import{environment} from '../../../environments/environment';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TicketModel,FileToUploadModel,ReportParamGrievanceDetail } from "@src/app/shared/models/Grievance.model";
import { ReportGrievanceHistory } from "@src/app/shared/models/Grievance.model";
import { GrievanceStatusModel } from "@src/app/shared/models/GrievanceStatus.model";
import { GrievanceStatusViewModel } from "@src/app/shared/models/GrievanceStatus.model";
import { LoginService } from '@src/app/shared/services/login-service';
import { GrievanceService } from '@src/app/shared/services/grievance-service';
import { DatePipe } from '@angular/common';
import { SecuredataService } from './securedata.service';
@Injectable({
    providedIn: 'root'
})

export class ReportService {
    private data: any;
    errorMessage: any;
    private _ParamService;
    private apiUrl = environment.apiEndpoint + "/api/GrievanceStatus/";
    token: any;
    username: any;
    datepipe: DatePipe = new DatePipe('en-US');

    constructor(private http: HttpClient,private grievanceService: GrievanceService,private securService:SecuredataService) {
     // this.data = JSON.parse(sessionStorage.getItem("currentUser"));
     this.data=securService.decrypt(sessionStorage.getItem("currentUser"));

      this.token = this.data.tToken;
      this.username = this.data.tUserName
       this._ParamService=grievanceService
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
    }

    PrintGrievanceStatusMasterReport(action = "download") {
        this.GetAllGrievanceStatus().subscribe(
          (data) => {
            this.GrievanceStatusMasterReport(data.ObjReturn, action);
          },
          (err) => {}
        );
      }

      PrintGrievanceDetailReport(action: string,reportParamGrievanceDetail: ReportParamGrievanceDetail) {
        this.grievanceService.GetGrievanceDetailReport(reportParamGrievanceDetail).subscribe(
          (data) => {
            this.GrievanceDetailReport(data.ObjReturn, action);
          },
          (err) => {}
        );
      }

      PrintGrievanceHistoryReport(action: string, Param_ID: number) {
        this._ParamService.GetGrievanceByUserId(Param_ID).subscribe(
          Param => {
            this.GrievanceHistoryReport(Param.ObjReturn, action);
          },
        error => this.errorMessage = <any>error
        );
      }

    // Get All GrievanceStatus
    public GetAllGrievanceStatus(): Observable<any> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        //headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any[]>(this.apiUrl+"GetGrievanceStatuses/", { headers: headers }).
        pipe(tap(data =>(data: any) => {}) ,
            catchError(this.handleError)
        );
    }
    
    private GrievanceDetailReport(data: any[], action: string) {
      if (data.length === 0) {
        //this.utility.errorMessage("No Record to generate report!!");
        return;
      }
      
      const documentDefinition = {
        content: [
          {
            text: "List of Grievance (Status Wise) ",
            style: "header",
          },
          {
            text: "--------------------------------------------------------------------",
            style: "subheader",
          },
          {
            table: {
              style: "name",
              widths: ["auto", "auto", "auto", "auto", "auto","auto"],
              body: [
                [
                  {
                    text: "Ticket Id",
                    style: "tableHeader",
                  },
                  {
                    text: "Grievance By",
                    style: "tableHeaderLeft",
                  },
                  {
                    text: "Grievance Subject",
                    style: "tableHeaderLeft",
                  },
                  {
                    text: "Grievance Description",
                    style: "tableHeaderLeft",
                  },
                  {
                    text: "Grievance Date",
                    style: "tableHeaderRight",
                  },
                  {
                    text: "Status",
                    style: "tableHeaderLeft",
                  },                    
                ],
                ...data.map((ed) => {
                  return [
                    ed.nGrievanceId,
                    { text: ed.tUserName, alignment: "left" },
                    { text: ed.tGrievanceSubject, alignment: "left" },
                    { text: ed.tGrievanceDescription, alignment: "left" },
                    { text: this.datepipe.transform(ed.dCreatedDt , 'dd/MMM/yyyy') , alignment: "right" },
                    { text: ed.tGrievanceStatus, alignment: "center" },
                  ];
                }),
              ],
            },
          },
        ],
        info: {
          title: "Grievance",
          author: "KPMG",
          subject: "report",
          keywords: "report, report",
        },
        styles: {
          header: {
            bold: true,
            fontSize: 16,
            alignment: "center",
            margin: [0, 0, 0, 0],
          },
          subheader: {
            fontSize: 12,
            bold: true,
            margin: [0, 0, 0, 10],
            alignment: "center",
          },
          name: {
            fontSize: 10,
            bold: true,
          },
          jobTitle: {
            fontSize: 10,
            bold: true,
            italics: true,
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: "right",
            italics: true,
          },
          tableHeader: {
            fontSize: 10,
            bold: true,
          },
          tableHeaderRight: {
            fontSize: 10,
            bold: true,
            alignment: "right",
          },
          tableHeaderLeft: {
            fontSize: 10,
            bold: true,
            alignment: "left",
          },
          tableHeaderCenter: {
            fontSize: 10,
            bold: true,
            alignment: "center",
          },
        },
        defaultStyle: {
          fontSize: 10,
          // alignment: 'justify'
        },
      };
      switch (action) {
        case "open":
          pdfMake.createPdf(documentDefinition).open();
          break;
        case "print":
          pdfMake.createPdf(documentDefinition).print();
          break;
        case "download":
          pdfMake.createPdf(documentDefinition).download();
          break;
        default:
          pdfMake.createPdf(documentDefinition).open();
          break;
      }
    
      
    }
    
    private GrievanceHistoryReport(data: ReportGrievanceHistory, action: string) {
      if (data.nGrievanceId === 0 || data.nGrievanceId === null) {
        //this.utility.errorMessage("No Record to generate report!!");
        return;
      }
      
      const documentDefinition = {
        content: [
          {
            text: "Grievance History Report",
            style: "header",
          },
          {
            text: "Grievance History",
            style: "subheader",
          },
          
          {
            text: 'Grievance',
            style: 'subheader',
            alignment: 'left'
          },
          {
            
            columns: [
              [{
                text: 'Id: ' + data.nGrievanceId,
                style: 'name'
              },
              {
                text:  'Raised by\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t:\t\t\t\t\t\t\t\t\t\t\t\t\t' + data.CreatedByName
              },
              {
                text:  'Date \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t:\t\t\t\t\t\t\t\t\t\t\t\t\t' +  this.datepipe.transform(data.dCreatedDt , 'dd/MMM/yyyy') 
              },
              {
                text: 'Subject\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t:\t\t\t\t\t\t\t\t\t\t\t\t\t' + data.tGrievanceSubject,
              },
              {
                text: 'Description \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t:\t\t\t\t\t\t\t\t\t\t\t\t\t' + data.tGrievanceDescription
              },
              {
                text: 'Assigned to\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t:\t\t\t\t\t\t\t\t\t\t\t\t\t' + data.tUserName,
              },
              {
                text: 'Role \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t:\t\t\t\t\t\t\t\t\t\t\t\t\t' + data.tRoleName,
              },
              {
                text: 'Grievance Comment\t\t\t\t\t\t\t\t\t\t\t\t:\t\t\t\t\t\t\t\t\t\t\t\t\t' +data.tGrievanceComment,
              },
              {
                text: 'Status \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t:\t\t\t\t\t\t\t\t\t\t\t\t\t' +data.tGrievanceStatus,
              }
              ]
            ]
          },
        ],
        info: {
          title: "Grievance",
          author: "KPMG",
          subject: "report",
          keywords: "report, report",
        },
        styles: {
          header: {
            bold: true,
            fontSize: 16,
            alignment: "center",
            margin: [0, 0, 0, 0],
          },
          subheader: {
            fontSize: 12,
            bold: true,
            margin: [0, 0, 0, 10],
            alignment: "center",
          },
          name: {
            fontSize: 10,
            bold: true,
          },
          jobTitle: {
            fontSize: 10,
            bold: true,
            italics: true,
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: "right",
            italics: true,
          },
          tableHeader: {
            fontSize: 10,
            bold: true,
          },
          tableHeaderRight: {
            fontSize: 10,
            bold: true,
            alignment: "right",
          },
          tableHeaderLeft: {
            fontSize: 10,
            bold: true,
            alignment: "left",
          },
          tableHeaderCenter: {
            fontSize: 10,
            bold: true,
            alignment: "center",
          },
        },
        defaultStyle: {
          fontSize: 10,
          // alignment: 'justify'
        },
      };
      switch (action) {
        case "open":
          pdfMake.createPdf(documentDefinition).open();
          break;
        case "print":
          pdfMake.createPdf(documentDefinition).print();
          break;
        case "download":
          pdfMake.createPdf(documentDefinition).download();
          break;
        default:
          pdfMake.createPdf(documentDefinition).open();
          break;
      }
    
      
    }

    private GrievanceStatusMasterReport(data: any[], action: string) {
        if (data.length === 0) {
          //this.utility.errorMessage("No Record to generate report!!");
          return;
        }
        
        const documentDefinition = { 
          footer: function(currentPage, pageCount) { return [{ text: currentPage.toString() + ' of ' + pageCount,  alignment: (currentPage % 2) ? 'center' : 'right'}]; },
          header: function(currentPage, pageCount, pageSize) {
            // you can apply any logic and return any valid pdfmake element
        
            return [
              { text: 'KPMG', alignment: (currentPage % 2) ? 'left' : 'right' },
              { canvas: [ { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 } ] }
            ]
          },
          content: [
            {
              text: "Grievance status Master",
              style: "header",
            },
            {
              text: "Grievance status Master",
              style: "subheader",
            },
            {
              table: {
                style: "name",
                widths: ["*", "auto", "auto"],
                body: [
                  [
                    {
                      text: "Grievance Id",
                      style: "tableHeader",
                    },
                    {
                      text: "Grievance Status",
                      style: "tableHeaderRight",
                    },
                    {
                      text: "Grievance Order",
                      style: "tableHeaderRight",
                    },
                  ],
                  ...data.map((ed) => {
                    return [
                      ed.nGrievanceStatusId,
                      { text: ed.tGrievanceStatus, alignment: "right" },
                      { text: ed.nGrievanceStatusOrder, alignment: "right" },
                    ];
                  }),
                  // [
                  //   {
                  //     text: "Total",
                  //     style: "tableHeader",
                  //   },
                  //   {
                  //     text: "this.sumTotalDme(data)",
                  //     style: "tableHeaderRight",
                  //   },
                  //   {
                  //     text: "this.sumTotalEnrolled(data)",
                  //     style: "tableHeaderRight",
                  //   },
                  // ],
                ],
              },
            },
          ],
          info: {
            title: "Grievance",
            author: "KPMG",
            subject: "report",
            keywords: "report, report",
          },
          styles: {
            header: {
              bold: true,
              fontSize: 16,
              alignment: "center",
              margin: [0, 0, 0, 0],
            },
            subheader: {
              fontSize: 12,
              bold: true,
              margin: [0, 0, 0, 10],
              alignment: "center",
            },
            name: {
              fontSize: 10,
              bold: true,
            },
            jobTitle: {
              fontSize: 10,
              bold: true,
              italics: true,
            },
            sign: {
              margin: [0, 50, 0, 10],
              alignment: "right",
              italics: true,
            },
            tableHeader: {
              fontSize: 10,
              bold: true,
            },
            tableHeaderRight: {
              fontSize: 10,
              bold: true,
              alignment: "right",
            },
          },
          defaultStyle: {
            fontSize: 10,
            // alignment: 'justify'
          },
        };
        switch (action) {
          case "open":
            pdfMake.createPdf(documentDefinition).open();
            break;
          case "print":
            pdfMake.createPdf(documentDefinition).print();
            break;
          case "download":
            pdfMake.createPdf(documentDefinition).download();
            break;
          default:
            pdfMake.createPdf(documentDefinition).open();
            break;
        }
        // pdfMake.createPdf(documentDefinition).open();
        
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
