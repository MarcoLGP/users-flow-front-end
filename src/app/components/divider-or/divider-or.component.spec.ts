import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividerOrComponent } from './divider-or.component';

describe('DividerOrComponent', () => {
  let component: DividerOrComponent;
  let fixture: ComponentFixture<DividerOrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividerOrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DividerOrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
