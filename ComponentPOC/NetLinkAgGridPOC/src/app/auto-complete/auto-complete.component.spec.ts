import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAutoCompleteComponent } from './auto-complete.component';

describe('MyAutoCompleteComponent', () => {
  let component: MyAutoCompleteComponent;
  let fixture: ComponentFixture<MyAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAutoCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
