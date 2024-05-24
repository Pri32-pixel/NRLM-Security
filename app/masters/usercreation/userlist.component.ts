import { Component, OnInit, ViewChild,ElementRef,Inject } from '@angular/core';
import { UserModel } from '@src/app/shared/models/user.model';
import { GrievanceTypeService } from '@src/app/shared/services/grivancetype-service';
import { UserService } from '@src/app/shared/services/user-service';
import { UserAuthoService } from '@src/app/shared/services/user-autho-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { MatSidenav, MatDialog } from '@angular/material';
import { ResetPasswordComponent } from '@src/app/login/reset-password/reset-password.component';
@Component({
  templateUrl: './userlist.html',
  styleUrls: ['./userlist.css']

})

export class UserListComponent implements OnInit {
  private _UserService;
  AllUserList: UserModel[];
  errorMessage: any;
  isLoading: boolean = false;
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  //@ViewChild('TABLE') table: ElementRef;
  displayedColumns: string[] = ['userid', 'firstname', 'lastname', 'username', 'EditAction', 'DeleteAction','PasswordAction'];
  dataSource: any;
   actionButtonLabel: string = 'Retry';
  action: boolean = false;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  constructor(public dialog: MatDialog,private location: Location, private _Route: Router, private userService: UserService, public snackBar: MatSnackBar,public actionBar:UtilityHelper,public userAuthService:UserAuthoService) {
    this._UserService = userService;
  
  }
  checkUserAuth()
  {
    this.userAuthService.isAuthorizeUser().subscribe(
      AllUser => {
        if(AllUser.status==901)
        {
          this.showSnowBar(AllUser.message);
          this.actionBar.openPage('/login', true);
        }
      }
    )
  }
  ngOnInit() {
   // this.checkUserAuth();
    this.isLoading=true;
    this._UserService.GetAllUser().subscribe(
      AllUser => {
        if(AllUser.status==200)
        {

   
        console.log(AllUser.result);
        this.AllUserList = AllUser.result;
        this.dataSource = new MatTableDataSource(this.AllUserList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator; 
      }
      else if(AllUser.status==901)    
      {
        //alert('You are not authorized to view ');
        this.showSnowBar(AllUser.message);
        this.actionBar.openPage('/login', true);
      } 
      else{
        //alert('Something went wrong');
        this.showSnowBar(AllUser.message);
      }
      },
      error => this.errorMessage = <any>error
    );
    this.isLoading=false;
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  Delete(userId): void {
    if (confirm("Are you sure to delete User ?")) {
      this._UserService.DeleteUser(userId).subscribe
        (
        response => {
          if (response.status == "200") {
            alert('User Deleted Successfully');
            location.reload();
          }
          else {
            alert('Something Went Wrong');
            this._Route.navigate(['/Userlist']);
          }
        }
        )
    }
  }
  openResetPassword(userId)
  {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '350px',
      height: '320px'
    });
    dialogRef.componentInstance.uid = userId;
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