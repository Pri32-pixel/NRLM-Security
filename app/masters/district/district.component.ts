import { Component } from '@angular/core';
import { DistrictDropdownModel, DistrictViewModel } from '@src/app/shared/models/District.model';
import { DistrictService } from '@src/app/shared/services/district-service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { StateService } from '@src/app/shared/services/state-service';
@Component({
    templateUrl: './district.html',
    styleUrls: ['./district.css']
})

export class DistrictComponent {
    districtForm: FormGroup;
    title = "District Master";
    ParamForms: DistrictViewModel = new DistrictViewModel();
    private _DistrictService;
    private _StateService;
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
        private districtService: DistrictService, private formBuilder: FormBuilder, private _routeParams: ActivatedRoute,
        private stateService: StateService) {
        this._DistrictService = districtService;
        this._StateService = stateService;
        this.getState();
    }
    output: any;

    ngOnInit() {
        this.districtForm = this.formBuilder.group({
            nStateId: ["", [Validators.required]],
            tDistrictName: ["", [Validators.required]],
            bIsActive: [""]
        });
        this.GetDataEdit();
    }
    GetDataEdit() {
        this.Param_ID = this._routeParams.snapshot.params['Param_ID'];
        if (this.Param_ID != null) {
            var data = this._DistrictService.GetDistrictById(this.Param_ID).subscribe(
                Param => {
                    console.log(Param.ObjReturn);
                    this.ParamForms.nDistrictID = Param.ObjReturn.nDistrictID;
                    this.ParamForms.tDistrictName = Param.ObjReturn.tDistrictName;
                    this.ParamForms.nStateId = Param.ObjReturn.nStateID;
                    this.ParamForms.bIsActive = Param.ObjReturn.bIsActive;
                },
                error => this.errorMessage = <any>error
            );
        }
    }
    getState() {
        return this._StateService.GetAllState().subscribe(data => {
            console.log(data);
            this.ParamType = data.ObjReturn;
        },
            error => this.errorMessage = <any>error
        );
    }
    Save() {
        if (this.districtForm.valid) {
            if (this.ParamForms.nStateId == 0) {
                this._DistrictService.AddDistrict(this.ParamForms).subscribe(
                    response => {
                        this.output = response;
                        if (this.output.ReturnCode == 409) {
                            let config = new MatSnackBarConfig();
                            config.duration = this.setAutoHide ? this.autoHide : 0;
                            config.verticalPosition = this.verticalPosition;
                            this.snackBar.open("District Name Already Exists", this.action ? this.actionButtonLabel : undefined, config);

                        }
                        else if (this.output.ReturnCode == 200) {
                            let config = new MatSnackBarConfig();
                            config.duration = this.setAutoHide ? this.autoHide : 0;
                            config.verticalPosition = this.verticalPosition;
                            this.snackBar.open("Saved District Successfully", this.action ? this.actionButtonLabel : undefined, config);
                            this._Route.navigate(['/Districtlist']);
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
                this._DistrictService.UpdateDistrict(this.ParamForms)
                    .subscribe(response => {
                        if (response.ReturnCode == "200") {
                            alert('District Updated Successfully');
                            this._Route.navigate(['/Districtlist']);
                        }
                    })
            }
        }
    }
    public errorHandling = (control: string, error: string) => {
        return this.districtForm.controls[control].hasError(error);
    }

}