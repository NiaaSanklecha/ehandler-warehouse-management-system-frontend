import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareBoxComponent } from './square-box.component';

describe('SquareBoxComponent', () => {
  let component: SquareBoxComponent;
  let fixture: ComponentFixture<SquareBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquareBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
