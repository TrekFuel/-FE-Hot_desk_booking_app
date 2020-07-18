import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsManagementEditComponent } from './rooms-management-edit.component';

describe('RoomsManagementEditComponent', () => {
  let component: RoomsManagementEditComponent;
  let fixture: ComponentFixture<RoomsManagementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsManagementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsManagementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
