import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteToolsBarComponent } from './note-tools-bar.component';

describe('NoteToolsBarComponent', () => {
  let component: NoteToolsBarComponent;
  let fixture: ComponentFixture<NoteToolsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteToolsBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteToolsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
