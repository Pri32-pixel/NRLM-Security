import { Component, OnInit } from '@angular/core';
import {  AddEventModel } from '@src/app/shared/models/Event.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '@src/app/shared/services/user-service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoginService } from '@src/app/shared/services/login-service';
import { GrievanceService } from '@src/app/shared/services/grievance-service';
import { DocCategoryService } from '@src/app/shared/services/doccategory-service';
import { ThemePalette } from '@angular/material/core';
import * as moment from 'moment';
import { formatDate } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
//import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  select: MatSelect;
  addeventForm: FormGroup;
  title = "Event Add";
  ParamForms: AddEventModel = new AddEventModel();
  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  private _ParamService;
  private _DocSourceService;
  private _DocCategoryService;
  private responsedata: any;
  allSelected=false;
  tempArr :any;
  errorMessage: any;
  actionButtonLabel: string = 'Retry';
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  theFile: any = null;
  private Param_ID: string;
  output: any;
  private _UserService;
  ParamType1: any =  [
    {neventid: 1, teventtype: 'Type1'},
  {neventid: 0, teventtype: 'Type2'}];

  ParamType3: any = [];
  ParamType2: any =  [
    {nCrossPublication: 1, tCrossPublication: 'Yes'},
  {nCrossPublication: 0, tCrossPublication: 'No'}];


  public options = [
    { value: true, label: 'True' },
    { value: false, label: 'False' }
  ];

  public listColors = ['primary', 'accent', 'warn'];

  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];
  
  termsList: any[];
  originalTerm: any[] = [];
  selectedTerms: any[] = [];
  private SelectedStateId: string;

  constructor(private _Route: Router
    ,private actionbarHelper: UtilityHelper,private docCategoryService: DocCategoryService,
    public snackBar: MatSnackBar,private _routeParams: ActivatedRoute,private loginService: LoginService,
    private userService: UserService, private grievanceService: GrievanceService,
    private formBuilder: FormBuilder) { 
      this._UserService = userService;
      this._DocCategoryService = docCategoryService;
      this._ParamService=grievanceService
        this.GetState();
        this.GetEventType() ;
    }

  ngOnInit() {

    this.addeventForm = this.formBuilder.group({
      eventname: ["", [Validators.required]],
      eventtype: ["", [Validators.required]],
      eventshortdescription: [""],
      intendedaudience: [""],
      eventvenue: [""],
      eventstartdt:  ["", [Validators.required]],
      eventenddt: ["", [Validators.required]],
      eventstarttime: [""],
      eventendtime: [""],
      stateid: ["", [Validators.required]],
      nCrossPublication:  ["", [Validators.required]],
    });

    
  }
  // getValues(event: {
  //   isUserInput: any;
  //   source: { value: any; selected: any };
  // }) {
  //   if (event.isUserInput) {
  //     if (event.source.selected === true) {
  //       console.log(event.source.value)
  //       this.selectedTerms.push(event.source.value);
  //       this.SelectedStateId=event.source.value +","
  //       //alert(event.source.value);
  //     } else {
  //       console.log(event.source.value)
  //       alert(event.source.value);
  //     }
  //   }
  // }
  
//   openSelectComponent(){
    
//     this.ParamForms.statelist=this.addeventForm.get('stateid').value.map(x=>x).join(",");
//     alert(this.ParamForms.statelist);
// }

  GetState() {

    return this._UserService.GetAllState().subscribe(
        AllParam => {
          console.log(AllParam.result);
          this.ParamType3 = AllParam.result;
        },
        error => this.errorMessage = <any>error
      );
}
GetEventType() {

  return this._DocCategoryService.GetAllEventType().subscribe(
    AllParam => {
      console.log(AllParam.result);
      this.ParamType1 = AllParam.result;
    },
    error => this.errorMessage = <any>error
  );
}
Save() {
  if (this.addeventForm.valid) {
      
      if (this.ParamForms.t_eventid == 0) {
        const locale = 'en-US';
          //alert (this.datepipe.transform(this.ParamForms.event_start_date_time ,'yyyy-MM-dd'));
        this.ParamForms.event_start_date_time= formatDate(this.ParamForms.event_start_date_time,'yyyy-MM-dd, hh:mm:ss',locale);
        this.ParamForms.event_end_date_time= formatDate(this.ParamForms.event_end_date_time,'yyyy-MM-dd, hh:mm:ss',locale);
        if (this.ParamForms.is_active.toString()=="true" )
            this.ParamForms.is_active=1;
        else
            this.ParamForms.is_active=0;
          this.ParamForms.createdby=this.loginService.getSelectedUser().userid;  
          
         this.ParamForms.statelist=this.addeventForm.get('stateid').value.map(x=>x).join(",");
          this._ParamService.AddEvent(this.ParamForms).subscribe(
              response => {
                  this.output = response;
                  if (this.output.status == 409) {
                      let config = new MatSnackBarConfig();
                      config.duration = this.setAutoHide ? this.autoHide : 0;
                      config.verticalPosition = this.verticalPosition;
                      this.snackBar.open("Event Already Exists", this.action ? this.actionButtonLabel : undefined, config);

                  }
                  else if (this.output.status == 200) {
                      let config = new MatSnackBarConfig();
                      //config.duration = this.setAutoHide ? this.autoHide : 0;
                      config.verticalPosition = this.verticalPosition;
                      config.duration=5000;
                      this.snackBar.open("Data Saved Successfully ", this.action ? this.actionButtonLabel : undefined, config);
                      //this._Route.navigate(['/DocCategorylist']);
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
                     // this._Route.navigate(['/DocCategorylist']);
                  }
              })
      }
  }
}


public errorHandling = (control: string, error: string) => {
  return this.addeventForm.controls[control].hasError(error);
}
}
