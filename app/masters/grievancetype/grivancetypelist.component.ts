import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { GrievanceTypeViewModel } from '@src/app/shared/models/GrievanceType.model';
import { GrievanceTypeService } from '@src/app/shared/services/grivancetype-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  templateUrl: './GrivanceTypeList.html',
  styleUrls: ['./GrivanceTypeList.css']

})

export class GrivanceTypeListComponent implements OnInit {
  private _ParamService;
  AllParamList: GrievanceTypeViewModel[];
  errorMessage: any;
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  //@ViewChild('TABLE') table: ElementRef;
  displayedColumns: string[] = ['nGrievanceTypeId', 'tGrievanceType', 'nGrievanceTypeOrder', 'dCreatedDt', 'EditAction', 'DeleteAction'];
  dataSource: any;

  constructor(private location: Location, private _Route: Router, private grievanceTypeService: GrievanceTypeService) {
    this._ParamService = grievanceTypeService;
  
  }

  ngOnInit() {

    this._ParamService.GetAllGrievanceType().subscribe(
      AllParam => {
        console.log(AllParam);
        this.AllParamList = AllParam.ObjReturn;
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
    if (confirm("Are you sure to delete Grievance Type ?")) {
      this._ParamService.DeleteParam(paramId).subscribe
        (
        response => {
          // if (response.ReturnCode == "200") {
            alert('Deleted Grievance Type Successfully');
            
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