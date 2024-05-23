import { Component,ViewChild,OnInit } from '@angular/core';
import { ReportParamGrievanceDetail ,ListOfTicketViewModel} from '@src/app/shared/models/Grievance.model';
import { GrievanceStatusService } from '@src/app/shared/services/grivancestatus-service';
import { Router } from '@angular/router';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { LoginService } from '@src/app/shared/services/login-service';
import { GrievanceService } from '@src/app/shared/services/grievance-service';
import { ReportService } from '@src/app/shared/services/report-service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
    templateUrl: './grivancedetailreport.html',
    styleUrls: ['./grivancedetailreport.css']
})

export class GrivanceDetailReportComponent {
    grievanceDetailReportForm:FormGroup;
    title = "Grievance Detail Report";
    ParamForms: ReportParamGrievanceDetail = new ReportParamGrievanceDetail();
    ParamForms1: ReportParamGrievanceDetail = new ReportParamGrievanceDetail();
    private responsedata: any;
    pipe: DatePipe;
    private _ParamService;
    private _ParamService1
    grievanceCount: any;
    ParamType: any = [];
    AllParamList: ListOfTicketViewModel[];
    isShow = true;
    isLoadingCount = false;
    ParamGrievanceStatus: any = [];
    dataSource: any;
    status: any [] = [
        {id: 1, name: 'Yes'},
        {id: 0, name: 'No'}
      ];
    @ViewChild(MatSort,{static: false}) sort: MatSort;
    @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;  
    errorMessage: any;
    actionButtonLabel: string = 'Retry';
    action: boolean = false;
    setAutoHide: boolean = true;
    autoHide: number = 2000;
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    displayedColumns: string[] = ['nGrievanceId','tGrievanceType', 'tGrievanceStatus', 'tGrievanceSubject','tGrievanceDescription','tFileUploadPath', 'dCreatedDt'];
    constructor(private _Route: Router,private actionbarHelper: UtilityHelper,public snackBar: MatSnackBar,  
        private grievanceStatusService: GrievanceStatusService,private loginService: LoginService,
        private grievanceService: GrievanceService,private reportService:ReportService,
        private formBuilder: FormBuilder) {
            this._ParamService = loginService;
            this._ParamService1 = grievanceStatusService;
            this.getRole();
            this.getGrievanceStatus();
            
    }
    ngOnInit() 
    {
      this.grievanceDetailReportForm = this.formBuilder.group({
        
        nRoleId: ["", [Validators.required]],
        nGrievanceStatusId: ["", [Validators.required]],
        dFromDate: [""],
        dToDate: [""],
      });
    }
    
    getRole() {

        return this._ParamService.GetAllRole().subscribe(
            AllParam => {
              console.log(AllParam.ObjReturn);
              this.ParamType = AllParam.ObjReturn;
            },
            error => this.errorMessage = <any>error
          );
    }
    getGrievanceStatus() {

        return this._ParamService1.GetAllGrievanceStatus().subscribe(
            AllParam1 => {
              console.log(AllParam1.ObjReturn);
              this.ParamGrievanceStatus = AllParam1.ObjReturn;
            },
            error => this.errorMessage = <any>error
          );
    }
    showData(){
      if (this.grievanceDetailReportForm.valid)
      {
        this.pipe = new DatePipe('en');
        // this.ParamForms.dFromDate= this.pipe.transform(this.ParamForms.dFromDate, 'dd/MM/yyyy');
        // this.ParamForms.dToDate=this.pipe.transform(this.ParamForms.dToDate, 'dd/MM/yyyy');
        this.ParamForms1.nGrievanceStatusId=this.ParamForms.nGrievanceStatusId;
        this.ParamForms1.nRoleId=this.ParamForms.nRoleId;
        this.ParamForms1.dFromDate= this.pipe.transform(this.ParamForms.dFromDate, 'MM/dd/yyyy');
        this.ParamForms1.dToDate=this.pipe.transform(this.ParamForms.dToDate, 'MM/dd/yyyy');
        // this.ParamForms.dFromDate= this.ParamForms.dToDate.toUTCString();
        // this.ParamForms.dToDate= new Date(this.pipe.transform(this.ParamForms.dToDate, 'dd/MM/yyyy'));
        if (this.ParamForms.dFromDate==null)
        {
            this.grievanceService.GetGrievanceDetailReport(this.ParamForms1).subscribe(
                data => {
                    if (data.ReturnCode == 200)
                    {
                        this.isShow=false;
                    }
                //   this.grievanceCount = data.ObjReturn;
                  console.log( data.ObjReturn);
                  this.AllParamList = data.ObjReturn;
                    this.dataSource = new MatTableDataSource(this.AllParamList);
                    this.dataSource.sort = this.sort;
                    this.dataSource.paginator = this.paginator;
                },
                err => {
                  this.isLoadingCount = false;
                }
              );
        }
        if (this.ParamForms.dFromDate!=null)
        {
          this.grievanceService.GetGrievanceDetailDateWiseReport(this.ParamForms1).subscribe(
            data => {
                if (data.ReturnCode == 200)
                {
                    this.isShow=false;
                }
            //   this.grievanceCount = data.ObjReturn;
              console.log( data.ObjReturn);
              this.AllParamList = data.ObjReturn;
                this.dataSource = new MatTableDataSource(this.AllParamList);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            },
            err => {
              this.isLoadingCount = false;
            }
          );
        }
    }
  }
    downloadPdf(report: any, action: string) {
      
          this.reportService.PrintGrievanceDetailReport(action,this.ParamForms);
    }


    public errorHandling = (control: string, error: string) => {
      return this.grievanceDetailReportForm.controls[control].hasError(error);
    }
    submitForm() {
      console.log(this.grievanceDetailReportForm.value)
    }
}