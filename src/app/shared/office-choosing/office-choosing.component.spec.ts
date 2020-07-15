import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeChoosingComponent } from './office-choosing.component';

describe('OfficeChoosingComponent', () => {
  let component: OfficeChoosingComponent;
  let fixture: ComponentFixture<OfficeChoosingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeChoosingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeChoosingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
