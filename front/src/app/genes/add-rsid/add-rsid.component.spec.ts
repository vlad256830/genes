import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRsidComponent } from './add-rsid.component';

describe('AddRsidComponent', () => {
  let component: AddRsidComponent;
  let fixture: ComponentFixture<AddRsidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRsidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRsidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
