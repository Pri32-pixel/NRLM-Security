import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import { UserModel,ChangePasswordModel } from '@src/app/shared/models/user.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { LoginService } from '@src/app/shared/services/login-service';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmedValidator } from '@src/app/shared/validator/confirmed-validator';
import { StarRatingColor } from '@src/app/star-rating/star-rating/star-rating.component';
import { FeedbackRatingViewModel } from "@src/app/shared/models/PostDoc.model";
import { GrievanceService } from '@src/app/shared/services/grievance-service';
@Component({
  selector: 'app-ratingdoc',
  templateUrl: './ratingdoc.component.html',
  styleUrls: ['./ratingdoc.component.css']
})
export class RatingdocComponent implements OnInit {
  private _ParamService;
  ChangePasswordForm1: FormGroup;
  processing = false;
  ParamForms: FeedbackRatingViewModel = new FeedbackRatingViewModel();
 // ParamForms: ChangePasswordModel = new ChangePasswordModel();
  errorMessage: any;
  actionButtonLabel: string = 'Retry';
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  rating:number = 0;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {name: number},
    public dialogRef: MatDialogRef<RatingdocComponent>,
    private loginService: LoginService,
    private actionbarHelper: UtilityHelper,
    private grievanceService: GrievanceService,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder) { 
      dialogRef.disableClose = true;
      this._ParamService = grievanceService;
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
    SubmitRating()
    {
      this.ParamForms.mkid=this.data.name;
      this.ParamForms.feedback_by=this.loginService.getSelectedUser().userid;    
      this.ParamForms.rating_val=this.rating;
      this.ParamForms.feedback_cmnt=this.ParamForms.feedback_cmnt;
      //alert(this.data.name);
      if (this.ChangePasswordForm1.valid) {
        
      //alert(this.rating);
      if (confirm("Are you sure to you want to Submit Feedback?")) {
        
        this._ParamService.addFeedbackRating(this.ParamForms).subscribe
          (
          response => {
            if (response.status == 200) {
              let config = new MatSnackBarConfig();
              config.verticalPosition = this.verticalPosition;
              config.duration=10000;
             
                //alert('Data Saved Successfully');
                this.snackBar.open("Data Saved Successfully", this.action ? this.actionButtonLabel : undefined, config);
                this.dialogRef.close();
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
      
    }
  ngOnInit() {
    this.ChangePasswordForm1 = this.formBuilder.group({
      tUserOldPassword: ["", [Validators.required]],
    });
  }
  onRatingChanged(rating){
    console.log(rating);
    this.rating = rating;
  }
  public errorHandling = (control: string, error: string) => {
    return this.ChangePasswordForm1.controls[control].hasError(error);
}
}
