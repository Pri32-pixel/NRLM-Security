import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
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
import { UserService } from '@src/app/shared/services/user-service';
import { FileTypeModel } from '@src/app/shared/models/KMMaster';
@Component({
  
  templateUrl: './postdoc.html',
  styleUrls: ['./postdoc.css'],
  
})


export class PostdocComponent implements OnInit {
  @ViewChild('inputFile', { static: true }) inputFile: ElementRef;

  postdocForm: FormGroup;
  title = "Grievance Add";
  ParamForms: PostDocModel = new PostDocModel();
  private _ParamService;
  private _DocSourceService;
  private _DocCategoryService;
  private responsedata: any;
  private _UserService;
  errorMessage: any;
  isSingleUploaded = false;
  actionButtonLabel: string = 'Retry';
  action: boolean = false;
  setAutoHide: boolean = true;
  submitted = false;
  autoHide: number = 2000;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  theFile: any = null;
  private Param_ID: string;
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
  ParamType8: any = [];
  constructor(private _Route: Router,private docSourceService: DocSourceService,
    private docCategoryService: DocCategoryService,private actionbarHelper: UtilityHelper,
    public snackBar: MatSnackBar,private _routeParams: ActivatedRoute,private loginService: LoginService,
    private grievanceService: GrievanceService, 
    private userService: UserService,
    private formBuilder: FormBuilder) { 
      this._UserService = userService;
      this._DocSourceService = docSourceService;
      this._DocCategoryService = docCategoryService;
      this._ParamService=grievanceService;
      this.GetDocCategory();
      this.GetDocSource();
      this.GetState();
      this.GetFileType();
      this.GetKMVertical();
      this.GetLanguage();
      //this.GetKMSubVertical();
    }
    

    output: any;

  ngOnInit() {
    this.postdocForm = this.formBuilder.group({
      tFileName: ["", [Validators.required]],
      nSourceId: ["", [Validators.required]],
      nCrossPublication:  ["", [Validators.required]],
      stateid: ["", [Validators.required]],
      nLanguageId: [""],
      nMaterialVertical: ["",[Validators.required]],
      nMaterialSubVertical: ["",[Validators.required]],
      nFileType:  ["",[Validators.required]],
      nCategory: ["", [Validators.required]],
      tApproverName: [""],
      tApproverDesig:  [""],
      tTag:  ["", [Validators.required]],
      imageInput: ["", [Validators.required]],
      
    });
  }
  get f() { return this.postdocForm.controls; }
  GetDocSource() {

    return this._DocSourceService.GetAllDocSourceActiveList().subscribe(
      AllParam => {
        //console.log(AllParam.result);
        this.ParamType1 = AllParam.result;
      },
      error => this.errorMessage = <any>error
    );
  }

  GetDocCategory() {

    return this._DocCategoryService.GetAllDocCategoryActive().subscribe(
      AllParam => {
        //console.log(AllParam.result);
        this.ParamType6 = AllParam.result;
      },
      error => this.errorMessage = <any>error
    );
  }

  GetKMVertical() {

    return this._DocCategoryService.GetAllKMVerticalActive().subscribe(
      AllParam => {
       // console.log(AllParam.result);
        this.ParamType4 = AllParam.result;
      },
      error => this.errorMessage = <any>error
    );
  }

  GetKMSubVertical(id: number) {

    return this._DocCategoryService.GetKMSubVerticalByVerticalTypeIdActive(id).subscribe(
      AllParam => {
      //  console.log(AllParam.result);
        this.ParamType8 = AllParam.result;
      },
      error => this.errorMessage = <any>error
    );
  }

  KMVerticalChange(event) {
    //console.log(event.value);
    this.GetKMSubVertical(event.value);
  }
  GetFileType() {

    return this._DocCategoryService.GetAllFileTypeActive().subscribe(
      AllParam => {
        //console.log(AllParam.result);
        this.ParamType5 = AllParam.result;
      },
      error => this.errorMessage = <any>error
    );
  }
  GetLanguage() {

    return this._DocCategoryService.GetAllLanguageActive().subscribe(
      AllParam => {
      //  console.log(AllParam.result);
        this.ParamType3 = AllParam.result;
      },
      error => this.errorMessage = <any>error
    );
  }
  GetState() {

    return this._UserService.GetAllStateActive().subscribe(
        AllParam => {
        //  console.log(AllParam.result);
          this.ParamType7 = AllParam.result;
        },
        error => this.errorMessage = <any>error
      );
}

