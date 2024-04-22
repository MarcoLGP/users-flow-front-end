import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxReturnFormComponent } from './box-return-form.component';

describe('BoxReturnFormComponent', () => {
  let component: BoxReturnFormComponent;
  let fixture: ComponentFixture<BoxReturnFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxReturnFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxReturnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
