// import { ActionbarHelper } from './../../shared/actionbar-service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent implements OnInit {

  @Input('title') title: string;
  @Input('value') value: number;
  @Input('maxvalue') maxvalue: number;
  @Input('color') color: string;
  @Input('link') link: string;

  constructor() { }

  ngOnInit() {
  }

}
