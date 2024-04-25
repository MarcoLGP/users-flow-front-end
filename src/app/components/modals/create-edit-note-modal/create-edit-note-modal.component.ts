import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormSignInputComponent } from '@components/form-sign-input/form-sign-input.component';
import { ModalRootComponent } from '@layouts/modal-root/modal-root.component';
import { ionPencil } from '@ng-icons/ionicons';
import { INoteSelected } from '@models/Note';
import { NoteService } from '@services/note.service';

@Component({
  selector: 'app-create-edit-note-modal',
  standalone: true,
  imports: [ModalRootComponent, ReactiveFormsModule, FormSignInputComponent],
  templateUrl: './create-edit-note-modal.component.html',
  styleUrl: './create-edit-note-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEditNoteModalComponent implements AfterViewInit {
  @ViewChild('noteContent') noteContentRef!: ElementRef<HTMLDivElement>;

  constructor(private _fb: FormBuilder, private _noteService: NoteService) {}

  @Input({ required: true })
  public setOpenCreateEditNoteModal!: WritableSignal<boolean>;
  @Input() public noteSelected: INoteSelected | null = null;
  @Input({ required: true }) public isEdit: boolean = false;

  ngAfterViewInit(): void {
    if (this.isEdit && this.noteSelected) {
      this.title?.setValue(this.noteSelected.title);
      this.noteContentRef.nativeElement.innerText = this.noteSelected.content;
      this.public?.setValue(this.noteSelected.public);
    }
  }

  public pencilIcon = ionPencil;

  public createNoteForm = this._fb.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
    public: [true],
  });

  get title() {
    return this.createNoteForm.get('title');
  }

  public createNoteFormSubmit() {
    const newNote = {
      title: this.title!.value!,
      content: this.createNoteForm.get('content')?.value!,
      public: this.public!.value!,
    };

    if (this.isEdit && this.noteSelected) {
      this._noteService
        .editNote({ noteId: this.noteSelected.noteId, ...newNote })
        .subscribe({
          next: () => {},
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            this.setOpenCreateEditNoteModal.set(false);
          },
        });
    } else {
      this._noteService.addNote(newNote).subscribe({
        next: () => {
          console.log('Next');
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.setOpenCreateEditNoteModal.set(false);
        },
      });
    }
  }

  get public() {
    return this.createNoteForm.get('public');
  }

  onContentInput(event: any) {
    this.createNoteForm.patchValue({ content: event.target.innerText });
  }
}
