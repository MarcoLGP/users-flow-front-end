import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigEditItemComponent } from './config-edit-item.component';

describe('ConfigEditItemComponent', () => {
  let component: ConfigEditItemComponent;
  let fixture: ComponentFixture<ConfigEditItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigEditItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigEditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
