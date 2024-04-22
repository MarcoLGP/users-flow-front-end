import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditNoteModalComponent } from './create-edit-note-modal.component';

describe('CreateEditNoteModalComponent', () => {
  let component: CreateEditNoteModalComponent;
  let fixture: ComponentFixture<CreateEditNoteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditNoteModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEditNoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
