import { Component } from '@angular/core';
import { GrievancePriorityModel } from '@src/app/shared/models/GrievancePriority.model';
import { GrievancePriorityService } from '@src/app/shared/services/grievancepriority-service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
@Component({
    templateUrl: './GrivancePriority.html',
    styleUrls: ['./GrivancePriority.css']
})

export class GrivancePriorityComponent {
    grievancePriorityForm: FormGroup;
    title = "Grievance Priority Master";
    ParamForms: GrievancePriorityModel = new GrievancePriorityModel();
    private _ParamService;
    private Param_ID: string;
    private responsedata: any;
    ParamPriority: any = [];
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
        private grievancePriorityService: GrievancePriorityService, private formBuilder: FormBuilder,
        private _routeParams: ActivatedRoute) {
        this._ParamService = grievancePriorityService;

    }
    output: any;
    ngOnInit() {
        this.grievancePriorityForm = this.formBuilder.group({
            tGrievancePriority: ["", [Validators.required]],
            nGrievancePriorityOrder: [""],
            bIsActive: [""]
        });
        this.GetDataEdit();
    }
    GetDataEdit() {
        this.Param_ID = this._routeParams.snapshot.params['Param_ID'];
        if (this.Param_ID != null) {
            var data = this._ParamService.GetGrievancePriorityById(this.Param_ID).subscribe(
                Param => {
                    console.log(Param.ObjReturn);
                    this.ParamForms.nGrievancePriorityId = Param.ObjReturn.nGrievancePriorityId;
                    this.ParamForms.tGrievancePriority = Param.ObjReturn.tGrievancePriority;
                    this.ParamForms.nGrievancePriorityOrder = Param.ObjReturn.nGrievancePriorityOrder;
                    this.ParamForms.bIsActive = Param.ObjReturn.bIsActive;
                },
                error => this.errorMessage = <any>error
            );
        }
    }
    Save() {
        if (this.grievancePriorityForm.valid) {
            if (this.ParamForms.nGrievancePriorityId == 0) {
                this._ParamService.AddGrievancePriority(this.ParamForms).subscribe(
                    response => {

                        this.output = response;
                        if (this.output.ReturnCode == 409) {
                            let config = new MatSnackBarConfig();
                            config.duration = this.setAutoHide ? this.autoHide : 0;
                            config.verticalPosition = this.verticalPosition;
                            this.snackBar.open("Priority Already Exists", this.action ? this.actionButtonLabel : undefined, config);

                        }
                        else if (this.output.ReturnCode == 200) {
                            let config = new MatSnackBarConfig();
                            config.duration = this.setAutoHide ? this.autoHide : 0;
                            config.verticalPosition = this.verticalPosition;
                            this.snackBar.open("Priority Saved Successfully", this.action ? this.actionButtonLabel : undefined, config);
                            this._Route.navigate(['/GrievancePrioritylist']);
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
                this._ParamService.UpdateGrievancePriority(this.ParamForms)
                    .subscribe(response => {
                        if (response.ReturnCode == 200) {
                            alert('Priority Saved Successfully');
                            //this.snackBar.open("Data Saved Successfully", this.action ? this.actionButtonLabel : undefined, config);
                            this._Route.navigate(['/GrievancePrioritylist']);
                        }
                    })
            }
        }
    }
    public errorHandling = (control: string, error: string) => {
        return this.grievancePriorityForm.controls[control].hasError(error);
    }

}