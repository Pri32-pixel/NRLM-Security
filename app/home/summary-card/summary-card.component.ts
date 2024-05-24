// import { ActionbarHelper } from './../../shared/actionbar-service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.css']
})
export class SummaryCardComponent implements OnInit {

  @Input('title') title: string;
  @Input('value') value: number;
  @Input('maxvalue') maxvalue: number;
  @Input('color') color: string;
  @Input('icon') icon: string;
  @Input('link') link: string;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onCardClick = new EventEmitter();
  // @Input('deptId') deptId: any;
  // @Output() cardClick = new EventEmitter();
  currDeptId: any;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    // this.currDeptId = this.authService.getSelectedDepartmentId();
  }

  valueChanged() {
    this.onCardClick.emit({clickedOn: this.title});
    // if (this.currDeptId === this.deptId) {
    //   if (this.title === 'PUBLIC') {
    //     this.router.navigate(['/home/publicinbox']);
    //   }
    //   if (this.title === 'DEPARTMENT') {
    //     this.router.navigate(['/home/departmentinbox']);
    //   }
    //   if (this.title === 'GROUP') {
    //     this.router.navigate(['/home/groupinbox']);
    //   }
    //   if (this.title === 'USER') {
    //     this.router.navigate(['/home/userinbox']);
    //   }
    // } else {
    //   this.acttionHelper.infoMessage('Please Change Department from toolbar to view!!')
    // }
  }



}
