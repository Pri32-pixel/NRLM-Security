import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { GrievanceTypeViewModel } from '@src/app/shared/models/GrievanceType.model';
import { GrievanceTypeService } from '@src/app/shared/services/grivancetype-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { GrievanceService } from '@src/app/shared/services/grievance-service';
import { ListOfTicketViewModel,GetGrievanceByUserIdandStatus } from "@src/app/shared/models/Grievance.model";
import { ActivatedRoute } from '@angular/router';
import { UserModel } from './../shared/models/user.model';
import { ReportService } from '@src/app/shared/services/report-service';
import { LoginService } from '@src/app/shared/services/login-service';
@Component({
  templateUrl: './grivancelistassigned.html',
  styleUrls: ['./grivancelistassigned.css']

})

export class GrivanceListAssignedComponent implements OnInit {
  private _ParamService;
  user: UserModel;
  private Param_GrievanceStatusId: number;
  private Param_GrievanceUserId: number;
  isShow = false;
  AllParamList: ListOfTicketViewModel[];
  errorMessage: any;
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  //@ViewChild('TABLE') table: ElementRef;
  displayedColumns: string[] = ['nGrievanceId','tGrievanceType','tGrievancePriority', 'tGrievanceStatus', 'tGrievanceSubject','tGrievanceDescription','tFileUploadPath', 'dCreatedDt', 'EditAction', 'DeleteAction'];
  dataSource: any;

  constructor(private location: Location,private loginService: LoginService,private reportService:ReportService,
    private _routeParams: ActivatedRoute, private grievanceService: GrievanceService) {
    this._ParamService = grievanceService;
    this.user = this.loginService.getSelectedUser();
  }

  ngOnInit() {

    let GrievanceByUserIdandStatus = new GetGrievanceByUserIdandStatus();
    
    this.Param_GrievanceUserId = this._routeParams.snapshot.params['id1'];
    this.Param_GrievanceStatusId = this._routeParams.snapshot.params['id2'];
    
    if (this.Param_GrievanceStatusId==0 && this.Param_GrievanceStatusId==0){
              if (this._routeParams.snapshot.params['id2']=="7")
              {
                this.isShow=false;
              }
              if (this._routeParams.snapshot.params['id2']=="8")
              {
                this.isShow=true;
              }
            this._ParamService.GetAllGrievanceAssigned().subscribe(
            AllParam => {
            console.log(AllParam);
            this.AllParamList = AllParam.ObjReturn;
            this.dataSource = new MatTableDataSource(this.AllParamList);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          
            },
            error => this.errorMessage = <any>error
          );
    }
    else{
      
          // if (this.Param_GrievanceStatusId==8) {
          //   document.getElementById("HeaderName").innerHTML = "List Of Grievance (Completed)";
          // }
          // if (this.Param_GrievanceStatusId==7) {
          //   document.getElementById("HeaderName").innerHTML = "List Of Grievance (Assigned)";
          // }
         
          GrievanceByUserIdandStatus.nGrievanceStatusId=this.Param_GrievanceStatusId;
          GrievanceByUserIdandStatus.nGrievanceUserId=this.user.userid;
          if (this._routeParams.snapshot.params['id2']=="7")
              {
                this.isShow=false;
              }
              if (this._routeParams.snapshot.params['id2']=="8")
              {
                this.isShow=true;
              }
          this._ParamService.GetGrievanceByUserIdandStatus(GrievanceByUserIdandStatus).subscribe(
            AllParam => {
              console.log(AllParam);
              this.AllParamList = AllParam.ObjReturn;
              this.dataSource = new MatTableDataSource(this.AllParamList);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            
            },
            error => this.errorMessage = <any>error
          );
    }
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  downloadPdf(Param_ID: number,action: string)
  {
      console.log(Param_ID);
      this.reportService.PrintGrievanceHistoryReport(action,Param_ID);
      //row, 'print'
      
  }
  
}