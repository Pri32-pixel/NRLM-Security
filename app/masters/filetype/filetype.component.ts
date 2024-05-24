import { Component } from '@angular/core';
import { FileTypeModel } from '@src/app/shared/models/KMMaster';
import { DocCategoryService } from '@src/app/shared/services/doccategory-service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '@src/app/shared/services/login-service';
import { CommonSupport } from '@src/app/shared/validator/CommonSupport';
@Component({
    templateUrl: './FileType.html',
    styleUrls: ['./FileType.css']
})

export class FileTypeComponent {
    FileTypeForm: FormGroup;
    title = "File Type Master";
    ParamForms: FileTypeModel = new FileTypeModel();
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
        private grievanceTypeService: DocCategoryService, private formBuilder: FormBuilder,private loginService: LoginService,
        private _routeParams: ActivatedRoute) {
        this._ParamService = grievanceTypeService;

    }
    output: any;
    ngOnInit() {
        this.FileTypeForm = this.formBuilder.group({
            file_type: ["", [Validators.required]],            
            is_active: [""]
        });
        this.GetDataEdit();
    }
    GetDataEdit() {
        this.Param_ID = this._routeParams.snapshot.params['Param_ID'];
        if (this.Param_ID != null) {
            var data = this._ParamService.GetFileTypeById(this.Param_ID).subscribe(
                Param => {
                    console.log(Param.result);
                    this.ParamForms.ftypeid = Param.result[0].ftypeid;
                    this.ParamForms.file_type = Param.result[0].file_type;
                    this.ParamForms.is_active = Param.result[0].is_active;
                },
                error => this.errorMessage = <any>error
            );
        }
    }
    Save() {
        if (this.FileTypeForm.valid) {
            if (this.ParamForms.is_active.toString()=="true" || this.ParamForms.is_active==1 )
                this.ParamForms.is_active=1;
            else
                this.ParamForms.is_active=0;
            
            if (this.ParamForms.ftypeid == 0) {
                this.ParamForms.createdby=this.loginService.getSelectedUser().userid;    
                this._ParamService.AddFileType(this.ParamForms).subscribe(
                    response => {

                        this.output = response;
                        if (this.output.status == 409) {
                            let config = new MatSnackBarConfig();
                            config.duration = this.setAutoHide ? this.autoHide : 0;
                            config.verticalPosition = this.verticalPosition;
                            this.snackBar.open("File Type Already Exists", this.action ? this.actionButtonLabel : undefined, config);

                        }
                        else if (this.output.status == 200) {
                          
                            if (this.output.message=="OK")
                            this.showSnakBar("Data Saved Successfully");
                                //this.snackBar.open("Data Saved Successfully ", this.action ? this.actionButtonLabel : undefined, config);
                            else
                            this.showSnakBar("Something Went Wrong");
                                //this.snackBar.open("Something Went Wrong", this.action ? this.actionButtonLabel : undefined, config);
                            this._Route.navigate(['/FileTypelist']);
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
                this.ParamForms.updateby=this.loginService.getSelectedUser().userid;   
                this._ParamService.UpdateFileType(this.ParamForms)
                    .subscribe(response => {
                        let config = new MatSnackBarConfig();
                        //config.duration = this.setAutoHide ? this.autoHide : 0;
                        config.verticalPosition = this.verticalPosition;
                        config.duration=5000;
                        if (response.status == 200) {
                            this.showSnakBar("File Type Update Successfully");
                           // alert('File Type Updated Successfully');
                           //this.snackBar.open("File Type Update Successfully ", this.action ? this.actionButtonLabel : undefined, config);
                            //this.snackBar.open("Data Saved Successfully", this.action ? this.actionButtonLabel : undefined, config);
                            this._Route.navigate(['/FileTypelist']);
                        }
                    })
            }
        }
    }
    public errorHandling = (control: string, error: string) => {
        return this.FileTypeForm.controls[control].hasError(error);
    }

    public showSnakBar(snakeMessage)
    {
                             let config = new MatSnackBarConfig();
                        //config.duration = this.setAutoHide ? this.autoHide : 0;
                        config.verticalPosition = this.verticalPosition;
                        config.duration=5000;  
                        this.snackBar.open(snakeMessage, this.action ? this.actionButtonLabel : undefined, config);

    }

}