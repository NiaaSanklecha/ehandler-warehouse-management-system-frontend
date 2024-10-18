import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellcomponentComponent } from './shellcomponent.component';

describe('ShellcomponentComponent', () => {
  let component: ShellcomponentComponent;
  let fixture: ComponentFixture<ShellcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShellcomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
