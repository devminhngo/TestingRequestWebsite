import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealTimeDataGraphComponent } from './components/real-time-data-graph/real-time-data-graph.component';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [RealTimeDataGraphComponent],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [
    RealTimeDataGraphComponent,
  ],
})
export class DataGraphModule { }