  GetDataEdit() {
    this.Param_ID = this._routeParams.snapshot.params['Param_ID'];
    if (this.Param_ID != null) {
        var data = this._ParamService.getAllMaterialById(this.Param_ID).subscribe(
            Param => {
               // console.log(Param.result);
                this.ParamForms.approver_id = Param.result[0].doccategoryid;
                this.ParamForms.title = Param.result[0].doccategorycode;
                this.ParamForms.details = Param.result[0].doccategory;
                this.ParamForms.docsourceid = Param.result[0].doccategoryorder;
                this.ParamForms.doccategoryid = Param.result[0].doccategoryorder;
                this.ParamForms.cross_state_status = Param.result[0].doccategoryorder;
                this.ParamForms.knw_lang = Param.result[0].doccategoryorder;
                this.ParamForms.is_active = Param.result[0].is_active;
                this.ParamForms.createdby = Param.result[0].is_active;
            },
            error => this.errorMessage = <any>error
        );
    }
}
Save() {

  if( this.theFile==null){
    this.submitted = true;
  }
  else{
    this.postdocForm.controls.imageInput.setErrors(null);
  }
 
    if (this.postdocForm.valid) {
        if (this.ParamForms.is_active.toString()=="true" )
            this.ParamForms.is_active=1;
        else
            this.ParamForms.is_active=0;
            
            this.ParamForms.approver_id = 11;
        if (this.ParamForms.approver_id == 11) {
          this.ParamForms.createdby=this.loginService.getSelectedUser().userid;    
          const data= new FormData();
          if(this.theFile==null || this.theFile=="")
          {
           // console.log("Submitted click"+this.submitted);
            alert('Please select file for upload')
          }
          else{
          data.append('file', this.theFile, this.theFile.name);
          //data.append('jsonData', JSON.stringify(this.ParamForms.toString()));
          this.ParamForms.statelist=this.postdocForm.get('stateid').value.map(x=>x).join(",");
          if( this.ParamForms.statelist.indexOf(this.loginService.getSelectedUser().stateid.toString()) === -1){
            this.ParamForms.statelist=this.ParamForms.statelist+","+this.loginService.getSelectedUser().stateid.toString();
          }
          const blobOverrides = new Blob([JSON.stringify(this.ParamForms)], {
            type: 'application/json',
          });

          data.append('jsonData', JSON.stringify(this.ParamForms)); 
          // data.append('title', this.ParamForms.title.toString());
          // data.append('details', this.ParamForms.details.toString());
          // data.append('docsourceid', this.ParamForms.docsourceid.toString());
          // data.append('doccategoryid', this.ParamForms.doccategoryid.toString());
          // data.append('cross_state_status', this.ParamForms.cross_state_status.toString());
          // data.append('knw_lang', this.ParamForms.knw_lang.toString());
          // data.append('is_active', this.ParamForms.is_active.toString());
          // data.append('createdby', this.ParamForms.createdby.toString());

         


            this._ParamService.SaveKnowledgeMaterial(data).subscribe(
                response => {

                    this.output = response;
                    if (this.output.status == 409) {
                        let config = new MatSnackBarConfig();
                        config.duration = this.setAutoHide ? this.autoHide : 0;
                        config.verticalPosition = this.verticalPosition;
                        this.snackBar.open("Knowledge Material Already Exists", this.action ? this.actionButtonLabel : undefined, config);

                    }
                    else if (this.output.status == 200) {
                      console.log('response');
                        let config = new MatSnackBarConfig();
                        //config.duration = this.setAutoHide ? this.autoHide : 0;
                        config.verticalPosition = this.verticalPosition;
                        config.duration=5000;
                        this.snackBar.open("Data Saved Successfully", this.action ? this.actionButtonLabel : undefined, config);
                        if (this.loginService.isUserAdmin() || this.loginService.isUserDept())
                        {
                          this._Route.navigate(['/GrievanceList']);
                        }
                        if (this.loginService.isUserStudent())
                        {
                          this._Route.navigate(['/dashboard']);
                        }
                        
                    }
                    else if(this.output.status == 509)
                    {
                      this.showSnakeBar(this.output.message);
                    }
                    else if(this.output.status == 609)
                    {
                      this.showSnakeBar(this.output.message);
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

        }
        else {
          const data= new FormData();
          
          data.append('file', this.theFile, this.theFile.name);
          //data.append('jsonData', JSON.stringify(this.ParamForms.toString()));

          const blobOverrides = new Blob([JSON.stringify(this.ParamForms)], {
            type: 'application/json',
          });

          data.append('jsonData', JSON.stringify(this.ParamForms)); 
            this._ParamService.UpadteKnowledgeMaterial(data)
                .subscribe(response => {
                    if (response.status == 200) {
                        alert('Knowledge Material Updated Successfully');
                        //this.snackBar.open("Data Saved Successfully", this.action ? this.actionButtonLabel : undefined, config);
                        this._Route.navigate(['/GrievanceList']);
                    }
                })
        }
    }
}
showSnakeBar(msg)
{
  let config = new MatSnackBarConfig();
                        config.duration = this.setAutoHide ? this.autoHide : 0;
                        config.verticalPosition = this.verticalPosition;
                        this.snackBar.open(msg, this.action ? this.actionButtonLabel : undefined, config);
}
onFileChange(event) {
  this.theFile = null;
  this.isSingleUploaded=false;
  var matchResult = false;
  // See if any file(s) have been selected from input
  console.log("file type-----");
  if (event.target.files && event.target.files.length > 0) {
    // Don't allow file sizes over 1MB
      // Set theFile property
      this.theFile = event.target.files[0];
      var nameOfFile=this.theFile.name;
      var arr = nameOfFile.split('.'); 
	  var fileEx = arr[arr.length-1]; 
	fileEx = fileEx.toLowerCase();
      var allowedType = new Array ('jpg','tiff','jpeg','bmp','png','xlsx','xlsm','xlsb','xltx','csv','txt','pptx','pptm','ppt','pdf','docx','docx','dot','dotm','MP4','MP3','AAC','WAV');
      for(var j = 0; j < allowedType.length; j++){
        if(fileEx == allowedType[j]){
          matchResult = true;
          break;
        }
      }
      if(matchResult)
      {
  //console.log("File Type is ok");
  this.isSingleUploaded=true;
  this.submitted = false;
      }
      else{
        //console.log("Error File Type");
        this.inputFile.nativeElement.value = null;
        this.postdocForm.controls.imageInput.setErrors(null);
        event.target.value = null;
        //this.isSingleUploaded=false;
        this.theFile = null;
        this.submitted = true;
    this.isSingleUploaded=false;
    var matchResult = false;
    alert('File type not support for upload');

      }
     
      
  }
  else
  {
    alert('Please select file to upload');
    this.isSingleUploaded=false;
    this.submitted = false;
  }
}
public errorHandling = (control: string, error: string) => {
    return this.postdocForm.controls[control].hasError(error);
}

omit_special_char(event)
{   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
}
}

