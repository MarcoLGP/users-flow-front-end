import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicNotesComponent } from './public-notes.component';

describe('PublicNotesComponent', () => {
  let component: PublicNotesComponent;
  let fixture: ComponentFixture<PublicNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
