import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { UserModel } from './../shared/models/user.model';
import { MatSidenav, MatDialog } from '@angular/material';
import { UtilityHelper } from '../shared/services/utility-service';
import { LoginService } from '@src/app/shared/services/login-service';
import { ChangePasswordComponent } from './../login/change-password/change-password.component';
import { ResetPasswordComponent } from '../login/reset-password/reset-password.component';
@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

  private _loginservice;
  user: UserModel;
  username: string="";
  deptId: any;
  singleDept: boolean;
  role: any[] = [];
  token: any;
  draftCount = 0;
  approvalCount = 0 ;
  rejectCount  = 0 ;
  publishCount  = 0 ;
  unpublishCount = 0 ;
  opened = true;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  constructor(
    
    public dialog: MatDialog,
    private actionHelper: UtilityHelper,
    public loginService: LoginService,
    ) {
       
    }

  ngOnInit() {
    
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
    this.user=this.loginService.getSelectedUser();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.loginService.LogoutUser();
    this.actionHelper.openPage('/login', true);
  }

  openChangePasswordComponent() {
   const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '350px',
      height: '320px'
    });
   
  }
  

  openProfile(){
    //this.actionHelper.openPage('/profile', false);
  }

  toggleSidebar() {
    if (this.isBiggerScreen()) {
      this.sidenav.toggle();
    }
  }

  showHelp() {
    //this.actionHelper.openPage('/help', false);
  }

  // GetUserDetails() {

  //   //this.actionbarHelper.openPage('/dashboard', true);
  //   this.user.tUserLoginId=this.username;
  //   this.user.tToken=this.token;
  //   this._loginservice.GetUserDetails(this.user).subscribe(
  //     response => {
  //       if (response.ReturnCode == 1) {
  //         //this.actionHelper.openPage('/login', true);
  //       }
  //       else {
  //         this.user = this.loginService.getSelectedUser();
  //         //this.router.navigate(['/dashboard']);
  //       }
  //     });
  // }

}
