import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketAssignModel, FileToUploadModel } from "@src/app/shared/models/Grievance.model";
import { GrievanceTypeService } from '@src/app/shared/services/grivancetype-service';
import { GrievanceService } from '@src/app/shared/services/grievance-service';
import { GrievancePriorityService } from '@src/app/shared/services/grievancepriority-service';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { LoginService } from '@src/app/shared/services/login-service';
import { UserModel } from './../shared/models/user.model';
import { GrievanceStatusService } from '@src/app/shared/services/grivancestatus-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
const MAX_SIZE: number = 1048576;
@Component({
  templateUrl: './grievanceassign.html',
  styleUrls: ['./grievanceassign.css']
})

export class GrievanceAssignComponent {
  grievanceAssignForm: FormGroup;
  ParamForms: TicketAssignModel = new TicketAssignModel();
  private _ParamService;
  private _GrievanceStatusService;
  private _LoginService;
  private _GrievancePriorityService
  private responsedata: any;
  user: UserModel;
  ParamType: any = [];
  ParamType1: any = [];
  ParamType2: any = [];
  theFile: any = null;
  errorMessage: any;
  actionButtonLabel: string = 'Retry';
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private Param_ID: number;



  constructor(private _routeParams: Router, private _routeActParams: ActivatedRoute, private actionbarHelper: UtilityHelper, public snackBar: MatSnackBar,
    private grievanceservice: GrievanceService, private loginService: LoginService, private formBuilder: FormBuilder,
    private grievancePriorityService: GrievancePriorityService) {
    
     this._ParamService = grievanceservice;
    this._LoginService = loginService;
    this._GrievancePriorityService=grievancePriorityService;
    this.user = this.loginService.getSelectedUser();
    this.getRole();
    this.getPriority();
  }
  output: any;
  ngOnInit() {

    this.grievanceAssignForm = this.formBuilder.group({
      nRoleId: ["", [Validators.required]],
      nGrievanceUserId: ["", [Validators.required]],
      nGrievancePriorityId: ["", [Validators.required]],
      CreatedByName: [{value:"",disabled: true}],
      tGrievanceSubject: [{value:"",disabled: true}],
      tGrievanceDescription: [{value:"",disabled: true}]
    });
    this.Param_ID = this._routeActParams.snapshot.params['Param_ID'];
    if (this.Param_ID != null) {
      this.ParamForms.nGrievanceId = this.Param_ID;
      var data = this._ParamService.GetGrievanceByUserId(this.Param_ID).subscribe(
        Param => {
          console.log(Param.ObjReturn);
          this.ParamForms.nGrievanceId = Param.ObjReturn.nGrievanceId;
          this.ParamForms.nRoleId = Param.ObjReturn.nRoleId;
          this.getUser(this.ParamForms.nRoleId);
          
          this.ParamForms.nGrievancePriorityId = Param.ObjReturn.nGrievancePriorityId;
          this.ParamForms.nGrievanceUserId = Param.ObjReturn.nGrievanceUserId;
          this.ParamForms.tGrievanceDescription = Param.ObjReturn.tGrievanceDescription;
          this.ParamForms.tGrievanceSubject = Param.ObjReturn.tGrievanceSubject;
          this.ParamForms.CreatedByName = Param.ObjReturn.CreatedByName;
        },
        error => this.errorMessage = <any>error
      );
    }
  }
  getRole() {

    return this._LoginService.GetAllRole().subscribe(
      AllParam => {
        console.log(AllParam.ObjReturn);
        this.ParamType = AllParam.ObjReturn;
      },
      error => this.errorMessage = <any>error
    );
  }

  getPriority() {

    return this._GrievancePriorityService.GetAllGrievancePriority().subscribe(
      AllParam => {
        console.log(AllParam.ObjReturn);
        this.ParamType2 = AllParam.ObjReturn;
      },
      error => this.errorMessage = <any>error
    );
  }

  getUser(nRoleId: number) {
    return this._LoginService.GetUserbyRole(this.ParamForms.nRoleId).subscribe(AllParam => {
      console.log(AllParam);
      this.ParamType1 = AllParam.ObjReturn;
    },
      error => this.errorMessage = <any>error
    );
  }
  RoleChange() {

    //console.log(this.ParamForms.nRoleId);
    this.getUser(this.ParamForms.nRoleId);
  }
  SaveAssign() {
    if (this.grievanceAssignForm.valid) {
      this._ParamService.SaveGrievanceAssign(this.ParamForms).subscribe(
        response => {

          this.output = response;
          if (this.output.ReturnCode == 409) {
            let config = new MatSnackBarConfig();
            config.duration = this.setAutoHide ? this.autoHide : 0;
            config.verticalPosition = this.verticalPosition;
            this.snackBar.open("Grievance Already Exists", this.action ? this.actionButtonLabel : undefined, config);
          }
          else if (this.output.ReturnCode == 200) {
            let config = new MatSnackBarConfig();
            config.duration = this.setAutoHide ? this.autoHide : 0;
            config.verticalPosition = this.verticalPosition;
            this.snackBar.open("Data Saved Successfully", this.action ? this.actionButtonLabel : undefined, config);
            this._routeParams.navigate(['/dashboard']);
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
  }
  public errorHandling = (control: string, error: string) => {
    return this.grievanceAssignForm.controls[control].hasError(error);
  }
  closeForm(){
    this._routeParams.navigate(['/dashboard']);
  }
}