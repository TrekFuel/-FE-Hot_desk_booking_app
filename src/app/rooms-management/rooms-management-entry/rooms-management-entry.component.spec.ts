import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsManagementEntryComponent } from './rooms-management-entry.component';

describe('RoomsManagementEntryComponent', () => {
  let component: RoomsManagementEntryComponent;
  let fixture: ComponentFixture<RoomsManagementEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsManagementEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsManagementEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
