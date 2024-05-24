import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { LanguageViewModel } from '@src/app/shared/models/KMMaster';
import { DocCategoryService } from '@src/app/shared/services/doccategory-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UserAuthoService } from '@src/app/shared/services/user-autho-service';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { LoginService } from '@src/app/shared/services/login-service';
@Component({
  templateUrl: './LanguageList.html',
  styleUrls: ['./LanguageList.css']

})

export class LanguageListComponent implements OnInit {
  private _ParamService;
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  actionButtonLabel: string = 'Retry';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  AllParamList: LanguageViewModel[];
  errorMessage: any;
  
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  //@ViewChild('TABLE') table: ElementRef;
  displayedColumns: string[] = ['lng_id','language', 'EditAction', 'DeleteAction'];
  dataSource: any;

  constructor(private loginService:LoginService, private location: Location, private _Route: Router, private docCategoryService: DocCategoryService,public snackBar: MatSnackBar,public userAuthService:UserAuthoService,public actionBar:UtilityHelper) {
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
  ngOnInit() {
    this.checkUserAuth();
    this._ParamService.GetAllLanguage().subscribe(
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
    if (confirm("Are you sure to delete ?")) {
      this._ParamService.DeleteLanguage(paramId).subscribe
        (
        response => {
          // if (response.ReturnCode == "200") {
            ///alert('Deleted Successfully');
            this.showSnowBar("Deleted Successfully");
            
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
  showSnowBar(message)
{
  let config = new MatSnackBarConfig();
  config.verticalPosition = this.verticalPosition;
  config.duration=5000;
 
    //alert('Data Saved Successfully');
    this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
}
}