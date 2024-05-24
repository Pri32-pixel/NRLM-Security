import { Component } from '@angular/core';
import { RoleViewModel } from '@src/app/shared/models/role.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RoleService } from '@src/app/shared/services/role-service';
import { LoginService } from '@src/app/shared/services/login-service';
@Component({
    templateUrl: './role.html',
    styleUrls: ['./role.css']
})

export class RoleComponent {
    roleForm: FormGroup;
    title = "Role Master";
    ParamForms: RoleViewModel = new RoleViewModel();
    private _RoleService;
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
        private roleService: RoleService, private _routeParams: ActivatedRoute) {
        this._RoleService = roleService;
    }
    output: any;

    ngOnInit() {
        this.roleForm = this.formBuilder.group({
            rolename: ["", [Validators.required]],
            is_active: [""]
        });
        this.GetDataEdit();
    }
    
    GetDataEdit() {
        this.Param_ID = this._routeParams.snapshot.params['Param_ID'];
        if (this.Param_ID != null) {
            var data = this._RoleService.GetRoleById(this.Param_ID).subscribe(
                Param => {
                    console.log(Param.result);
                    this.ParamForms.roleid = Param.result[0].roleid;
                    this.ParamForms.rolename = Param.result[0].rolename;
                    this.ParamForms.is_active = Param.result[0].is_active;
                   
                },
                error => this.errorMessage = <any>error
            );
        }
    }
    Save() {
        if (this.roleForm.valid) {
            //console.log('call Role Save');
            if (this.ParamForms.is_active.toString()=="true" || this.ParamForms.is_active==1)
            this.ParamForms.is_active=1;
        else
            this.ParamForms.is_active=0;
            if (this.ParamForms.roleid == 0) {
                this.ParamForms.createdby=this.loginService.getSelectedUser().userid;    
                if (this.ParamForms.is_active.toString()=="true" || this.ParamForms.is_active==1)
                    this.ParamForms.is_active=1;
                else
                this.ParamForms.is_active=0;

                this._RoleService.AddRole(this.ParamForms).subscribe(
                    response => {
                        this.output = response;
                        if (this.output.status == 409) {
                            let config = new MatSnackBarConfig();
                            config.duration = this.setAutoHide ? this.autoHide : 0;
                            config.verticalPosition = this.verticalPosition;
                            this.snackBar.open("Role Name Already Exists", this.action ? this.actionButtonLabel : undefined, config);

                        }
                        else if (this.output.status == 200) {
                            let config = new MatSnackBarConfig();
                            config.duration = this.setAutoHide ? this.autoHide : 0;
                            config.verticalPosition = this.verticalPosition;
                            this.snackBar.open("Saved Role Successfully", this.action ? this.actionButtonLabel : undefined, config);
                            this._Route.navigate(['/Rolelist']);
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
          
                this._RoleService.UpdateRole(this.ParamForms)
                    .subscribe(response => {
                        if (response.status == 200) {
                            alert('Role Updated Successfully');
                            this._Route.navigate(['/Rolelist']);
                        }
                    })
            }
        }

    }
    public errorHandling = (control: string, error: string) => {
        return this.roleForm.controls[control].hasError(error);
    }

}