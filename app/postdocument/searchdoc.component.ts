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
import { UserService } from '@src/app/shared/services/user-service';
import { SearchEventModel } from "@src/app/shared/models/Event.model";
@Component({
  
  templateUrl: './searchdoc.html',
  styleUrls: ['./searchdoc.css']
})
export class SearchdocComponent implements OnInit {
  searchdocForm: FormGroup;
  title = "Knowledge Material Search";
  ParamForms: SearchEventModel = new SearchEventModel();
  rating:number = 3;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;


  private snackBarDuration: number = 2000;
  private ratingArr = [];
  private _ParamService;
  private responsedata: any;
  errorMessage: any;
  private _DocSourceService;
  private _DocCategoryService;
  private _loginservice;
  private _UserService;
  private Param_ID: string;
  actionButtonLabel: string = 'Retry';
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  theFile: any = null;
  isShow = false;
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
    {nMaterialVertical: 0, tMaterialVertical: 'FNHW'},
  {nMaterialVertical: 1, tMaterialVertical: 'IBCB'},
  {nMaterialVertical: 2, tMaterialVertical: 'Farm livelihood'},
  {nMaterialVertical: 3, tMaterialVertical: 'Non-Farm'},
  {nMaterialVertical: 4, tMaterialVertical: 'Text document'},
  {nMaterialVertical: 5, tMaterialVertical: 'FI'},
  {nMaterialVertical: 6, tMaterialVertical: 'Others'}];
  ParamType5: any =  [
    {nFileType: 0, tFileType: 'PDF'},
  {nFileType: 1, tFileType: 'PowerPoint presentation'},
  {nFileType: 2, tFileType: 'Word document'},
  {nFileType: 3, tFileType: 'Spreadsheet document'},
  {nFileType: 4, tFileType: 'Text document'},
  {nFileType: 5, tFileType: 'Bitmap file'},
  {nFileType: 6, tFileType: 'Jpeg file'},
  {nFileType: 7, tFileType: 'Video file'},
  {nFileType: 8, tFileType: 'Audio file'}];
  ParamType6: any = [
    {nCategory: 1, tCategory: 'Category1'},
  {nCategory: 0, tCategory: 'Category2'}];
  ParamType7: any = [];
  list = [];
  pageSize=3;
  tempList=[];
  constructor(private _Route: Router,private actionbarHelper: UtilityHelper,public snackBar: MatSnackBar,private docSourceService: DocSourceService,
    private docCategoryService: DocCategoryService,  
    private grievanceService: GrievanceService, 
    public dialog: MatDialog,
    private userService: UserService,
    public loginService: LoginService,  
    private formBuilder: FormBuilder) {
      this._UserService = userService;
      this._DocSourceService = docSourceService;
      this._loginservice = loginService;
      this._ParamService = grievanceService;
      this._DocCategoryService = docCategoryService;
      this.GetDocCategory();
      this.GetDocSource();
      this.GetState();
      this.GetFileType();
      this.GetKMVertical();
      this.GetLanguage();
     }

  ngOnInit() {
    

    


    
    this.isShow = true;
    this.tempList=this.list.slice(0,this.pageSize);
    this.searchdocForm = this.formBuilder.group({
      tFileName: [""],
      nSourceId: [""],
      stateid: [""],
      nCrossPublication:  [""],
      nLanguageId: [""],
      nMaterialVertical: [""],
      nFileType:  [""],
      nCategory: [""],
      tApproverName: [""],
      tApproverDesig:  [""],
      meta_tag:  [""],
      title:  [""],
    });
    
  }
 
  GetDocSource() {

    return this._DocSourceService.GetAllDocSourceActiveList().subscribe(
      AllParam => {
        console.log(AllParam.result);
        this.ParamType1 = AllParam.result;
      },
      error => this.errorMessage = <any>error
    );
  }

  GetDocCategory() {

    return this._DocCategoryService.GetAllDocCategoryActive().subscribe(
      AllParam => {
        console.log(AllParam.result);
        this.ParamType6 = AllParam.result;
      },
      error => this.errorMessage = <any>error
    );
  }

  GetKMVertical() {

    return this._DocCategoryService.GetAllKMVerticalActive().subscribe(
      AllParam => {
        console.log(AllParam.result);
        this.ParamType4 = AllParam.result;
      },
      error => this.errorMessage = <any>error
    );
  }
  GetFileType() {

    return this._DocCategoryService.GetAllFileTypeActive().subscribe(
      AllParam => {
        console.log(AllParam.result);
        this.ParamType5 = AllParam.result;
      },
      error => this.errorMessage = <any>error
    );
  }
  GetLanguage() {

    return this._DocCategoryService.GetAllLanguageActive().subscribe(
      AllParam => {
        console.log(AllParam.result);
        this.ParamType3 = AllParam.result;
      },
      error => this.errorMessage = <any>error
    );
  }
  
  GetState() {

    return this._UserService.GetAllStateActive().subscribe(
        AllParam => {
          console.log(AllParam.result);
          this.ParamType7 = AllParam.result;
        },
        error => this.errorMessage = <any>error
      );
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
  showData(){
    this.isShow = false;
    this.GetAllKnowledgeMaterial();
  }
  ClearData(){


    let currentUrl = this._Route.url;
    this._Route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this._Route.navigate(['/SearchDoc']);
    });


   

    //this._Route.navigate(['/SearchDoc']);
              // this.searchdocForm.get('nCategory').reset();
              // this.searchdocForm.get('nSourceId').reset();
              // this.searchdocForm.get('stateid').reset();
              
              // this.searchdocForm.get('meta_tag').setValue('');
              // this.searchdocForm.get('title').setValue('');
              // this.searchdocForm.get('nFileType').reset();
              // this.searchdocForm.get('nLanguageId').reset();
            //   this.searchdocForm.reset();

            //   for (let name in this.searchdocForm.controls) {
            //     this.searchdocForm.controls[name].setErrors(null);
            //  }
            //  this.searchdocForm.markAsPristine();
            //  this.searchdocForm.markAsUntouched();
  }
  GetAllKnowledgeMaterial()
  {
    this.ParamForms.user_id=this.loginService.getSelectedUser().userid.toString();   
    this._ParamService.GetSearchKM(this.ParamForms).subscribe(
      AllParam => {
        console.log(AllParam.result);
        //this.rating=AllParam.result.total_rating;
        this.list=AllParam.result;
        this.tempList=this.list.slice(0,this.pageSize);
        //this.ParamType3 = AllParam.result;
        //this.ParamType3=AllParam.result.slice(0,this.pageSize);
        // this.AllParamList = AllParam.result;
        // this.dataSource = new MatTableDataSource(this.AllParamList);
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
       
      },
      error => this.errorMessage = <any>error
    );
  }
  openRatingdocComponent(paramId) {
    this.Param_ID=paramId;
    //alert(this.Param_ID);
    //this.kmApproveModelOutside.mkid=paramId
    const dialogRef = this.dialog.open(RatingdocComponent, {
      width: '350px',
      height: '320px',
      data: { name: this.Param_ID },
    });
  }
  viewdocComponent(paramId) {
    this._Route.navigate(['/ViewDoc',paramId]);

  }
  onPageChange(e) {
    this.tempList = this.list.slice(e.pageIndex * e.pageSize,(e.pageIndex + 1) *e.pageSize);
}
  public errorHandling = (control: string, error: string) => {
    return this.searchdocForm.controls[control].hasError(error);
}

}
