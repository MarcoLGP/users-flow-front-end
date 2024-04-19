import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormSignInputComponent } from '@components/form/form-sign-input/form-sign-input.component';
import { ModalRootComponent } from '@layouts/modal-root/modal-root.component';
import { ionPencil } from '@ng-icons/ionicons';
import { NoteService } from 'app/services/note.service';

@Component({
  selector: 'app-create-note-modal',
  standalone: true,
  imports: [ModalRootComponent, ReactiveFormsModule, FormSignInputComponent],
  templateUrl: './create-note-modal.component.html',
  styleUrls: ['./create-note-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNoteModalComponent {
  @ViewChild('noteContent') noteContentRef!: ElementRef;
  constructor(
    private _fb: FormBuilder,
    private _noteService: NoteService,
    private _router: Router
  ) {};

  @Input({ required: true }) public setOpenAddNoteModal!: WritableSignal<boolean>;

  public pencilIcon = ionPencil;

  public createNoteForm = this._fb.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
    locked: [false],
    public: [true]
  });

  get title() {
    return this.createNoteForm.get('title');
  }

  public createNoteFormSubmit() {
    this._noteService
      .addNote({
        title: this.createNoteForm.get('title')!.value!,
        content: this.createNoteForm.get('content')!.value!,
        locked: this.createNoteForm.get('locked')!.value!,
        public: this.createNoteForm.get('public')!.value!
      })
      .subscribe({
        next: () => {
          console.log('Next');
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.setOpenAddNoteModal.set(false);
        }
      });
  };

  get locked() {
    return this.createNoteForm.get('locked');
  };

  get public () {
    return this.createNoteForm.get('public');
  }

  onContentInput(event: any) {
    this.createNoteForm.patchValue({ content: event.target.innerText });
  }
}
