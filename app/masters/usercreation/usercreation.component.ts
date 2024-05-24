import { Component } from '@angular/core';
import { RoleDropdownModel,DepartmentDropdownModel, UserModel } from '@src/app/shared/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '@src/app/shared/services/user-service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoginService } from '@src/app/shared/services/login-service';

@Component({
    templateUrl: './usercreation.html',
    styleUrls: ['./usercreation.css']
})

export class UserCreationComponent {
    userForm: FormGroup;
    title = "User Master";
    ParamForms: UserModel = new UserModel();
    private _UserService;
    private Param_ID: string;
    private responsedata: any;
    ParamType3: any = [];
    ParamType1: any = [];
    ParamType2: any = [];
    districtArr: any = [];
    blockArr: any = [];
    status: any[] = [
        { id: 1, name: 'Yes' },
        { id: 0, name: 'No' }
    ];
    errorMessage: any;
    isLoading: boolean = false;
    isReadOnly:boolean=false;
    actionButtonLabel: string = 'Retry';
    action: boolean = false;
    setAutoHide: boolean = true;
    autoHide: number = 2000;
    passwordLbl=" Password length should be  8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.";
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    passwordPattern = "/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/";
    constructor(private _Route: Router, private actionbarHelper: UtilityHelper, public snackBar: MatSnackBar,
        private formBuilder: FormBuilder,private loginService: LoginService,
        private userService: UserService, private _routeParams: ActivatedRoute) {
        this._UserService = userService;
        this.GetDepartments();
        this.GetRoles();
        this.GetState();
        
        
    }
    output: any;
    
    ngOnInit() {
        this.userForm = this.formBuilder.group({
            emailid: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
            firstname: ["", [Validators.required]],
            lastname: ["", [Validators.required]],
            nDepartmentId: ["", [Validators.required]],
            stateid: ["", [Validators.required]],
            districtid: ["", [Validators.required]],
            blockid: ["", [Validators.required]],
            roleid: ["", [Validators.required]],
            phoneno: ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
            userloginid: ["", [Validators.required]],
            userpassword: ["", [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,16}')]],
            isactive: [""]
        });
        
        this.GetDataEdit();
    }

    GetDepartments() {

        return this._UserService.GetAllDepartmentActive().subscribe(
          AllParam => {
            console.log(AllParam.result);
            this.ParamType3 = AllParam.result;
          },
          error => this.errorMessage = <any>error
        );
      }

      
      GetRoles() {

        return this._UserService.GetAllRoleActive().subscribe(
          AllParam => {
            console.log(AllParam.result);
            this.ParamType1 = AllParam.result;
          },
          error => this.errorMessage = <any>error
        );
      }

      
    GetState() {

        return this._UserService.GetAllStateActive().subscribe(
            AllParam => {
              console.log(AllParam.result);
              this.ParamType2 = AllParam.result;
            },
            error => this.errorMessage = <any>error
          );
    }

   

    

      
    

    GetDataEdit() {
        this.Param_ID = this._routeParams.snapshot.params['Param_ID'];
        if (this.Param_ID != null) {
            this.userForm.controls['userpassword'].setValidators([]);
            this.userForm.controls['userpassword'].updateValueAndValidity();
            var data = this._UserService.GetUserById(this.Param_ID).subscribe(
                Param => {
                    this.isReadOnly=true;
                   // console.log(Param.result);
                    this.ParamForms.userid = Param.result[0].userid;
                    this.ParamForms.userloginid = Param.result[0].userloginid;
                    this.ParamForms.firstname=Param.result[0].firstname;
                    this.ParamForms.lastname=Param.result[0].lastname;
                    this.ParamForms.emailid=Param.result[0].emailid;
                    this.ParamForms.stateid=Param.result[0].stateid;
                    this.ParamForms.districtid=Param.result[0].districtid;
                    this.ParamForms.blockid=Param.result[0].blockid;
                    this.ParamForms.roleid = Param.result[0].roleid;
                    //this.ParamForms.tToken="";
                    this.ParamForms.phoneno=Param.result[0].phoneno
                    this.ParamForms.deptid = Param.result[0].deptid;
                    this.ParamForms.userpassword=Param.result[0].userpassword;
                    this.ParamForms.isactive = Param.result[0].isactive;
                },
                error => this.errorMessage = <any>error
            );
        }
    }

    onSearchChange(searchValue: string)
    {
      console.log(''+this.ParamForms.userpassword);
      var passwordAr=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      if(this.ParamForms.userpassword.match(passwordAr)) 
      { 
        //console.log('Paasword length ok');
      }
      else{
//console.log('Pasword length week');
      }
    }
    Save() {
      //  console.log('for edit');
        this.isLoading=true;


        if (this.userForm.valid || this.ParamForms.userid!=null  ) {
            if (this.ParamForms.isactive.toString()=="true" || this.ParamForms.isactive==1)
                this.ParamForms.isactive=1;
            else
                this.ParamForms.isactive=0;
            if (this.ParamForms.userid == 0) {
                   // console.log('Block id'+this.ParamForms.blockid);
                this.ParamForms.createdby=this.loginService.getSelectedUser().userid;  
                this._UserService.AddUser(this.ParamForms).subscribe(
                    response => {
                        this.output = response;
                        if (this.output.status == 409) {
                            let config = new MatSnackBarConfig();
                            config.duration = this.setAutoHide ? this.autoHide : 0;
                            config.verticalPosition = this.verticalPosition;
                            this.snackBar.open("User Name Already Exists", this.action ? this.actionButtonLabel : undefined, config);

                        }
                        else if (this.output.status == 200) {
                            let config = new MatSnackBarConfig();
                            config.duration = this.setAutoHide ? this.autoHide : 0;
                            config.verticalPosition = this.verticalPosition;
                            this.snackBar.open("Saved User Successfully", this.action ? this.actionButtonLabel : undefined, config);
                            this._Route.navigate(['/Userlist']);
                        }
                        else if (this.output.status == 901){
                            this.showSnowBar(this.output.message);
                            this.loginService.LogoutUser();
                            this.actionbarHelper.openPage('/login', true);
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
                this._UserService.UpdateUser(this.ParamForms)
                    .subscribe(response => {
                        if (response.status == 200) {
                            alert('User Updated Successfully');
                            this._Route.navigate(['/Userlist']);
                        }
                    })
            }
        }
        this.isLoading=false;
    }
    public errorHandling = (control: string, error: string) => {
        return this.userForm.controls[control].hasError(error);
    }
    getDistrict(eventId)
    {
        //console.log("StateId"+eventId);
        return this._UserService.getDitrictListActive(eventId).subscribe(
            AllParam => {
              console.log(AllParam.result);
              this.districtArr = AllParam.result;
            },
            error => this.errorMessage = <any>error
          );
    }
    getBlocks(eventId)
    {
        //console.log("DistrictId"+eventId);
        return this._UserService.getBlockActive(eventId).subscribe(
            AllParam => {
              //console.log(AllParam.result);
              this.blockArr = AllParam.result;
              //console.log('JSON DATA'+JSON.stringify(this.blockArr))
            },
            error => this.errorMessage = <any>error
          );
    }
    
    showSnowBar(message)
{
  let config = new MatSnackBarConfig();
  config.verticalPosition = this.verticalPosition;
  config.duration=10000;
 
    //alert('Data Saved Successfully');
    this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
}

}