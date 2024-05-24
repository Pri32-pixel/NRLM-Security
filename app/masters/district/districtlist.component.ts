import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { GrievanceTypeViewModel } from '@src/app/shared/models/GrievanceType.model';
import { DistrictService } from '@src/app/shared/services/district-service';

import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  templateUrl: './districtlist.html',
  styleUrls: ['./districtlist.css']

})

export class DistrictListComponent implements OnInit {
  private _DistrictService;
  AllDistrictList: GrievanceTypeViewModel[];
  errorMessage: any;
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  //@ViewChild('TABLE') table: ElementRef;
  displayedColumns: string[] = ['nDistrictID', 'tDistrictName', 'tStateName', 'dCreatedDt', 'EditAction', 'DeleteAction'];
  dataSource: any;

  constructor(private location: Location, private _Route: Router, 
    private districtService: DistrictService) {
    this._DistrictService = districtService;
    
  }

  ngOnInit() {


    this._DistrictService.GetAllDistrict().subscribe(
      AllDistrict => {
        console.log(AllDistrict.ObjReturn);
        this.AllDistrictList = AllDistrict.ObjReturn;
        this.dataSource = new MatTableDataSource(this.AllDistrictList);
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
    if (confirm("Are you sure to delete Parameter ?")) {
      this._DistrictService.DeleteParam(paramId).subscribe
        (
        response => {
          if (response.ReturnCode == "200") {
            alert('District Deleted Successfully');
            location.reload();
          }
          else {
            alert('Something Went Wrong');
            this._Route.navigate(['/Districtlist']);
          }
        }
        )
    }
  }

}