import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBarConfig,MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { LoginService } from '@src/app/shared/services/login-service';
import { UserModel } from "@src/app/shared/models/user.model";
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  usernameFormControl = new FormControl(null, [Validators.required]);
  passwordFormControl = new FormControl(null, [Validators.required]);
  captchaFormControl = new FormControl(null, [Validators.required]);
  isLoggingIn = false;
  processing = false;
  username: string;
  password: string;
  captchacode:string;
  token: any;
  user: UserModel;
  un: any;
  dp: any;
  isLoggedin: any = false;
  private _loginservice;
  UserModel: UserModel = new UserModel();
  btnstate: boolean=false;

    actionButtonLabel: string = 'Retry';
    action: boolean = false;
    setAutoHide: boolean = true;
    autoHide: number = 2000;
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  constructor(
    private actionbarHelper: UtilityHelper,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _routeParams: ActivatedRoute,
    public dialog: MatDialog,
    loginservice: LoginService
  ) {

    this.username = this._routeParams.snapshot.queryParamMap.get('id');
      this.token =this._routeParams.snapshot.queryParamMap.get('token');
        // this.username = "admin";
        // this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwibmJmIjoxNjE3NDg1NzUzLCJleHAiOjE2MTc0ODYwNTMsImlhdCI6MTYxNzQ4NTc1M30.70l1-BrVpqZVOzOjlWroWcvgRKTvcYKOOcHqU_C8-XU";

        this._loginservice = loginservice;
        //this.user.tUserLoginId=this.username;
        //this.user.

        this.user=new UserModel();



    
    this.loginForm = new FormGroup({
      usernameFormControl: this.usernameFormControl,
      passwordFormControl: this.passwordFormControl,
      captchaFormControl: this.captchaFormControl
    });

  }

  ngOnInit() {

    if (this.username!=null)
        {
          this.GetUserDetails();
        }
        this.generateCaptcha(); 
    

  }
  generateCaptcha()
  {
    var captcha = document.getElementById("image");
    var uniquechar = "";
 
    const randomchar =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
    // Generate captcha for length of
    // 5 with random character
    for (let i = 1; i <=6; i++) {
        uniquechar += randomchar.charAt(
            Math.random() * randomchar.length)
    }
 
    // Store generated input
    captcha.innerHTML = uniquechar;
  }

  public errorHandling = (control: string, error: string) => {
    return this.loginForm.controls[control].hasError(error);
  }
  login() {
   
    var inncaptcha = document.getElementById("image").innerHTML;
    let config = new MatSnackBarConfig();
              config.duration = this.setAutoHide ? this.autoHide : 0;
              config.verticalPosition = this.verticalPosition;
              
    
               if(this.UserModel.tUserLoginId=="" || this.UserModel.tUserPassword=="" || this.UserModel.tUserLoginId==null || this.UserModel.tUserPassword==null)
    {
      this._snackBar.open('Please enter User id and password', this.action ? this.actionButtonLabel : undefined, config); 
    
    }
    else if(this.UserModel.captchacode!=inncaptcha)
    {
      this._snackBar.open('Please enter valid captcha code', this.action ? this.actionButtonLabel : undefined, config); 
    }
    
    else{

      this.btnstate = true;
      var text =this.UserModel.tUserPassword;
var secret = "René Über";
var encrypted = CryptoJS.AES.encrypt(this.UserModel.tUserPassword, secret);
encrypted = encrypted.toString();
//console.log("Cipher textDushyant: " + encrypted);
    
        this.UserModel.tUserPassword=encrypted;
       // console.log('Encr'+this.UserModel.tUserPassword);
    //this.actionbarHelper.openPage('/dashboard', true);
    this._loginservice.validateLoginUser(this.UserModel).subscribe(
      response => 
      {    
            
        if (response.result!= null) 
        {

        
          if (response.result.roleid == 1) 
          {
              
            
              this._snackBar.open("Invalid Username and Password", this.action ? this.actionButtonLabel : undefined, config);
        
              this.router.navigate(['login']);
          }

          else if (response.result.roleid == 3) 
          {
       
              let config = new MatSnackBarConfig();
              config.duration = this.setAutoHide ? this.autoHide : 0;
              config.verticalPosition = this.verticalPosition;
            
              this._snackBar.open("Logged in Successfully", this.action ? this.actionButtonLabel : undefined, config);

              //this.router.navigate(['/Admin/Dashboard']);
              this.router.navigate(['/dashboard']);
          }
          else if (response.result.roleid == 6) 
          {
        
            let config = new MatSnackBarConfig();
            config.duration = this.setAutoHide ? this.autoHide : 0;
            config.verticalPosition = this.verticalPosition;
          
            this._snackBar.open("Logged in Successfully", this.action ? this.actionButtonLabel : undefined, config);

            //this.router.navigate(['/Admin/Dashboard']);
            this.router.navigate(['/dashboard']);
          }
          else if (response.result.roleid == 8 ) 
          {
        
            let config = new MatSnackBarConfig();
            config.duration = this.setAutoHide ? this.autoHide : 0;
            config.verticalPosition = this.verticalPosition;
          
            this._snackBar.open("Logged in Successfully", this.action ? this.actionButtonLabel : undefined, config);

            //this.router.navigate(['/Admin/Dashboard']);
            this.router.navigate(['/dashboard']);
          }
          else
          {
        
            //this._snackBar.open(response.message, this.action ? this.actionButtonLabel : undefined, config);
            let config = new MatSnackBarConfig();
            config.duration = this.setAutoHide ? this.autoHide : 0;
            config.verticalPosition = this.verticalPosition;
          
            this._snackBar.open("Logged in Successfully", this.action ? this.actionButtonLabel : undefined, config);

            //this.router.navigate(['/Admin/Dashboard']);
            this.router.navigate(['/dashboard']);
          }
      }
      else
      {
        this.btnstate = false;
        //alert('pass'+text);
        this.UserModel.tUserPassword=text;
        this._snackBar.open(response.message, this.action ? this.actionButtonLabel : undefined, config);
      }
    
    });
  }
      
  }

  openForgotPassword() {
    
  }

  GetUserDetails() {

    //this.actionbarHelper.openPage('/dashboard', true);
    this.user.userloginid=this.username;
    this.user.tToken=this.token;
    this._loginservice.GetUserDetails(this.user).subscribe(
      response => {
        if (response.ReturnCode == 200) {
          this.router.navigate(['/dashboard']);
        }
        else {
          this.router.navigate(['login']);
          //this.user = this._loginservice.getSelectedUser();
        }
      });
  }

}

