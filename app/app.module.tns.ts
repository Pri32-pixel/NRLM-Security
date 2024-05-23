import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { LoginComponent } from '@src/app/login/login.component';
import { PostdocComponent } from '@src/app/postdocument/postdoc.component';
import { SearchDocComponent } from '@src/app/postdocument/search-doc/search-doc.component';
import { AddEventComponent } from '@src/app/Event/add-event/add-event.component';
import { ViewEventComponent } from '@src/app/Event/view-event/view-event.component';
import { StarRatingComponent } from '@src/app/star-rating/star-rating/star-rating.component';
import { RatingdocComponent } from '@src/app/postdocument/ratingdoc/ratingdoc.component';
import { ListCardComponent } from '@src/app/home/list-card/list-card.component';
import { KmsubverticalComponent } from '@src/app/masters/kmsubvertical/kmsubvertical.component';
import { KmsubverticallistComponent } from '@src/app/masters/kmsubverticallist/kmsubverticallist.component';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PostdocComponent,
    SearchDocComponent,
    AddEventComponent,
    ViewEventComponent,
    StarRatingComponent,
    RatingdocComponent,
    ListCardComponent,
    KmsubverticalComponent,
    KmsubverticallistComponent,
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
