import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { StateViewModel } from '@src/app/shared/models/state.model';
import { GrievanceTypeService } from '@src/app/shared/services/grivancetype-service';
import { StateService } from '@src/app/shared/services/state-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { UserAuthoService } from '@src/app/shared/services/user-autho-service';
import { LoginService } from '@src/app/shared/services/login-service';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';

@Component({
  templateUrl: './statelist.html',
  styleUrls: ['./statelist.css']

})

export class StateListComponent implements OnInit {
  private _StateService;
  AllStateList: StateViewModel[];
  errorMessage: any;
  autoHide: number = 2000;
  actionButtonLabel: string = 'Retry';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  action: boolean = false;

  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  //@ViewChild('TABLE') table: ElementRef;
  displayedColumns: string[] = ['nStateId', 'tStateName', 'tCountryName', 'dCreatedDt', 'EditAction', 'DeleteAction'];
  dataSource: any;

  constructor(public snackBar: MatSnackBar,public actionBar:UtilityHelper,private loginService:LoginService,public userAuthService:UserAuthoService,private location: Location, private _Route: Router, private stateService: StateService) {
    this._StateService = stateService;
  
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
    this._StateService.GetAllState().subscribe(
      AllState => {
        console.log(AllState.result);
        this.AllStateList = AllState.result;
        this.dataSource = new MatTableDataSource(this.AllStateList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;       
      },
      error => this.errorMessage = <any>error
    );
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  Delete(stateId): void {
    if (confirm("Are you sure to delete State ?")) {
      this._StateService.DeleteState(stateId).subscribe
        (
        response => {
          if (response.status == "200") {
            alert('State Deleted Successfully');
            location.reload();
          }
          else {
            alert('Something Went Wrong');
            this._Route.navigate(['/Statelist']);
          }
        }
        )
    }
  }

}