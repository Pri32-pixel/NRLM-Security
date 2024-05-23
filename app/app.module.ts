import 'hammerjs';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { LoginComponent } from '@src/app/login/login.component';
import { HomeLayoutComponent } from '@src/app/layouts/home-layout.component';
import { CustomMaterialModule } from '@src/app/material.module';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AutoFocusDirective } from '@src/app/directives/auto-focus.directive';
import { SummaryCardComponent } from '@src/app/home/summary-card/summary-card.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SummaryGraphComponent } from '@src/app/home/summary-graph/summary-graph.component';
import { ConfirmDialogComponent } from '@src/app/confirm-dialog/confirm-dialog.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { GrievanceService } from '@src/app/shared/services/grievance-service';
import { GrievanceStatusService } from '@src/app/shared/services/grivancestatus-service';
import { GrievanceTypeService } from '@src/app/shared/services/grivancetype-service';
import { GrievancePriorityService } from '@src/app/shared/services/grievancepriority-service';
import { LoginService } from '@src/app/shared/services/login-service';
import { GrivanceStatusListComponent } from '@src/app/masters/grievancestatus/grivancestatuslist.component';
import { GrivanceStatusComponent } from '@src/app/masters/grievancestatus/grivancestatus.component';
import { GrivanceTypeListComponent } from '@src/app/masters/grievancetype/grivancetypelist.component';
import { GrivanceTypeComponent } from '@src/app/masters/grievancetype/grivancetype.component';
import { GrivancePriorityListComponent } from '@src/app/masters/grievancepriority/grivanceprioritylist.component';
import { GrivancePriorityComponent } from '@src/app/masters/grievancepriority/grivancepriority.component';
import { GrievanceComponent } from '@src/app/grievance/grievance.component';
import { GrivanceListComponent } from '@src/app/grievance/grivancelist.component';
import { GrivanceListAssignedComponent } from '@src/app/grievance/grivancelistassigned.component';
import { GrievanceAssignComponent } from '@src/app/grievance/grievanceassign.component';
import { GrievanceResponseComponent } from '@src/app/grievance/grievanceresponse.component';
import { GrivanceDetailReportComponent } from '@src/app/reports/grivancedetailreport.component';
import { DistrictListComponent } from '@src/app/masters/district/districtlist.component';
import { StateListComponent } from '@src/app/masters/state/statelist.component';
import { DistrictComponent } from '@src/app/masters/district/district.component';
import { StateComponent } from '@src/app/masters/state/state.component';
import { RoleListComponent } from '@src/app/masters/role/rolelist.component';
import { RoleComponent } from '@src/app/masters/role/role.component';
import { ChangePasswordComponent } from '@src/app/login/change-password/change-password.component';
import { ResetPasswordComponent } from '@src/app/login/reset-password/reset-password.component';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { NumberDirective } from '@src/app/shared/validator/numbers-only.directive';
import { PostdocComponent } from '@src/app/postdocument/postdoc.component';

import { SearchdocComponent } from '@src/app/postdocument/searchdoc.component';
import { ViewdocComponent } from '@src/app/postdocument/viewdoc.component';
import { PublishdocComponent } from '@src/app/postdocument/publishdoc.component';

 import { UserListComponent } from '@src/app/masters/usercreation/userlist.component';
 import { UserCreationComponent } from '@src/app/masters/usercreation/usercreation.component';

import { DocSourceListComponent } from '@src/app/masters/docsource/docsourcelist.component';
import { DocSourceComponent } from '@src/app/masters/docsource/docsource.component';
import { DocSourceService } from '@src/app/shared/services/docsource-service';

import { DocCategoryListComponent } from '@src/app/masters/doccategory/doccategorylist.component';
import { DocCategoryComponent } from '@src/app/masters/doccategory/doccategory.component';
import { EventTypeComponent } from '@src/app/masters/EventType/eventtype.component';
import { EventTypeListComponent } from '@src/app/masters/EventType/eventtypelist.component';
import {FileTypeComponent } from '@src/app/masters/FileType/filetype.component';
import { FileTypeListComponent } from '@src/app/masters/FileType/filetypelist.component';

