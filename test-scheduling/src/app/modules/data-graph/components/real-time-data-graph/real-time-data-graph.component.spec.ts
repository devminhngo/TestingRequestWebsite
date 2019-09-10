import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeDataGraphComponent } from './real-time-data-graph.component';
import { ChartsModule } from 'ng2-charts';

describe('RealTimeDataGraphComponent', () => {
  let component: RealTimeDataGraphComponent;
  let fixture: ComponentFixture<RealTimeDataGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealTimeDataGraphComponent],
      imports: [
        ChartsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeDataGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
