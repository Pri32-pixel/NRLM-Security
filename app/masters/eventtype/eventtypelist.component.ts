import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { EventTypeViewModel } from '@src/app/shared/models/KMMaster';
import { DocCategoryService } from '@src/app/shared/services/doccategory-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  templateUrl: './EventTypeList.html',
  styleUrls: ['./EventTypeList.css']

})

export class EventTypeListComponent implements OnInit {
  private _ParamService;
  AllParamList: EventTypeViewModel[];
  errorMessage: any;
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  //@ViewChild('TABLE') table: ElementRef;
  displayedColumns: string[] = ['e_typeid','event_type', 'EditAction', 'DeleteAction'];
  dataSource: any;

  constructor(private location: Location, private _Route: Router, private docCategoryService: DocCategoryService) {
    this._ParamService = docCategoryService;
  
  }

  ngOnInit() {

    this._ParamService.GetAllEventType().subscribe(
      AllParam => {
        console.log(AllParam);
        this.AllParamList = AllParam.result;
        this.dataSource = new MatTableDataSource(this.AllParamList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       
      },
      error => this.errorMessage = <any>error
    );

  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  Delete(paramId): void {
    if (confirm("Are you sure to delete Knowledge Material Category ?")) {
      this._ParamService.DeleteParam(paramId).subscribe
        (
        response => {
          // if (response.ReturnCode == "200") {
            alert('Deleted Knowledge Material Category Successfully');
            
            location.reload();
          // }
          // else {
          //   alert('Something Went Wrong');
          //   this._Route.navigate(['/Gstatus/All']);
          // }
        }
        )
    }
  }

}