import { Component } from '@angular/core';
import { DocSourceModel } from '@src/app/shared/models/DocSource.model';
import { DocSourceService } from '@src/app/shared/services/docsource-service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '@src/app/shared/services/login-service';
@Component({
    templateUrl: './DocSource.html',
    styleUrls: ['./DocSource.css']
})

export class DocSourceComponent {
    docSourceForm: FormGroup;
    title = "Knowledge Material Source Master";
    ParamForms: DocSourceModel = new DocSourceModel();
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
        private docSourceService: DocSourceService, private formBuilder: FormBuilder,private loginService: LoginService,
        private _routeParams: ActivatedRoute) {
        this._ParamService = docSourceService;

    }
    output: any;
    ngOnInit() {
        this.docSourceForm = this.formBuilder.group({
            tdocSourcecode: ["", [Validators.required]],
            tDocSource: ["", [Validators.required]],
            nDocSourceOrder: [""],
            bIsActive: [""]
        });
        this.GetDataEdit();
    }
    GetDataEdit() {
        this.Param_ID = this._routeParams.snapshot.params['Param_ID'];
        if (this.Param_ID != null) {
            var data = this._ParamService.GetDocSourceById(this.Param_ID).subscribe(
                Param => {
                    console.log(Param.result);
                    this.ParamForms.docsourceid = Param.result[0].docsourceid;
                    this.ParamForms.docsourcecode = Param.result[0].docsourcecode;
                    this.ParamForms.docsource = Param.result[0].docsource;
                    this.ParamForms.docsourceorder = Param.result[0].docsourceorder;
                    this.ParamForms.is_active = Param.result[0].is_active;
                },
                error => this.errorMessage = <any>error
            );
        }
    }
    Save() {
        if (this.docSourceForm.valid) {
            if (this.ParamForms.is_active.toString()=="true" || this.ParamForms.is_active==1)
                this.ParamForms.is_active=1;
            else
                this.ParamForms.is_active=0;
            if (this.ParamForms.docsourceid == 0) {
                this.ParamForms.createdby=this.loginService.getSelectedUser().userid;    
                this._ParamService.AddDocSource(this.ParamForms).subscribe(
                    response => {

                        this.output = response;
                        if (this.output.status == 409) {
                            let config = new MatSnackBarConfig();
                            config.duration = this.setAutoHide ? this.autoHide : 0;
                            config.verticalPosition = this.verticalPosition;
                            this.snackBar.open("Parameter Name Already Exists", this.action ? this.actionButtonLabel : undefined, config);

                        }
                        else if (this.output.status == 200) {
                            let config = new MatSnackBarConfig();
                            config.duration = this.setAutoHide ? this.autoHide : 0;
                            config.verticalPosition = this.verticalPosition;
                            this.snackBar.open("Data Saved Successfully", this.action ? this.actionButtonLabel : undefined, config);
                            this._Route.navigate(['/DocSourcelist']);
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
                this._ParamService.UpdateDocSource(this.ParamForms)
                    .subscribe(response => {
                        if (response.status == 200) {
                            alert('Knowledge Material Source Updated Successfully');
                            //this.snackBar.open("Data Saved Successfully", this.action ? this.actionButtonLabel : undefined, config);
                            this._Route.navigate(['/DocSourcelist']);
                        }
                    })
            }
        }
    }
    public errorHandling = (control: string, error: string) => {
        return this.docSourceForm.controls[control].hasError(error);
    }

}