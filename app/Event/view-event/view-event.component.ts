import { Component, OnInit } from '@angular/core';
import {  ViewEventModel } from '@src/app/shared/models/Event.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '@src/app/shared/services/user-service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoginService } from '@src/app/shared/services/login-service';
import { ThemePalette } from '@angular/material/core';
import { GrievanceService } from '@src/app/shared/services/grievance-service';
import * as moment from 'moment';
import { UrlAdaptor, DataManager, } from '@syncfusion/ej2-data'; 
import { Location } from '@angular/common';
import {  
  DayService,  
  WeekService,  
  WorkWeekService,  
  MonthService,  
  AgendaService,  
  EventSettingsModel, 
  ActionEventArgs, 
  View  
} from '@syncfusion/ej2-angular-schedule';  
@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {
  vieweventForm: FormGroup;
  
  public selecteddatavalue: Date = new Date();
    public currentviewdata: View = 'Month';  
    AllParamList: ViewEventModel[];
    private _ParamService;
    errorMessage: any;
    public data: object[] = [];  
    

  //   public eventSettings: EventSettingsModel = {  
  //     dataSource: this.data,  
  //     fields: {  
  //         id: 'id',  
  //         subject: {  
  //             name: 'eventName'  
  //         },  
  //         isAllDay: {  
  //             name: 'isAllDay'  
  //         },  
  //         startTime: {  
  //             name: 'startTime'  
  //         },  
  //         endTime: {  
  //             name: 'endTime'  
  //         },  
  //     }  
  // }; 
  //public eventSettings :EventSettingsModel;
  public eventSettings: EventSettingsModel = { allowAdding: false, 
    allowEditing: false, 
    allowDeleting: false, dataSource: this.data };
  constructor(private grievanceService: GrievanceService,private loginService: LoginService,private location: Location) {

    this._ParamService=grievanceService 
    this._ParamService.GetUpcomingEvent(this.loginService.getSelectedUser().userid).subscribe(
      AllParam => {
        console.log(AllParam.result);
        //this.data[0]=AllParam.result[0];
        for(let i=0; i<AllParam.result.length; i++){
          this.data[i]=AllParam.result[i];
          console.log(this.data[i]); //use i instead of 0
        }
        //console.log(this.data[0])
      },
      error => this.errorMessage = <any>error
    );
    this.eventSettings = { allowAdding: false, 
      allowEditing: false, 
      allowDeleting: false, 
       dataSource: this.data,  
      fields: {  
          id: 't_eventid',  
          subject: {  
              name: 'event_name'  
          }, 
          description: {
            name: 'event_venue'
          },
  
          isAllDay: {  
              name: 'false'  
          },  
          startTime: {  
              name: 'event_start_date_time'  
          },  
          endTime: {  
              name: 'event_end_date_time'
          },  
      } ,
      
    }; 
  }

  ngOnInit() {

    

     
    
  }
  public onActionComplete(args: ActionEventArgs) {
  }

}
