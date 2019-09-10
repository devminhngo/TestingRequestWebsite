import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RealTimeDataGraphComponent } from '../../modules/data-graph/components/real-time-data-graph/real-time-data-graph.component';

import { MatCardModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        ChartsModule
      ],
      declarations: [ HomeComponent, RealTimeDataGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Home'`, () => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.debugElement.componentInstance;
    expect(component.title).toEqual('Home');
  });

});
