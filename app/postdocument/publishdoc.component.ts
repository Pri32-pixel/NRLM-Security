import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { PostDocModel } from "@src/app/shared/models/PostDoc.model";
@Component({
  
  templateUrl: './publishdoc.html',
  styleUrls: ['./publishdoc.css']
})
export class PublishdocComponent implements OnInit {
  publishdocForm: FormGroup;
  title = "Grievance Add";
  ParamForms: PostDocModel = new PostDocModel();
  private _ParamService;
  private responsedata: any;
  errorMessage: any;
  actionButtonLabel: string = 'Retry';
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  theFile: any = null;

  ParamType1: any = [
    {nSourceId: 1, tSourceType: 'Source Type 1'},
  {nSourceId: 0, tSourceType: 'Source Type 2'}];
  ParamType2: any =  [
    {nCrossPublication: 1, tCrossPublication: 'Yes'},
  {nCrossPublication: 0, tCrossPublication: 'No'}];
  ParamType3: any = [
    {nLanguageId: 1, tLanguage: 'Hindi'},
  {nLanguageId: 0, tLanguage: 'English'}];
  ParamType4: any = [
    {nMaterialVertical: 1, tMaterialVertical: 'Option1'},
  {nMaterialVertical: 0, tMaterialVertical: 'Option2'}];
  ParamType5: any =  [
    {nFileType: 1, tFileType: 'PDF'},
  {nFileType: 0, tFileType: 'JPG'}];
  ParamType6: any = [
    {nCategory: 1, tCategory: 'Category1'},
  {nCategory: 0, tCategory: 'Category2'}];
  constructor(private _Route: Router,private actionbarHelper: UtilityHelper,public snackBar: MatSnackBar,
     
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.publishdocForm = this.formBuilder.group({
      tFileName: ["", [Validators.required]],
      nSourceId: ["", [Validators.required]],
      nCrossPublication:  ["", [Validators.required]],

      nLanguageId: ["", [Validators.required]],
      nMaterialVertical: ["", [Validators.required]],
      nFileType:  ["", [Validators.required]],

      nCategory: ["", [Validators.required]],
      tApproverName: ["", [Validators.required]],
      tApproverDesig:  ["", [Validators.required]],
      tTag:  ["", [Validators.required]],
    });
   
  }
  public errorHandling = (control: string, error: string) => {
    return this.publishdocForm.controls[control].hasError(error);
}
}
