import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UtilityHelper } from '@src/app/shared/services/utility-service';
import { PostDocModel } from "@src/app/shared/models/PostDoc.model";
import { DocSourceModel } from '@src/app/shared/models/DocSource.model';
import { DocSourceService } from '@src/app/shared/services/docsource-service';
import { DocCategoryModel } from '@src/app/shared/models/DocCategory.model';
import { DocCategoryService } from '@src/app/shared/services/doccategory-service';
import { GrievanceService } from '@src/app/shared/services/grievance-service';
import { LoginService } from '@src/app/shared/services/login-service';
import { StarRatingColor } from '@src/app/star-rating/star-rating/star-rating.component';
import { RatingdocComponent } from '@src/app/postdocument/ratingdoc.component'; 
import { MatSidenav, MatDialog } from '@angular/material';

@Component({
  
  templateUrl: './viewdoc.html',
  styleUrls: ['./viewdoc.css']
})
export class ViewdocComponent implements OnInit {
  viewdocForm: FormGroup;
  private _ParamService;
  private Param_ID: string;
  errorMessage: any;
  EventName1: String []=[];
  tempList=[];
  list = [];
  isLoadingCount = false;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;
  constructor(private _Route: Router,private actionbarHelper: UtilityHelper,private _routeParams: ActivatedRoute,public snackBar: MatSnackBar,private docSourceService: DocSourceService,
    private docCategoryService: DocCategoryService,  
    private grievanceService: GrievanceService, 
    
    public dialog: MatDialog,
    public loginService: LoginService,  
    private formBuilder: FormBuilder) {
      this._ParamService=grievanceService;
      
     }

  ngOnInit() {
    
    
    
    this.viewdocForm = this.formBuilder.group({
      tFileName: [""],
      nSourceId: [""],
      nCrossPublication:  [""],
      nLanguageId: [""],
      nMaterialVertical: [""],
      nFileType:  [""],
      nCategory: [""],
      tApproverName: [""],
      tApproverDesig:  [""],
      tTag:  [""],
    });

    this.showData();
    
  }
 
  showData() {
    this.Param_ID = this._routeParams.snapshot.params['Param_ID'];
    if (this.Param_ID != null) {
        var data = this._ParamService.getAllMaterialById(this.Param_ID).subscribe(
            Param => {
                console.log(Param.result);
                this.list=Param.result;
                this.tempList=this.list.slice(0,1);
            },
            error => this.errorMessage = <any>error
        );
    }
}
  
openFile(filePath,mkid)
  {
    //alert('Mkid'+mkid);
    this._ParamService.downloadFile(filePath,mkid).subscribe(response => {

      console.log(response);
      var binaryData = [];
      binaryData.push(response.data);
      var url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/pdf"}));
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.setAttribute('target', '_blank');
      a.href = url;
      a.download = response.filename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();

  }, error => {

      console.log(error);
  });

  }
  
  public errorHandling = (control: string, error: string) => {
    return this.viewdocForm.controls[control].hasError(error);
}

getReviewAndComment() {
  return this._ParamService.GetReviewAndComment(this.Param_ID).subscribe(data => {
   // console.log(data);
    this.isLoadingCount=true;
    this.EventName1 = data.result;
    
  },
    error => this.errorMessage = <any>error
  );
}

}
