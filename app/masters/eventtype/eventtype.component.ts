import { Component } from '@angular/core';
import { EventTypeModel } from '@src/app/shared/models/KMMaster';
import { DocCategoryService } from '@src/app/shared/services/doccategory-service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '@src/app/shared/services/login-service';
@Component({
    templateUrl: './EventType.html',
    styleUrls: ['./EventType.css']
})

export class EventTypeComponent {
    EventTypeForm: FormGroup;
    title = "Event Type Master";
    ParamForms: EventTypeModel = new EventTypeModel();
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
        this.EventTypeForm = this.formBuilder.group({
            event_type: ["", [Validators.required]],            
            is_active: [""]
        });
        this.GetDataEdit();
    }
    GetDataEdit() {
        this.Param_ID = this._routeParams.snapshot.params['Param_ID'];
        if (this.Param_ID != null) {
            var data = this._ParamService.GetEventTypeById(this.Param_ID).subscribe(
                Param => {
                    console.log(Param.result);
                    this.ParamForms.e_typeid = Param.result[0].e_typeid;
                    this.ParamForms.event_type = Param.result[0].event_type;
                    this.ParamForms.is_active = Param.result[0].is_active;
                },
                error => this.errorMessage = <any>error
            );
        }
    }
    Save() {
        if (this.EventTypeForm.valid) {
            if (this.ParamForms.is_active.toString()=="true" )
                this.ParamForms.is_active=1;
            else
                this.ParamForms.is_active=0;
            
            if (this.ParamForms.e_typeid == 0) {
                this.ParamForms.createdby=this.loginService.getSelectedUser().userid;    
                this._ParamService.AddEventType(this.ParamForms).subscribe(
                    response => {

                        this.output = response;
                        if (this.output.status == 409) {
                            let config = new MatSnackBarConfig();
                            config.duration = this.setAutoHide ? this.autoHide : 0;
                            config.verticalPosition = this.verticalPosition;
                            this.snackBar.open("Event Type Already Exists", this.action ? this.actionButtonLabel : undefined, config);

                        }
                        else if (this.output.status == 200) {
                            let config = new MatSnackBarConfig();
                            //config.duration = this.setAutoHide ? this.autoHide : 0;
                            config.verticalPosition = this.verticalPosition;
                            config.duration=5000;
                            
                                this.snackBar.open("Data Saved Successfully ", this.action ? this.actionButtonLabel : undefined, config);
                            
                            this._Route.navigate(['/EventTypelist']);
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
                this._ParamService.UpdateEventType(this.ParamForms)
                    .subscribe(response => {
                        if (response.status == 200) {
                            alert('Event Type Updated Successfully');
                            //this.snackBar.open("Data Saved Successfully", this.action ? this.actionButtonLabel : undefined, config);
                            this._Route.navigate(['/EventTypelist']);
                        }
                    })
            }
        }
    }
    public errorHandling = (control: string, error: string) => {
        return this.EventTypeForm.controls[control].hasError(error);
    }

}