import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-graph',
  templateUrl: './summary-graph.component.html',
  styleUrls: ['./summary-graph.component.css']
})
export class SummaryGraphComponent implements OnInit {
  multi: any[];
  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = false;
  gradient: boolean = false;
  // showLegend: boolean = true;
  // showXAxisLabel: boolean = true;
  // yAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  // xAxisLabel: string = 'Population';

  colorScheme = {
    domain: ['#3C3A42', '#B9A394', '#586A6A']
  };
  constructor() { 
    this.multi = [
      {
        "name": "MBBS",
        "series": [
          {
            "name": "Submitted",
            "value": 7300000
          },
          {
            "name": "Approved",
            "value": 89400
          },
          {
            "name": "Rejected",
            "value": 8
          }
        ]
      },
    
      {
        "name": "MSC",
        "series": [
          {
            "name": "Submitted",
            "value": 7870000
          },
          {
            "name": "Approved",
            "value": 8270000
          },
          {
            "name": "Rejected",
            "value": 8940000
          }
        ]
      },
    
      {
        "name": "BA",
        "series": [
          {
            "name": "Submitted",
            "value": 5000002
          },
          {
            "name": "Approved",
            "value": 5800000
          },
          {
            "name": "Rejected",
            "value": 8940000
          }
        ]
      },
      {
        "name": "BA1",
        "series": [
          {
            "name": "Submitted",
            "value": 5000002
          },
          {
            "name": "Approved",
            "value": 5800000
          },
          {
            "name": "Rejected",
            "value": 8940000
          }
        ]
      },
      {
        "name": "BA2",
        "series": [
          {
            "name": "Submitted",
            "value": 5000002
          },
          {
            "name": "Approved",
            "value": 5800000
          },
          {
            "name": "Rejected",
            "value": 8940000
          }
        ]
      },
      {
        "name": "BA3",
        "series": [
          {
            "name": "Submitted",
            "value": 5000002
          },
          {
            "name": "Approved",
            "value": 5800000
          }
        ]
      },
      {
        "name": "BA4",
        "series": [
          {
            "name": "Submitted",
            "value": 5000002
          },
          {
            "name": "Approved",
            "value": 5800000
          }
        ]
      },  
      {
        "name": "BA5",
        "series": [
          {
            "name": "Submitted",
            "value": 5000002
          },
          {
            "name": "Approved",
            "value": 5800000
          }
        ]
      },    
      {
        "name": "BA6",
        "series": [
          {
            "name": "Submitted",
            "value": 5000002
          },
          {
            "name": "Approved",
            "value": 5800000
          }
        ]
      },            
    ];
  }

  ngOnInit() {
  }

  onSelect(event) {
    console.log(event);
  }

}
