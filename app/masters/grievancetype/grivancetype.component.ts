import { Component } from '@angular/core';
import { GrievanceTypeModel } from '@src/app/shared/models/GrievanceType.model';
import { GrievanceTypeService } from '@src/app/shared/services/grivancetype-service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
@Component({
    templateUrl: './GrivanceType.html',
    styleUrls: ['./GrivanceType.css']
})

export class GrivanceTypeComponent {
    grievanceTypeForm: FormGroup;
    title = "Grievance Type Master";
    ParamForms: GrievanceTypeModel = new GrievanceTypeModel();
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
        private grievanceTypeService: GrievanceTypeService, private formBuilder: FormBuilder,
        private _routeParams: ActivatedRoute) {
        this._ParamService = grievanceTypeService;

    }
    output: any;
    ngOnInit() {
        this.grievanceTypeForm = this.formBuilder.group({
            tGrievanceType: ["", [Validators.required]],
            nGrievanceTypeOrder: [""],
            bIsActive: [""]
        });
        this.GetDataEdit();
    }
    GetDataEdit() {
        this.Param_ID = this._routeParams.snapshot.params['Param_ID'];
        if (this.Param_ID != null) {
            var data = this._ParamService.GetGrievanceTypeById(this.Param_ID).subscribe(
                Param => {
                    console.log(Param.ObjReturn);
                    this.ParamForms.nGrievanceTypeId = Param.ObjReturn.nGrievanceTypeId;
                    this.ParamForms.tGrievanceType = Param.ObjReturn.tGrievanceType;
                    this.ParamForms.nGrievanceTypeOrder = Param.ObjReturn.nGrievanceTypeOrder;
                    this.ParamForms.bIsActive = Param.ObjReturn.bIsActive;
                },
                error => this.errorMessage = <any>error
            );
        }
    }
    Save() {
        if (this.grievanceTypeForm.valid) {
            if (this.ParamForms.nGrievanceTypeId == 0) {
                this._ParamService.AddGrievanceType(this.ParamForms).subscribe(
                    response => {

                        this.output = response;
                        if (this.output.ReturnCode == 409) {
                            let config = new MatSnackBarConfig();
                            config.duration = this.setAutoHide ? this.autoHide : 0;
                            config.verticalPosition = this.verticalPosition;
                            this.snackBar.open("Parameter Name Already Exists", this.action ? this.actionButtonLabel : undefined, config);

                        }
                        else if (this.output.ReturnCode == 200) {
                            let config = new MatSnackBarConfig();
                            config.duration = this.setAutoHide ? this.autoHide : 0;
                            config.verticalPosition = this.verticalPosition;
                            this.snackBar.open("Data Saved Successfully", this.action ? this.actionButtonLabel : undefined, config);
                            this._Route.navigate(['/GrievanceTypelist']);
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
                this._ParamService.UpdateGrievanceType(this.ParamForms)
                    .subscribe(response => {
                        if (response.ReturnCode == 200) {
                            alert('Grievance Type Updated Successfully');
                            //this.snackBar.open("Data Saved Successfully", this.action ? this.actionButtonLabel : undefined, config);
                            this._Route.navigate(['/GrievanceTypelist']);
                        }
                    })
            }
        }
    }
    public errorHandling = (control: string, error: string) => {
        return this.grievanceTypeForm.controls[control].hasError(error);
    }

}