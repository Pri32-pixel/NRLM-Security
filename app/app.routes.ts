import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { GrivanceStatusListComponent } from './masters/grievancestatus/grivancestatuslist.component';
import { GrivanceStatusComponent } from './masters/grievancestatus/grivancestatus.component';
import { GrivanceTypeListComponent } from './masters/grievancetype/grivancetypelist.component';
import { GrivanceTypeComponent } from './masters/grievancetype/grivancetype.component';
import { GrivancePriorityListComponent } from './masters/grievancepriority/grivanceprioritylist.component';
import { GrivancePriorityComponent } from './masters/grievancepriority/grivancepriority.component';
import { GrievanceComponent } from './grievance/grievance.component';
import { GrivanceListComponent } from './grievance/grivancelist.component';
import { GrivanceListAssignedComponent } from './grievance/grivancelistassigned.component';
import { GrievanceAssignComponent } from './grievance/grievanceassign.component';
import { GrievanceResponseComponent } from './grievance/grievanceresponse.component';
import { GrivanceDetailReportComponent } from './reports/grivancedetailreport.component';
import { DistrictListComponent } from './masters/district/districtlist.component';
import { StateListComponent } from './masters/state/statelist.component';
import { DistrictComponent } from './masters/district/district.component';
import { StateComponent } from './masters/state/state.component';
import { EventTypeComponent } from '@src/app/masters/EventType/eventtype.component';
import { EventTypeListComponent } from '@src/app/masters/EventType/eventtypelist.component';

import {FileTypeComponent } from '@src/app/masters/FileType/filetype.component';
import { FileTypeListComponent } from '@src/app/masters/FileType/filetypelist.component';

import {KMVerticalComponent } from '@src/app/masters/KMVertical/kmvertical.component';
import { KMVerticalListComponent } from '@src/app/masters/KMVertical/kmverticallist.component';

import {KmsubverticalComponent } from '@src/app/masters/kmsubvertical/kmsubvertical.component';
import { KmsubverticallistComponent } from '@src/app/masters/kmsubvertical/kmsubverticallist.component';

import {LanguageComponent } from '@src/app/masters/Language/language.component';
import { LanguageListComponent } from '@src/app/masters/Language/languagelist.component';
import { DocSourceListComponent } from './masters/docsource/docsourcelist.component';
import { DocSourceComponent } from './masters/docsource/docsource.component';

import { DocCategoryListComponent } from './masters/doccategory/doccategorylist.component';
import { DocCategoryComponent } from './masters/doccategory/doccategory.component';


import { RoleListComponent } from './masters/role/rolelist.component';
import { RoleComponent } from './masters/role/role.component';


 import { UserListComponent } from './masters/usercreation/userlist.component';
 import { UserCreationComponent } from './masters/usercreation/usercreation.component';
