import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRootComponent } from './modal-root.component';

describe('ModalRootComponent', () => {
  let component: ModalRootComponent;
  let fixture: ComponentFixture<ModalRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRootComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
