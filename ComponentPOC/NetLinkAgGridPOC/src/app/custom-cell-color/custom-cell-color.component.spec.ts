import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCellColorComponent } from './custom-cell-color.component';

describe('CustomCellColorComponent', () => {
  let component: CustomCellColorComponent;
  let fixture: ComponentFixture<CustomCellColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomCellColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCellColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
