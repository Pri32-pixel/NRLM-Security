import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { GrievancePriorityViewModel } from '@src/app/shared/models/GrievancePriority.model';
import { GrievancePriorityService } from '@src/app/shared/services/grievancepriority-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  templateUrl: './GrivancePriorityList.html',
  styleUrls: ['./GrivancePriorityList.css']

})

export class GrivancePriorityListComponent implements OnInit {
  private _ParamService;
  AllParamList: GrievancePriorityViewModel[];
  errorMessage: any;
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  //@ViewChild('TABLE') table: ElementRef;
  displayedColumns: string[] = ['nGrievancePriorityId', 'tGrievancePriority', 'nGrievancePriorityOrder', 'dCreatedDt', 'EditAction', 'DeleteAction'];
  dataSource: any;

  constructor(private location: Location, private _Route: Router, private grievancePriorityService: GrievancePriorityService) {
    this._ParamService = grievancePriorityService;
  
  }

  ngOnInit() {

    this._ParamService.GetAllGrievancePriority().subscribe(
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
    if (confirm("Are you sure to delete Grievance Priority ?")) {
      this._ParamService.DeleteParam(paramId).subscribe
        (
        response => {
          // if (response.ReturnCode == "200") {
            alert('Deleted Grievance Priority Successfully');
            
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