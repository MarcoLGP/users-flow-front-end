import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigItemCardComponent } from './config-item-card.component';

describe('ConfigItemCardComponent', () => {
  let component: ConfigItemCardComponent;
  let fixture: ComponentFixture<ConfigItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigItemCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
