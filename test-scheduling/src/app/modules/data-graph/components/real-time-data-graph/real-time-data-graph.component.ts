import { Component, OnInit, ViewChild, Input } from '@angular/core';
import 'chartjs-plugin-streaming';

@Component({
  selector: 'app-real-time-data-graph',
  templateUrl: './real-time-data-graph.component.html',
  styleUrls: ['./real-time-data-graph.component.css']
})
export class RealTimeDataGraphComponent implements OnInit {
  @Input()
  datasets: any[] = [
    { data: [], label: 'Temperature Celsius' },
  ];

  @Input()
  lineChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
          onRefresh: function(chart: any) {
            chart.data.datasets.forEach(function(dataset: any) {
              dataset.data.push({
                x: Date.now(),
                y: Math.floor(Math.random() * 40),
              });
            });
          },
          delay: 1500,
        }
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
      ]
    },
  };

  @Input()
  lineChartLegend = true;
  @Input()
  lineChartType = 'line';

  constructor() { }

  ngOnInit() { }

}
