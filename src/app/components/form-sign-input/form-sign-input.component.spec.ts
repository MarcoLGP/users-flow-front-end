import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSignInputComponent } from './form-sign-input.component';

describe('FormSignInputComponent', () => {
  let component: FormSignInputComponent;
  let fixture: ComponentFixture<FormSignInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSignInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormSignInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
