import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetRecordsComponent } from './timesheet-records.component';

describe('TimesheetRecordsComponent', () => {
  let component: TimesheetRecordsComponent;
  let fixture: ComponentFixture<TimesheetRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
