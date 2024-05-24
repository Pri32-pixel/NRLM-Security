import {Component, Inject} from '@angular/core';
import { UserModel,ChangePasswordModel } from '@src/app/shared/models/user.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { LoginService } from '@src/app/shared/services/login-service';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmedValidator } from '@src/app/shared/validator/confirmed-validator';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  ChangePasswordForm: FormGroup;
  processing = false;
  ParamForms: ChangePasswordModel = new ChangePasswordModel();
  errorMessage: any;
  actionButtonLabel: string = 'Retry';
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  passwordLbl=" Password length should be  8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.";
   


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private loginService: LoginService,
    private actionbarHelper: UtilityHelper,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { 
    dialogRef.disableClose = true;
    
  }

  onNoClick(): void {
  
    this.dialogRef.close();
  }
  ngOnInit() {
    this.ChangePasswordForm = this.formBuilder.group({
      tUserOldPassword: ["", [Validators.required]],
      tUserNewPassword: ["", [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,16}')]],
      tUserNewPasswordConf: ["", [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,16}')]]},
      { 
        validator: ConfirmedValidator('tUserNewPassword', 'tUserNewPasswordConf')
    });
}


  // doValidate() {
  //   if (this.oldPass === null || this.oldPass === undefined) {
  //     this.actionbarHelper.errorMessage('Current Password should not be blank!');
  //     return false;
  //   } else if (this.newPass1 === null || this.newPass1 === undefined) {
  //     this.actionbarHelper.errorMessage('New Password should not be blank!');
  //     return false;
  //   } else if (this.newPass2 === null || this.newPass2 === undefined) {
  //     this.actionbarHelper.errorMessage('New Password (confirm) should not be blank!');
  //     return false;
  //   } else if (this.newPass1 !== this.newPass2) {
  //     this.actionbarHelper.errorMessage('New password and new confirm password should be same!');
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  change() {
    if (this.ChangePasswordForm.valid) {
      this.processing = true;
      let config = new MatSnackBarConfig();
      config.duration = this.setAutoHide ? this.autoHide : 0;
      config.verticalPosition = this.verticalPosition;
      this.ParamForms.nGrievanceUserId=this.loginService.getSelectedUser().userid
      this.loginService.ChangePassword(this.ParamForms).subscribe(
        (data: any) => {
          console.log("Console Data"+data);
          if (data.status === 200) {
            
            this.snackBar.open("Password changed successfully", this.action ? this.actionButtonLabel : undefined, config);
            this.onNoClick();
           // this.loginService.LogoutUser();
          } 
         else if (data.status === 601) {
            
            this.snackBar.open(data.message, this.action ? this.actionButtonLabel : undefined, config);
            this.onNoClick();
           // this.loginService.LogoutUser();
          } 
         
          else {
            this.snackBar.open(data.errorMsg, this.action ? this.actionButtonLabel : undefined, config);
          }
          this.processing = false;
        },
        error => {
          this.snackBar.open(error, this.action ? this.actionButtonLabel : undefined, config);
          this.processing = false;
        }
      );
      }
  }

  public errorHandling = (control: string, error: string) => {
    return this.ChangePasswordForm.controls[control].hasError(error);
}

}
