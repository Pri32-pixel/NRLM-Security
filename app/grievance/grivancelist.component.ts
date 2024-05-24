import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { GrievanceTypeViewModel } from '@src/app/shared/models/GrievanceType.model';
import { GrievanceTypeService } from '@src/app/shared/services/grivancetype-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { GrievanceService } from '@src/app/shared/services/grievance-service';
import { ListOfTicketViewModel,KMApproveModel,KMApproveModelOutside } from "@src/app/shared/models/Grievance.model";
import { ReportService } from '@src/app/shared/services/report-service';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@src/app/shared/services/user-service';

import { UserAuthoService } from '@src/app/shared/services/user-autho-service';
import { LoginService } from '@src/app/shared/services/login-service';
import { UtilityHelper } from '@src/app/shared/services/utility-service';

@Component({
  templateUrl: './grivancelist.html',
  styleUrls: ['./grivancelist.css']
  
})

export class GrivanceListComponent implements OnInit {
  private _ParamService;
  private Param_ID: string;
  private show: string;
  private _UserService;
  isShow = false;
  AllParamList: ListOfTicketViewModel[];
  kmApproveModel : KMApproveModel= new KMApproveModel();
  kmApproveModelOutside : KMApproveModelOutside= new KMApproveModelOutside();
  errorMessage: any;
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  //@ViewChild('TABLE') table: ElementRef;
 // displayedColumns: string[] = ['nGrievanceId','tGrievanceType','tGrievancePriority', 'tGrievanceStatus','tFileUploadPath', 'dCreatedDt', 'EditAction','EditAction1', 'DeleteAction', 'ApproveAction'];
  displayedColumns: string[] = ['nGrievanceId','tGrievanceType','tGrievancePriority','tFileUploadPath', 'dCreatedDt', 'EditAction','EditAction1', 'DeleteAction', 'ApproveAction'];
  dataSource: any;
  actionButtonLabel: string = 'Retry';
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  constructor(public actionBar:UtilityHelper,public userAuthService:UserAuthoService,private location: Location, private _Route: Router,public snackBar: MatSnackBar,private _routeParams: ActivatedRoute, 
    private grievanceService: GrievanceService,private loginService: LoginService, private reportService:ReportService,   private userService: UserService,) {
    this._ParamService = grievanceService;
    this._UserService = userService;
    
  }

  checkUserAuth()
  {
    this.userAuthService.isAuthorizeUser().subscribe(
      AllUser => {
        if(AllUser.status==901)
        {
          this.showSnowBar(AllUser.message);
          this.loginService.LogoutUser();
          this.actionBar.openPage('/login', true);
        }
      }
    )
  }
  showSnowBar(message)
{
  let config = new MatSnackBarConfig();
  config.verticalPosition = this.verticalPosition;
  config.duration=5000;
 
    //alert('Data Saved Successfully');
    this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
}

displayImage()
{
  this.isShow=false;
  this._ParamService.fileDisplay().subscribe(
    AllParam => {
      console.log(AllParam);

     
    },
    error => this.errorMessage = <any>error
  );
}
  ngOnInit() {
      this.checkUserAuth();
      this.displayImage();

    this.Param_ID = this._routeParams.snapshot.params['Param_ID'];
    if (this.Param_ID=="1212")
    {
      this.isShow=true;
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
    else 
    {
      this.isShow=false;
    this._ParamService.GetAllKM(this.loginService.getSelectedUser().userid).subscribe(
      AllParam => {
        console.log(AllParam);
        this.AllParamList = AllParam.result;
        this.dataSource = new MatTableDataSource(this.AllParamList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       
      },
      error => this.errorMessage = <any>error
    );
  }

    

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

  /*openFile(filePath)
  {
    console.log("click");
   this.isShow=false;
  this._ParamService.fileDisplay().subscribe(
    AllParam => {
      console.log(AllParam);
     /// window.open("http://localhost:8085/mnt/NRLM_API/"+filePath);
     
     
    },
    error => this.errorMessage = <any>error
  );

  var token = JSON.parse(sessionStorage.getItem("token"));
 /* let anchor = document.createElement("a");
document.body.appendChild(anchor);
let file = "http://localhost:8085/mnt/NRLM_API/"+filePath;

let headers = new Headers();
headers.append('Authorization', token);

var element = document.createElement('a');
element.setAttribute('href', file);
element.setAttribute('download', file);

element.style.display = 'none';
document.body.appendChild(element);

element.click();

document.body.removeChild(element);*/


    
 // }*/
  viewdocComponent(paramId) {
    this._Route.navigate(['/ViewDoc',paramId]);

  }
  ApproveKM(paramId): void {
    if (confirm("Are you sure to you want to approve Knowledge Material ?")) {
      // this.kmApproveModel.approver_id=11;
      // this.kmApproveModel.approver_status=1;
      this.kmApproveModel.mkid=paramId;
      this._ParamService.UpdateKMStatus(this.kmApproveModel).subscribe
        (
        response => {
           if (response.status == 200) {

            
            alert('Approved Successfully');
            location.reload();
           }
          // else {
          //   alert('Something Went Wrong');
          //   this._Route.navigate(['/Gstatus/All']);
          // }
        }
        )
    }
  }

  PublishKM(paramId): void {
    if (confirm("Are you sure to you want to publish Knowledge Material ?")) {
      this.kmApproveModel.mkid=paramId;
      this._ParamService.UpdateKMStatusPublish(this.kmApproveModel).subscribe
        (
        response => {
          if (response.status == 200) {
            let config = new MatSnackBarConfig();
            config.verticalPosition = this.verticalPosition;
            config.duration=5000;
            this.snackBar.open("Data Published Successfully", this.action ? this.actionButtonLabel : undefined, config);
            //alert('Published Successfully');
            location.reload();
           }
          // else {
          //   alert('Something Went Wrong');
          //   this._Route.navigate(['/Gstatus/All']);
          // }
        }
        )
    }
  }
  PublishKMInAajeevika(paramId): void {
    if (confirm("Are you sure to you want to publish Knowledge Material in Aajeevika portal ?")) {
      this.kmApproveModelOutside.mkid=paramId;
      this._ParamService.updateOutsiderStatus(this.kmApproveModelOutside).subscribe
        (
        response => {
          if (response.status == 200) {
            let config = new MatSnackBarConfig();
            config.verticalPosition = this.verticalPosition;
            config.duration=10000;
            if (response.message=="OK")
            {
              alert('Data Published and Synced Successfully');
              this.snackBar.open("Data Published and Synced Successfully ", this.action ? this.actionButtonLabel : undefined, config);
            }
            else
            {
              alert('Data Publish and Sync are unsuccessful. Please try again');
              this.snackBar.open("Data Publish and Sync are unsuccessful. Please try again", this.action ? this.actionButtonLabel : undefined, config);
            }
               
           
            location.reload();
           }
          // else {
          //   alert('Something Went Wrong');
          //   this._Route.navigate(['/Gstatus/All']);
          // }
        }
        )
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