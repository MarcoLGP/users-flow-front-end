import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigBoxFormComponent } from './config-box-form.component';

describe('ConfigBoxFormComponent', () => {
  let component: ConfigBoxFormComponent;
  let fixture: ComponentFixture<ConfigBoxFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigBoxFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigBoxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
