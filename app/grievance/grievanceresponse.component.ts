import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketResponseModel, FileToUploadModel } from "@src/app/shared/models/Grievance.model";
import { GrievanceService } from '@src/app/shared/services/grievance-service';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { UserModel } from './../shared/models/user.model';
import { LoginService } from '@src/app/shared/services/login-service';
import { GrievanceStatusService } from '@src/app/shared/services/grivancestatus-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
const MAX_SIZE: number = 1048576;
@Component({
  templateUrl: './grievanceresponse.html',
  styleUrls: ['./grievanceresponse.css']
})

export class GrievanceResponseComponent {
  grievanceResponseForm: FormGroup;
  user: UserModel;
  title = "Grievance Response";
  ParamForms: TicketResponseModel = new TicketResponseModel();
  private _ParamService;
  private _ParamService1;
  private responsedata: any;
  ParamType: any = [];
  ParamType1: any = [];
  theFile: any = null;
  errorMessage: any;
  actionButtonLabel: string = 'Retry';
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private Param_ID: number;

  constructor(private _Route: Router, private _routeParams: ActivatedRoute, private actionbarHelper: UtilityHelper, public snackBar: MatSnackBar,
    private grievanceservice: GrievanceService, private loginService: LoginService,
    private grievanceStatusService: GrievanceStatusService, private formBuilder: FormBuilder) {
    this._ParamService = grievanceservice;
    this._ParamService1 = grievanceStatusService;
    this.user = this.loginService.getSelectedUser();
    //this.getGrievanceStatus();
  }
  output: any;

  ngOnInit() {
    this.grievanceResponseForm = this.formBuilder.group({
      tGrievanceComment: ["", [Validators.required]],
      nGrievanceStatusId: ["", [Validators.required]],
      CreatedByName: [{ value: "", disabled: true }],
      tGrievanceSubject: [{ value: "", disabled: true }],
      tGrievanceDescription: [{ value: "", disabled: true }]
    });
    this.getGrievanceStatus();
    this.Param_ID = this._routeParams.snapshot.params['Param_ID'];
    if (this.Param_ID != null) {
      this.ParamForms.nGrievanceId = this.Param_ID;
      var data = this._ParamService.GetGrievanceByUserId(this.Param_ID).subscribe(
        Param => {
          console.log(Param.ObjReturn);
          this.ParamForms.nGrievanceStatusId = null;
          this.ParamForms.tGrievanceComment = Param.ObjReturn.tGrievanceComment;
          this.ParamForms.tFileUploadPath = Param.ObjReturn.tFileUploadPath;
          this.ParamForms.tGrievanceDescription = Param.ObjReturn.tGrievanceDescription;
          this.ParamForms.tGrievanceSubject = Param.ObjReturn.tGrievanceSubject;
          this.ParamForms.CreatedByName = Param.ObjReturn.CreatedByName;
        },
        error => this.errorMessage = <any>error
      );
    }
  }
  
  getGrievanceStatus() {

    return this._ParamService1.GetAllGrievanceStatus().subscribe(
      AllParam => {
        console.log(AllParam.ObjReturn);
        this.ParamType = AllParam.ObjReturn;
      },
      error => this.errorMessage = <any>error
    );
  }
  onFileChange(event) {
    this.theFile = null;

    // See if any file(s) have been selected from input
    if (event.target.files && event.target.files.length > 0) {
      // Don't allow file sizes over 1MB
      if (event.target.files[0].size < MAX_SIZE) {
        // Set theFile property
        this.theFile = event.target.files[0];
      }
      else {
        // Display error message
        alert(event.target.files[0].name
          + " is too large to upload.");
      }
    }
  }
  private readAndUploadFile(theFile: any) {
    let file = new FileToUploadModel();

    // Set File Information
    file.fileName = theFile.name;
    file.fileSize = theFile.size;
    file.fileType = theFile.type;
    file.lastModifiedTime = theFile.lastModified;
    file.lastModifiedDate = theFile.lastModifiedDate;

    // Use FileReader() object to get file to upload
    // NOTE: FileReader only works with newer browsers
    let reader = new FileReader();

    // Setup onload event for reader
    reader.onload = (e) => {
      // Store base64 encoded representation of file
      file.fileAsBase64 = reader.result.toString();

      // POST to server
      let config = new MatSnackBarConfig();
      config.duration = this.setAutoHide ? this.autoHide : 0;
      config.verticalPosition = this.verticalPosition;
      this._ParamService.uploadFile(file)
        .subscribe(resp => {
          console.log(resp)
          this.ParamForms.tFileUploadPath = resp.ObjReturn;
          //this.snackBar.open("Logged in Successfully", this.action ? this.actionButtonLabel : undefined, config);
          alert('File Uploaded Successfully');

        });
    }
    // Read the file    
    reader.readAsDataURL(theFile);
  }
  uploadFile(): void {
    this.readAndUploadFile(this.theFile);
  }

  SaveResponse() {
    if (this.grievanceResponseForm.valid) {
      this._ParamService.SaveGrievanceResponse(this.ParamForms).subscribe(
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
            //['/Param/Edit/',element.Param_ID]
            this._Route.navigate(['/GrievanceListAssigned/',7,7]);
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
    return this.grievanceResponseForm.controls[control].hasError(error);
  }
  closeForm(){
    this._Route.navigate(['/GrievanceListAssigned']);
  }
}