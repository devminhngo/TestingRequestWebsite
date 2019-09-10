import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkrequestsComponent } from './workrequests.component';

describe('WorkrequestsComponent', () => {
  let component: WorkrequestsComponent;
  let fixture: ComponentFixture<WorkrequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkrequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
