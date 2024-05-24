import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ReportParamGrievanceCount } from "@src/app/shared/models/Grievance.model";
import { ChartDataForCurrentMonth } from "@src/app/shared/models/Chart.model";
import { GrievanceService } from '@src/app/shared/services/grievance-service';
import { LoginService } from '@src/app/shared/services/login-service';
import { ChartService } from '@src/app/shared/services/chart-service';
import { UserModel } from './../shared/models/user.model';
import { Label, Color } from 'ng2-charts';
import { Router } from '@angular/router';
import { ListOfTicketViewModel,GetGrievanceByUserIdandStatus,ReportParamKMSCount } from "@src/app/shared/models/Grievance.model";
import { ReportService } from '@src/app/shared/services/report-service';
import { StringifyOptions } from 'querystring';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  AllParamList: ListOfTicketViewModel[];

  /////////////////////////Chart////////////////////////////
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  public barChartColors: Color[] = [
    { backgroundColor: 'rgb(209, 76, 43)' },
    { backgroundColor: 'rgb(222, 130, 0)' },
    { backgroundColor: 'rgb(240, 173, 78)' },
    { backgroundColor: 'rgb(255, 151, 5)' },
  ]
  barChartLabels: string[] = [];
  barChartLabels1: string[] = [];

  BarData: any[] = [];
  BarData1: any[] = [];
  BarData2: any[] = [];
  BarData3: any[] = [];
  BarData4: any[] = [];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData: any[] = [];
  barChartData1: any[] = [];
  ////////////////////////////////////////////////////
  ParamType: ChartDataForCurrentMonth[] = [];
  EventName1: String []=[];
  ParamForms: ReportParamGrievanceCount = new ReportParamGrievanceCount();

  ParamForms1: ReportParamKMSCount = new ReportParamKMSCount();
  user: UserModel;
  token: any;
  private _ChartService;
  private _loginservice;
  private _ParamService;
  errorMessage: any;
  completedGrievance: number = 0;
  assignedGrievance: number = 0;
  newGrievance: number = 0;
  totalGrievance: number = 0;
  grievanceCount: any;
  EventName: String="";
  isLoadingCount = false;
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  
  displayedColumns: string[] = ['nGrievanceId','tGrievanceType','tGrievancePriority', 'tGrievanceStatus','tFileUploadPath', 'dCreatedDt','EditAction' ];
  dataSource: any;

  constructor(
    private grievanceService: GrievanceService,
    public loginService: LoginService,
    private chartService: ChartService,
    private reportService:ReportService,
    private router: Router,
  ) {
    
    //this.router.navigate(['/dashboard']);
    this.user = this.loginService.getSelectedUser();
    this._ChartService = chartService;
    this._loginservice = loginService;
    this._ParamService = grievanceService;
    this.GetKMData();
  }

 
  
  ngOnInit() {

    this.ParamForms.nGrievanceUserId = this.user.userid;
    this.ParamForms.nRoleId = this.user.roleid;
    this.ParamForms1.userId = this.user.userid;
    
    this.getDashboardCount();
    //this.totalGrievance = this.newGrievance + this.assignedGrievance + this.completedGrievance;
    this.getChartDataCurrentMonth();

    this.barChartData = [
      { data: this.BarData, label: 'Knowledge Material Count' }
    ];
    this.GetChartDataGrievanceTypeWise();
    this.barChartData1 = [
      { data: this.BarData1, label: 'Approved' },
      { data: this.BarData2, label: 'Published' },
      { data: this.BarData3, label: 'Pending For Approval' },
      { data: this.BarData4, label: 'Approved but not Published' },
    ];
    this.openDetailEndUser("99");

    this.getUpcomingEvent() ;
  }
  viewdocComponent(paramId) {
    this.router.navigate(['/ViewDoc',paramId]);

  }
  openFile(filePath,mkid)
  {
    //alert('Mkid'+mkid);
    this._ParamService.downloadFile(filePath,mkid).subscribe(response => {

      console.log(response);
      var binaryData = [];
      binaryData.push(response.data);
      var url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/pdf"}));
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.setAttribute('target', '_blank');
      a.href = url;
      a.download = response.filename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();

  }, error => {

      console.log(error);
  });

  }

  getChartDataCurrentMonth() {
    return this._ChartService.GetChartDataForCurrentMonth(this.ParamForms).subscribe(data => {
      //console.log(data);
      this.ParamType = data.result;
      let i = 0;
      let j = 0;
      for (i = 0; i < data.result.length; i++) {
        this.barChartLabels.push(data.result[i].creation_date.toString());
        this.BarData.push(data.result[i].kmscount);
      }

    },
      error => this.errorMessage = <any>error
    );
  }
 GetKMData(){

  this._ParamService.GetAllKMByUserId(this.loginService.getSelectedUser().userid).subscribe(
    AllParam => {
   //   console.log(AllParam);
      this.AllParamList = AllParam.result;
      this.dataSource = new MatTableDataSource(this.AllParamList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
     
    },
    error => this.errorMessage = <any>error
    );
 }
  GetChartDataGrievanceTypeWise() {
    return this._ChartService.GetChartDataGrievanceTypeWiseStatusCount(this.ParamForms).subscribe(data => {
      //console.log(data);
      this.ParamType = data.result;
      let i = 0;
      let j = 0;
      for (i = 0; i < data.result.length; i++) {
        // console.log(data.ObjReturn[i].CreatedDate);
        // console.log(data.ObjReturn[i].GrievanceCount);

        this.barChartLabels1.push(data.result[i].doccategory.toString());
        this.BarData1.push(data.result[i].ap);
        this.BarData2.push(data.result[i].pub);
        this.BarData3.push(data.result[i].nap);
        this.BarData4.push(data.result[i].np);
      }

    },
      error => this.errorMessage = <any>error
    );
  }

  chartClicked(e: any): void {
    console.log(e.active);
    console.log(e.event);
  }

  chartHovered(e: any): void {
    console.log(e);
  }
  openDetail(e: any) {
  }
  openDetailEndUser(abc: string) {

    let mdlGrievanceByUserIdandStatus = new GetGrievanceByUserIdandStatus();
    if (abc==="0")
    {
      mdlGrievanceByUserIdandStatus.nGrievanceStatusId=0;
    }
    else if (abc==="8")
    {
      mdlGrievanceByUserIdandStatus.nGrievanceStatusId=8;
    }
    else if (abc==="1")
    {
      mdlGrievanceByUserIdandStatus.nGrievanceStatusId=1;
    }
    else
    {
      mdlGrievanceByUserIdandStatus.nGrievanceStatusId=99;
    }

    // mdlGrievanceByUserIdandStatus.nGrievanceStatusId=7;
    mdlGrievanceByUserIdandStatus.nGrievanceUserId=this.user.userid;

    // this.grievanceService.GetGrievanceForEndUser(mdlGrievanceByUserIdandStatus).subscribe(
    //   data => {
    //     console.log( data.ObjReturn);
    //     this.AllParamList = data.ObjReturn;
    //       this.dataSource = new MatTableDataSource(this.AllParamList);
    //       this.dataSource.sort = this.sort;
    //       this.dataSource.paginator = this.paginator;
    //   },
    //   err => {
    //     this.isLoadingCount = false;
    //   }
    // );

  }
  
  downloadPdf(Param_ID: number,action: string)
  {
      console.log(Param_ID);
      this.reportService.PrintGrievanceHistoryReport(action,Param_ID);
      //row, 'print'
      
  }
  getGrievanceStatusCount() {
    this.grievanceService.GetGrievanceCount(this.ParamForms).subscribe(
      data => {
        this.grievanceCount = data.ObjReturn;
        //console.log(this.grievanceCount);
        this.isLoadingCount = false;
        for (let i = 0; i < data.ObjReturn.length; i++) {
          if (data.ObjReturn[i].nGrievanceStatusId === 8) {
            this.completedGrievance = data.ObjReturn[i].nGrievanceCount;
          }
          if (data.ObjReturn[i].nGrievanceStatusId === 7) {
            this.assignedGrievance = data.ObjReturn[i].nGrievanceCount;
          }
          if (data.ObjReturn[i].nGrievanceStatusId === null || data.ObjReturn[0].nGrievanceStatusId === undefined) {
            this.newGrievance = data.ObjReturn[i].nGrievanceCount;
          }

          // console.log(data.ObjReturn[0].nGrievanceCount); //use i instead of 0
          // console.log(data.ObjReturn[1].nGrievanceCount);
        }
      },
      err => {
        this.isLoadingCount = false;
      }
    );

  }

  getDashboardCount() {
    this.grievanceService.GetDashBoardCount(this.ParamForms1).subscribe(
      data => {
        this.grievanceCount = data.result;
        //console.log(this.grievanceCount);
        this.isLoadingCount = false;
        this.completedGrievance = data.result[0].approved_post_cnt;
        this.assignedGrievance = data.result[0].pending_post_cnt;
        this.newGrievance = data.result[0].new_post_cnt;
        this.totalGrievance = data.result[0].total_post_cnt;
      },
      err => {
        this.isLoadingCount = false;
      }
    );

  }

  getUpcomingEvent() {
    return this._ChartService.GetUpcommingEvent(this.ParamForms).subscribe(data => {
      //console.log(data);
      this.EventName1 = data.result;
    },
      error => this.errorMessage = <any>error
    );
  }

}
