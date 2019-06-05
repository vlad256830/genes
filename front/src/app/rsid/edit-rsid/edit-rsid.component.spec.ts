import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRsidComponent } from './edit-rsid.component';

describe('EditRsidComponent', () => {
  let component: EditRsidComponent;
  let fixture: ComponentFixture<EditRsidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRsidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRsidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
