import { Component } from '@angular/core';
import { GrievanceStatusModel } from '@src/app/shared/models/GrievanceStatus.model';
import { GrievanceStatusService } from '@src/app/shared/services/grivancestatus-service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  templateUrl: './grivancestatus.html',
  styleUrls: ['./grivancestatus.css']
})

export class GrivanceStatusComponent {
  grievanceStatusForm: FormGroup;
  title = "Grievance Status Master";
  ParamForms: GrievanceStatusModel = new GrievanceStatusModel();
  private _ParamService;
  private Param_ID: string;
  private responsedata: any;
  ParamType: any = [];
  status: any[] = [
    { id: 1, name: 'Yes' },
    { id: 0, name: 'No' }
  ];
  errorMessage: any;
  actionButtonLabel: string = 'Retry';
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';



  constructor(private _Route: Router, private actionbarHelper: UtilityHelper, public snackBar: MatSnackBar,
    private grievanceStatusService: GrievanceStatusService, private formBuilder: FormBuilder,
    private _routeParams: ActivatedRoute) {
    this._ParamService = grievanceStatusService;

  }
  output: any;

  ngOnInit() {
    this.grievanceStatusForm = this.formBuilder.group({
      tGrievanceStatus: ["", [Validators.required]],
      nGrievanceStatusOrder: [""],
      bIsActive: [""]
    });
    this.GetDataEdit();
  }
  GetDataEdit() {
    this.Param_ID = this._routeParams.snapshot.params['Param_ID'];
    if (this.Param_ID != null) {
      var data = this._ParamService.GetGrievanceStatusById(this.Param_ID).subscribe(
        Param => {
          console.log(Param.ObjReturn);
          this.ParamForms.nGrievanceStatusId = Param.ObjReturn.nGrievanceStatusId;
          this.ParamForms.tGrievanceStatus = Param.ObjReturn.tGrievanceStatus;
          this.ParamForms.nGrievanceStatusOrder = Param.ObjReturn.nGrievanceStatusOrder;
          this.ParamForms.bIsActive = Param.ObjReturn.bIsActive;
        },
        error => this.errorMessage = <any>error
      );
    }
  }
  Save() {

    if (this.grievanceStatusForm.valid) {
      if (this.ParamForms.nGrievanceStatusId == 0) {
        this._ParamService.AddGrievanceStatus(this.ParamForms).subscribe(
          response => {

            this.output = response;
            if (this.output.ReturnCode == 409) {
              let config = new MatSnackBarConfig();
              config.duration = this.setAutoHide ? this.autoHide : 0;
              config.verticalPosition = this.verticalPosition;
              this.snackBar.open("Grievance Status Already Exists", this.action ? this.actionButtonLabel : undefined, config);

            }
            else if (this.output.ReturnCode == 200) {
              let config = new MatSnackBarConfig();
              config.duration = this.setAutoHide ? this.autoHide : 0;
              config.verticalPosition = this.verticalPosition;
              this.snackBar.open("Grievance Status Saved Successfully", this.action ? this.actionButtonLabel : undefined, config);
              this._Route.navigate(['/GrievanceStatuslist']);
            }
            else {
              let config = new MatSnackBarConfig();
              config.duration = this.setAutoHide ? this.autoHide : 0;
              config.verticalPosition = this.verticalPosition;
              this.snackBar.open("Something Went Wrong", this.action ? this.actionButtonLabel : undefined, config);
            }
          }
        );
      }
      else {
        this._ParamService.UpdateGrievanceStatus(this.ParamForms)
        .subscribe(response => 
        {
            if(response.ReturnCode == 200)
            {
                alert('Grievance Status Successfully');
                this._Route.navigate(['/GrievanceStatuslist']);
            }
        })
      }

    }

  }
  public errorHandling = (control: string, error: string) => {
    return this.grievanceStatusForm.controls[control].hasError(error);
  }


}