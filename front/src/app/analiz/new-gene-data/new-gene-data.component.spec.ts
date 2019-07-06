import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGeneDataComponent } from './new-gene-data.component';

describe('NewGeneDataComponent', () => {
  let component: NewGeneDataComponent;
  let fixture: ComponentFixture<NewGeneDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGeneDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGeneDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
