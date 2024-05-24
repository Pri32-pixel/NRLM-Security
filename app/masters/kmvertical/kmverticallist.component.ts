import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { KMVerticalViewModel } from '@src/app/shared/models/KMMaster';
import { DocCategoryService } from '@src/app/shared/services/doccategory-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { UserAuthoService } from '@src/app/shared/services/user-autho-service';
import { LoginService } from '@src/app/shared/services/login-service';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';

@Component({
  templateUrl: './KMVerticalList.html',
  styleUrls: ['./KMVerticalList.css']

})

export class KMVerticalListComponent implements OnInit {
  private _ParamService;
  AllParamList: KMVerticalViewModel[];
  errorMessage: any;
  autoHide: number = 2000;
  action: boolean = false;
  actionButtonLabel: string = 'Retry';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  //@ViewChild('TABLE') table: ElementRef;
  displayedColumns: string[] = ['knw_typeid','knw_material_vertical', 'EditAction', 'DeleteAction'];
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
    this._ParamService.GetAllKMVertical().subscribe(
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
    if (confirm("Are you sure to delete Knowledge Material Vertical ?")) {
      this._ParamService.DeleteParamKMVertical(paramId).subscribe
        (
        response => {
           if (response.status == "200") {
            alert('Deleted Knowledge Material Vertical Successfully');
            
            location.reload();
           }
         else {
             alert('Something Went Wrong');
             location.reload();
           }
        }
        )
    }
  }

}