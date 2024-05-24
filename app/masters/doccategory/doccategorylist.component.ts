import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { DocCategoryViewModel } from '@src/app/shared/models/DocCategory.model';
import { DocCategoryService } from '@src/app/shared/services/doccategory-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { UserAuthoService } from '@src/app/shared/services/user-autho-service';
import { LoginService } from '@src/app/shared/services/login-service';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';

@Component({
  templateUrl: './DocCategoryList.html',
  styleUrls: ['./DocCategoryList.css']

})

export class DocCategoryListComponent implements OnInit {
  private _ParamService;
  AllParamList: DocCategoryViewModel[];
  errorMessage: any;
  actionButtonLabel: string = 'Retry';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  action: boolean = false;
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  //@ViewChild('TABLE') table: ElementRef;
  displayedColumns: string[] = ['nDocCategoryId','tCategoryCode', 'tDocCategory', 'nDocCategoryOrder', 'dCreatedDt', 'EditAction', 'DeleteAction'];
  dataSource: any;

  constructor(public snackBar: MatSnackBar,public actionBar:UtilityHelper,private loginService:LoginService,public userAuthService:UserAuthoService,private location: Location, private _Route: Router, private docCategoryService: DocCategoryService) {
    this._ParamService = docCategoryService;
  
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
  ngOnInit() {
this.checkUserAuth();
    this._ParamService.GetAllDocCategory().subscribe(
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
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  Delete(paramId): void {
    if (confirm("Are you sure to delete Knowledge Material Category ?")) {
      this._ParamService.DeleteParam(paramId).subscribe
        (
        response => {
          // if (response.ReturnCode == "200") {
            alert('Deleted Knowledge Material Category Successfully');
            window.location.reload();
           // location.reload();
          // }
          // else {
          //   alert('Something Went Wrong');
          //   this._Route.navigate(['/Gstatus/All']);
          // }
        }
        )
    }
  }

}