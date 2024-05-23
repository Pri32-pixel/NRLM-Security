import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilityHelper {

    constructor(
      private router: Router,
      private toastr: ToastrService,
      private _location: Location
      ) {
    }

    public hideActionbar() {
    }

    public openDrawer(): void {
    }

    public closeDrawer(): void {
    }

    openPage(navItemRoute: string, clearHistory: boolean): void {
      this.router.navigate([navItemRoute], { replaceUrl: clearHistory });
    }

    async delay(ms: number) {
      await new Promise<void>(resolve => setTimeout(() => resolve(), ms)).then(() =>
        console.log('fired')
      );
    }

    successMessage(message: string) {
      this.toastr.success(message, 'Grievance', {positionClass: 'toast-top-center'});
    }
    tesCall()
    {
      console.log('Call Utli');
    }

    errorMessage(message: string) {
      
      this.toastr.error(message, 'Grievance', {positionClass: 'toast-top-center', enableHtml: true});
    }

    infoMessage(message: string) {
      
      this.toastr.info(message, 'Grievance', {positionClass: 'toast-top-center'});
    }

    goBack() {
      this._location.back();
    }

  }
