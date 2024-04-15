import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteItemListComponent } from './note-item-list.component';

describe('NoteItemListComponent', () => {
  let component: NoteItemListComponent;
  let fixture: ComponentFixture<NoteItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteItemListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
