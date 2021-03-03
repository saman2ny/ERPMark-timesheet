import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesiginationListComponent } from './desigination-list.component';

describe('DesiginationListComponent', () => {
  let component: DesiginationListComponent;
  let fixture: ComponentFixture<DesiginationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesiginationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesiginationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
