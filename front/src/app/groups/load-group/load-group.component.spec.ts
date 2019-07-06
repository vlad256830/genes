import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadGroupComponent } from './load-group.component';

describe('LoadGroupComponent', () => {
  let component: LoadGroupComponent;
  let fixture: ComponentFixture<LoadGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
