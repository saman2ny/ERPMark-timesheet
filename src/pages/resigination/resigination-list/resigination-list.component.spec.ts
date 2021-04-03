import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResiginationListComponent } from './resigination-list.component';

describe('ResiginationListComponent', () => {
  let component: ResiginationListComponent;
  let fixture: ComponentFixture<ResiginationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResiginationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResiginationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
