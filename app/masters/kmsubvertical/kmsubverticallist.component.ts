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
  selector: 'app-kmsubverticallist',
  templateUrl: './kmsubverticallist.component.html',
  styleUrls: ['./kmsubverticallist.component.scss']
})
export class KmsubverticallistComponent implements OnInit {
  private _ParamService;
  AllParamList: KMVerticalViewModel[];
  errorMessage: any;
  actionButtonLabel: string = 'Retry';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  action: boolean = false;
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  //@ViewChild('TABLE') table: ElementRef;
  displayedColumns: string[] = ['knw_subtypeid','knw_material_vertical','knw_material_sub_vertical', 'EditAction', 'DeleteAction'];
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
    this._ParamService.GetAllKMSubVertical().subscribe(
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
    if (confirm("Are you sure to delete Knowledge Material Sub Verital ?")) {
      this._ParamService.DeleteParamKMSubVertical(paramId).subscribe
        (
        response => {
          // if (response.ReturnCode == "200") {
            alert('Deleted Knowledge Material Sub Verital Successfully');
            
            location.reload();
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