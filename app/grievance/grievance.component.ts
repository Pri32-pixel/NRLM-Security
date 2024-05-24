import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TicketModel,FileToUploadModel } from "@src/app/shared/models/Grievance.model";
import { GrievanceTypeService } from '@src/app/shared/services/grivancetype-service';
import { GrievanceService } from '@src/app/shared/services/grievance-service';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '@src/app/shared/services/login-service';
import { UserModel } from './../shared/models/user.model';
const MAX_SIZE: number = 1048576;
@Component({
  templateUrl: './Grievance.html',
  styleUrls: ['./Grievance.css']
})

export class GrievanceComponent {
   grievanceForm: FormGroup;
    title = "Grievance Add";
    user: UserModel;
    ParamForms: TicketModel = new TicketModel();
    private _ParamService;
    private responsedata: any;
    ParamType: any = [];
    status: any [] = [
        {id: 1, name: 'Yes'},
        {id: 0, name: 'No'}
      ];
    errorMessage: any;
    actionButtonLabel: string = 'Retry';
    action: boolean = false;
    setAutoHide: boolean = true;
    autoHide: number = 2000;
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    private _ParamService1;
    theFile: any = null;

 
    constructor(private _Route: Router,private actionbarHelper: UtilityHelper,public snackBar: MatSnackBar,
        private grievanceservice: GrievanceService,private grievanceTypeService:GrievanceTypeService, 
        private loginService: LoginService,private formBuilder: FormBuilder) {
        this._ParamService = grievanceservice;
        this._ParamService1=grievanceTypeService;
        this.user = this.loginService.getSelectedUser();
        this.getGrievanceType();
    }
    output: any;
    ngOnInit() {
      this.grievanceForm = this.formBuilder.group({
        tGrievanceSubject: ["", [Validators.required]],
        nGrievanceTypeId: ["", [Validators.required]],
        tGrievanceDescription:  ["", [Validators.required]],
      });
    }
    getGrievanceType() {

        return this._ParamService1.GetAllGrievanceType().subscribe(
            AllParam => {
              console.log(AllParam);
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
              + " is too large to upload.") ;
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
              this.ParamForms.tFileUploadPath=resp.ObjReturn;
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
    SaveGrievance() {
      //this.readAndUploadFile(this.theFile);
      if (this.grievanceForm.valid) {
      this.ParamForms.nCreatedBy=this.user.userid;
      this._ParamService.SaveGrievance(this.ParamForms).subscribe(
        response => 
        {
           
            this.output = response;
            if (this.output.ReturnCode == 409) 
            {
                let config = new MatSnackBarConfig();
                config.duration = this.setAutoHide ? this.autoHide : 0;
                config.verticalPosition = this.verticalPosition;
                this.snackBar.open("Grievance Already Exists", this.action ? this.actionButtonLabel : undefined, config);
               
            }
            else if (this.output.ReturnCode == 200) 
            { 
                let config = new MatSnackBarConfig();
                config.duration = this.setAutoHide ? this.autoHide : 0;
                config.verticalPosition = this.verticalPosition;
                this.snackBar.open("Grievance Created Successfully", this.action ? this.actionButtonLabel : undefined, config);
                this._Route.navigate(['/dashboard']);
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
      return this.grievanceForm.controls[control].hasError(error);
    }
}