import { PostdocComponent } from '@src/app/postdocument/postdoc.component';
import { SearchdocComponent } from '@src/app/postdocument/searchdoc.component';
import { PublishdocComponent } from '@src/app/postdocument/publishdoc.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { AddEventComponent } from '@src/app/Event/add-event/add-event.component';
import {ViewEventComponent } from '@src/app/Event/view-event/view-event.component';
import { RatingdocComponent } from '@src/app/postdocument/ratingdoc.component'; 
import { ViewdocComponent } from '@src/app/postdocument/viewdoc.component';
export const routes: Routes = [

    // no layout routes
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent
    },
   
    
    
    // App routes goes here here (system admin)
    {
        path: '',
        component: HomeLayoutComponent,
        children: [
          { path: 'dashboard', component: HomeComponent, },
          { path: 'GrievanceStatuslist', component: GrivanceStatusListComponent },
          { path: 'GrievanceStatusAdd', component: GrivanceStatusComponent },
          { path: 'GrievanceStatusEdit/:Param_ID', component: GrivanceStatusComponent },
          { path: 'GrievanceTypelist', component: GrivanceTypeListComponent },
          { path: 'GrievanceTypeAdd', component: GrivanceTypeComponent },
          { path: 'GrievanceTypeEdit/:Param_ID', component: GrivanceTypeComponent },

          { path: 'GrievancePrioritylist', component: GrivancePriorityListComponent },
          { path: 'GrievancePriorityAdd', component: GrivancePriorityComponent },
          { path: 'GrievancePriorityEdit/:Param_ID', component: GrivancePriorityComponent },

          { path: 'Districtlist', component: DistrictListComponent },
          { path: 'DistrictAdd', component: DistrictComponent },
          { path: 'DistrictEdit/:Param_ID', component: DistrictComponent },
          { path: 'Statelist', component: StateListComponent },
          { path: 'StateAdd', component: StateComponent },
          { path: 'StateEdit/:Param_ID', component: StateComponent },

          { path: 'RoleEdit/:Param_ID', component: RoleComponent },
          { path: 'Rolelist', component: RoleListComponent },
          { path: 'RoleAdd', component: RoleComponent },

           { path: 'UserEdit/:Param_ID', component: UserCreationComponent },
           { path: 'Userlist', component: UserListComponent },
           { path: 'UserAdd', component: UserCreationComponent },

          { path: 'DocSourcelist', component: DocSourceListComponent },
          { path: 'DocSourceAdd', component: DocSourceComponent },
          { path: 'DocSourceEdit/:Param_ID', component: DocSourceComponent },

          { path: 'DocCategorylist', component: DocCategoryListComponent },
          { path: 'DocCategoryAdd', component: DocCategoryComponent },
          { path: 'DocCategoryEdit/:Param_ID', component: DocCategoryComponent },

          { path: 'EventTypelist', component: EventTypeListComponent },
          { path: 'EventTypeAdd', component: EventTypeComponent },
          { path: 'EventTypeEdit/:Param_ID', component: EventTypeComponent },

          { path: 'FileTypelist', component: FileTypeListComponent },
          { path: 'FileTypeAdd', component: FileTypeComponent },
          { path: 'FileTypeEdit/:Param_ID', component: FileTypeComponent },

          { path: 'KMVerticallist', component: KMVerticalListComponent },
          { path: 'KMVerticalAdd', component: KMVerticalComponent },
          { path: 'KMVerticalEdit/:Param_ID', component: KMVerticalComponent },

          { path: 'KMSubVerticallist', component: KmsubverticallistComponent },
          { path: 'KMSubVerticalAdd', component: KmsubverticalComponent },
          { path: 'KMSubVerticalEdit/:Param_ID', component: KmsubverticalComponent },

          { path: 'Languagelist', component: LanguageListComponent },
          { path: 'LanguageAdd', component: LanguageComponent },
          { path: 'LanguageEdit/:Param_ID', component: LanguageComponent },



          { path: 'PostDocAdd', component: PostdocComponent },
          { path: 'SearchDoc', component: SearchdocComponent },
          { path: 'ViewDoc/:Param_ID', component: ViewdocComponent },
          { path: 'PublishDoc', component: PublishdocComponent },
        
          { path: 'AddEvent', component: AddEventComponent },
          { path: 'ViewEvent', component: ViewEventComponent },
          { path: 'GrievanceAdd', component: GrievanceComponent },
          { path: 'GrievanceList', component: GrivanceListComponent },
          { path: 'GrievanceListAllAssigned/:Param_ID', component: GrivanceListComponent },
          { path: 'GrievanceListAssigned/:id1/:id2', component: GrivanceListAssignedComponent },
          { path: 'GrievanceListCompleted/:id1/:id2', component: GrivanceListAssignedComponent },
          { path: 'GrievanceAssign/:Param_ID', component: GrievanceAssignComponent  },
          { path: 'GrievanceResponse/:Param_ID', component: GrievanceResponseComponent  },
          { path: 'GrievanceDetailReport', component: GrivanceDetailReportComponent  },
          { path: 'ChangePassword', component: ChangePasswordComponent },
          { path: 'ResetPassword', component: ResetPasswordComponent },
          { path: 'ChangePassword1', component: RatingdocComponent }
        ]
    },
];