import {KMVerticalComponent } from '@src/app/masters/KMVertical/kmvertical.component';
import { KMVerticalListComponent } from '@src/app/masters/KMVertical/kmverticallist.component';

import {LanguageComponent } from '@src/app/masters/Language/language.component';
import { LanguageListComponent } from '@src/app/masters/Language/languagelist.component';
import {MAT_SNACK_BAR_DATA} from '@angular/material';
import { DocCategoryService } from '@src/app/shared/services/doccategory-service';
import { AddEventComponent } from '@src/app/Event/add-event/add-event.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule,NgxMatNativeDateModule, } from '@angular-material-components/datetime-picker';
import {  
  ScheduleModule  
} from '@syncfusion/ej2-angular-schedule';
import {  
  DayService,  
  WeekService,  
  WorkWeekService,  
  MonthService,  
  AgendaService  
} from '@syncfusion/ej2-angular-schedule';  
import { ViewEventComponent } from '@src/app/Event/view-event/view-event.component';
import { StarRatingComponent,StarRatingColor } from '@src/app/star-rating/star-rating/star-rating.component';
import { RatingdocComponent } from '@src/app/postdocument/ratingdoc.component';
import { ListCardComponent } from '@src/app/home/list-card/list-card.component';
import { KmsubverticalComponent } from '@src/app/masters/kmsubvertical/kmsubvertical.component';
import { KmsubverticallistComponent } from '@src/app/masters/kmsubvertical/kmsubverticallist.component';  

@NgModule({
  declarations: [
    AppComponent,    
    HomeComponent,
    LoginComponent,
    AutoFocusDirective,
    HomeLayoutComponent,
    SummaryCardComponent,
    SummaryGraphComponent,
    ConfirmDialogComponent,
    GrivanceStatusListComponent,
    GrivanceStatusComponent,
    GrivanceTypeListComponent,
    GrivanceTypeComponent,
    GrivancePriorityListComponent,
    GrivancePriorityComponent,
    GrievanceComponent,
    GrivanceListComponent,
    GrivanceListAssignedComponent,
    GrievanceAssignComponent,
    GrievanceResponseComponent,
    GrivanceDetailReportComponent,
    DistrictListComponent,
    StateListComponent,
    DistrictComponent,
    StateComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    NumberDirective,
    PostdocComponent,
    RoleListComponent,
    RoleComponent,
     UserListComponent,
     UserCreationComponent,
    SearchdocComponent,
    PublishdocComponent,
    DocSourceListComponent,
    DocSourceComponent,
    DocCategoryListComponent,
    DocCategoryComponent,
    AddEventComponent,
    ViewEventComponent,
    StarRatingComponent,
    RatingdocComponent,
    ViewdocComponent,
    EventTypeComponent,
    EventTypeListComponent,
    FileTypeComponent,
    FileTypeListComponent,
    KMVerticalComponent,
    KMVerticalListComponent,
    LanguageComponent,
    LanguageListComponent,
    ListCardComponent,
    KmsubverticalComponent,
    KmsubverticallistComponent,
    
    
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
   
    BrowserAnimationsModule,
    AppRoutingModule,
    CustomMaterialModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgxChartsModule,
    NgxSkeletonLoaderModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    PdfViewerModule,
    AngularEditorModule,
    ScheduleModule,
    
  ],
  providers: [
    UtilityHelper,GrievanceService,GrievanceStatusService,GrievanceTypeService,GrievancePriorityService,LoginService,ThemeService,
    DayService, WeekService, WorkWeekService, MonthService, AgendaService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_SNACK_BAR_DATA, useValue: {duration: 2500} }
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
