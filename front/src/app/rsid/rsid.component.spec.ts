import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsidComponent } from './rsid.component';

describe('RsidComponent', () => {
  let component: RsidComponent;
  let fixture: ComponentFixture<RsidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
