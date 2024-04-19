import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAsideNavOptionItemComponent } from './dashboard-aside-nav-option-item.component';

describe('DashboardAsideNavOptionItemComponent', () => {
  let component: DashboardAsideNavOptionItemComponent;
  let fixture: ComponentFixture<DashboardAsideNavOptionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAsideNavOptionItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardAsideNavOptionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
