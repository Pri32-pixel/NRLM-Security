import { Component } from '@angular/core';
import { CountryDropdownModel, StateViewModel,StateModel } from '@src/app/shared/models/State.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { StateService } from '@src/app/shared/services/state-service';
import { LoginService } from '@src/app/shared/services/login-service';
@Component({
    templateUrl: './state.html',
    styleUrls: ['./state.css']
})

export class StateComponent {
    stateForm: FormGroup;
    title = "State Master";
    ParamForms: StateModel = new StateModel();
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
        private formBuilder: FormBuilder,private loginService: LoginService,
        private stateService: StateService, private _routeParams: ActivatedRoute) {
        this._StateService = stateService;
        this.getCountry();
    }
    output: any;

    ngOnInit() {
        this.stateForm = this.formBuilder.group({
            nCountryId: ["", [Validators.required]],
            tStateName: ["", [Validators.required]],
            bIsActive: [""]
        });
        this.GetDataEdit();
    }
    getCountry() {
        return this._StateService.GetCountrys().subscribe(data => {
            console.log(data);
            this.ParamType = data.result;
        },
            error => this.errorMessage = <any>error
        );
    }
    GetDataEdit() {
        this.Param_ID = this._routeParams.snapshot.params['Param_ID'];
        if (this.Param_ID != null) {
            var data = this._StateService.GetStateById(this.Param_ID).subscribe(
                Param => {
                    console.log(Param.result);
                    this.ParamForms.stateid = Param.result[0].stateid;
                    this.ParamForms.statename = Param.result[0].statename;
                    this.ParamForms.countryid = Param.result[0].countryid;
                    this.ParamForms.is_active = Param.result[0].is_active;
                },
                error => this.errorMessage = <any>error
            );
        }
    }
    Save() {
        if (this.stateForm.valid) {
            if (this.ParamForms.is_active.toString()=="true" || this.ParamForms.is_active==1)
                this.ParamForms.is_active=1;
            else
                this.ParamForms.is_active=0;
                
            if (this.ParamForms.stateid == 0) {
                this.ParamForms.createdby=this.loginService.getSelectedUser().userid;  
                this._StateService.AddState(this.ParamForms).subscribe(
                    response => {
                        this.output = response;
                        if (this.output.status == 409) {
                            let config = new MatSnackBarConfig();
                            config.duration = this.setAutoHide ? this.autoHide : 0;
                            config.verticalPosition = this.verticalPosition;
                            this.snackBar.open("State Name Already Exists", this.action ? this.actionButtonLabel : undefined, config);

                        }
                        else if (this.output.status == 200) {
                            let config = new MatSnackBarConfig();
                            config.duration = this.setAutoHide ? this.autoHide : 0;
                            config.verticalPosition = this.verticalPosition;
                            this.snackBar.open("Saved State Successfully", this.action ? this.actionButtonLabel : undefined, config);
                            this._Route.navigate(['/Statelist']);
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
                this._StateService.UpdateState(this.ParamForms)
                    .subscribe(response => {
                        if (response.status == 200) {
                            alert('State Updated Successfully');
                            this._Route.navigate(['/Statelist']);
                        }
                    })
            }
        }

    }
    public errorHandling = (control: string, error: string) => {
        return this.stateForm.controls[control].hasError(error);
    }

}