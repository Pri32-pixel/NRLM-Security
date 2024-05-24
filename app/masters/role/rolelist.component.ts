import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { RoleViewModel } from '@src/app/shared/models/role.model';
import { GrievanceTypeService } from '@src/app/shared/services/grivancetype-service';
import { RoleService } from '@src/app/shared/services/role-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { UserAuthoService } from '@src/app/shared/services/user-autho-service';
import { LoginService } from '@src/app/shared/services/login-service';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';

@Component({
  templateUrl: './rolelist.html',
  styleUrls: ['./rolelist.css']

})

export class RoleListComponent implements OnInit {
  private _RoleService;
  AllRoleList: RoleViewModel[];
  errorMessage: any;
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  //@ViewChild('TABLE') table: ElementRef;
  displayedColumns: string[] = ['nRoleId', 'tRoleName',  'dCreatedDt', 'EditAction', 'DeleteAction'];
  dataSource: any;
  actionButtonLabel: string = 'Retry';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  action: boolean = false;

  constructor(public snackBar: MatSnackBar,public actionBar:UtilityHelper,private loginService:LoginService,public userAuthService:UserAuthoService,private location: Location, private _Route: Router, private roleService: RoleService) {
    this._RoleService = roleService;
  
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
    this._RoleService.GetAllRole().subscribe(
      AllRole => {
        console.log(AllRole.result);
        this.AllRoleList = AllRole.result;
        this.dataSource = new MatTableDataSource(this.AllRoleList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;       
      },
      error => this.errorMessage = <any>error
    );
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  Delete(roleId): void {
    if (confirm("Are you sure to delete Role ?")) {
      this._RoleService.DeleteRole(roleId).subscribe
        (
        response => {
          if (response.status == "200") {
            alert('Role Deleted Successfully');
            location.reload();
          }
          else {
            alert('Something Went Wrong');
            this._Route.navigate(['/Rolelist']);
          }
        }
        )
    }
  }

}