import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalizComponent } from './analiz.component';

describe('AnalizComponent', () => {
  let component: AnalizComponent;
  let fixture: ComponentFixture<AnalizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
