import { Component } from '@angular/core';
import { DocCategoryModel } from '@src/app/shared/models/DocCategory.model';
import { DocCategoryService } from '@src/app/shared/services/doccategory-service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '@src/app/shared/services/login-service';
import { UserAuthoService } from '@src/app/shared/services/user-autho-service';
@Component({
    templateUrl: './DocCategory.html',
    styleUrls: ['./DocCategory.css']
})

export class DocCategoryComponent {
    DocCategoryForm: FormGroup;
    title = "Knowledge Material Category Master";
    ParamForms: DocCategoryModel = new DocCategoryModel();
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

    constructor(public actionBar:UtilityHelper,public userAuthService:UserAuthoService,private _Route: Router, private actionbarHelper: UtilityHelper, public snackBar: MatSnackBar,
        private grievanceTypeService: DocCategoryService, private formBuilder: FormBuilder,private loginService: LoginService,
        private _routeParams: ActivatedRoute) {
        this._ParamService = grievanceTypeService;

    }
    output: any;


    checkUserAuth()
    {
      this.userAuthService.isAuthorizeUser().subscribe(
        AllUser => {
          if(AllUser.status==901)
          {
            this.showSnowBar(AllUser.message);
            this.loginService.LogoutUser();
            this.actionBar.openPage('/login', true);
          }
        }
      )
    }
    showSnowBar(message)
  {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.duration=5000;
   
      //alert('Data Saved Successfully');
      this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
  }
    ngOnInit() {



        this.DocCategoryForm = this.formBuilder.group({
            tDocCategoryCode: [""],
            tDocCategory: ["", [Validators.required]],            
            nDocCategoryOrder: [""],
            bIsActive: [""]
        });
        this.GetDataEdit();
    }
    GetDataEdit() {
        this.Param_ID = this._routeParams.snapshot.params['Param_ID'];
        if (this.Param_ID != null) {
            var data = this._ParamService.GetDocCategoryById(this.Param_ID).subscribe(
                Param => {
                    console.log(Param.result);
                    this.ParamForms.doccategoryid = Param.result[0].doccategoryid;
                    this.ParamForms.doccategorycode = Param.result[0].doccategorycode;
                    this.ParamForms.doccategory = Param.result[0].doccategory;
                    this.ParamForms.doccategoryorder = Param.result[0].doccategoryorder;
                    this.ParamForms.is_active = Param.result[0].is_active;
                },
                error => this.errorMessage = <any>error
            );
        }
    }
    Save() {
        if (this.DocCategoryForm.valid) {
            if (this.ParamForms.is_active.toString()=="true" || this.ParamForms.is_active==1)
                this.ParamForms.is_active=1;
            else
                this.ParamForms.is_active=0;
            
            if (this.ParamForms.doccategoryid == 0) {
                this.ParamForms.createdby=this.loginService.getSelectedUser().userid;    
                this._ParamService.AddDocCategory(this.ParamForms).subscribe(
                    response => {

                        this.output = response;
                        if (this.output.status == 409) {
                            let config = new MatSnackBarConfig();
                            config.duration = this.setAutoHide ? this.autoHide : 0;
                            config.verticalPosition = this.verticalPosition;
                            this.snackBar.open("Category Name Already Exists", this.action ? this.actionButtonLabel : undefined, config);

                        }
                        else if (this.output.status == 200) {
                            let config = new MatSnackBarConfig();
                            //config.duration = this.setAutoHide ? this.autoHide : 0;
                            config.verticalPosition = this.verticalPosition;
                            config.duration=5000;
                            if (this.output.message=="OK")
                                this.snackBar.open("Data Saved and Synced Successfully ", this.action ? this.actionButtonLabel : undefined, config);
                            else
                                this.snackBar.open("Data Saved Successfully & Not Synced", this.action ? this.actionButtonLabel : undefined, config);
                            this._Route.navigate(['/DocCategorylist']);
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
                this._ParamService.UpdateDocCategory(this.ParamForms)
                    .subscribe(response => {
                        if (response.status == 200) {
                            alert('Knowledge Material Category Updated Successfully');
                            //this.snackBar.open("Data Saved Successfully", this.action ? this.actionButtonLabel : undefined, config);
                            this._Route.navigate(['/DocCategorylist']);
                        }
                    })
            }
        }
    }
    public errorHandling = (control: string, error: string) => {
        return this.DocCategoryForm.controls[control].hasError(error);
    }

}