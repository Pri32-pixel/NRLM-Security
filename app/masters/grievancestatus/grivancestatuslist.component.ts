import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { GrievanceStatusViewModel } from '@src/app/shared/models/GrievanceStatus.model';
import { GrievanceStatusService } from '@src/app/shared/services/grivancestatus-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  templateUrl: './GrivanceStatusList.html',
  styleUrls: ['./GrivanceStatusList.css']

})

export class GrivanceStatusListComponent implements OnInit {
  private _ParamService;
  AllParamList: GrievanceStatusViewModel[];
  errorMessage: any;
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  //@ViewChild('TABLE') table: ElementRef;
  displayedColumns: string[] = ['nGrievanceStatusId', 'tGrievanceStatus', 'nGrievanceStatusOrder', 'dCreatedDt', 'EditAction', 'DeleteAction'];
  dataSource: any;

  constructor(private location: Location, private _Route: Router, private grievanceStatusService: GrievanceStatusService) {
    this._ParamService = grievanceStatusService;
  
  }

  ngOnInit() {

    this._ParamService.GetAllGrievanceStatus().subscribe(
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
    if (confirm("Are you sure to delete Grievance Status ?")) {
      this._ParamService.DeleteParam(paramId).subscribe
        (
        response => {
          // if (response.ReturnCode == "200") {
            alert('Deleted Grievance Status Successfully');
            
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