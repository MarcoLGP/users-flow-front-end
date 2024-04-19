import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPainelComponent } from './user-painel.component';

describe('UserPainelComponent', () => {
  let component: UserPainelComponent;
  let fixture: ComponentFixture<UserPainelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPainelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPainelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
