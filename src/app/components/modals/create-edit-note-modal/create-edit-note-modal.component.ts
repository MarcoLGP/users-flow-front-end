import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  WritableSignal,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormSignInputComponent } from '@components/form-sign-input/form-sign-input.component';
import { ModalRootComponent } from '@layouts/modal-root/modal-root.component';
import { ionPencil } from '@ng-icons/ionicons';
import { INoteSelected } from '@models/Note';
import { NoteService } from '@services/note.service';
import { BoxReturnFormComponent } from '@components/box-return-form/box-return-form.component';

@Component({
  selector: 'app-create-edit-note-modal',
  standalone: true,
  imports: [
    ModalRootComponent,
    ReactiveFormsModule,
    FormSignInputComponent,
    BoxReturnFormComponent,
  ],
  templateUrl: './create-edit-note-modal.component.html',
  styleUrl: './create-edit-note-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEditNoteModalComponent implements AfterViewInit {
  @ViewChild('noteContent') noteContentRef!: ElementRef<HTMLDivElement>;

  constructor(private _fb: FormBuilder, private _noteService: NoteService) { }

  @Input({ required: true })
  public setOpenCreateEditNoteModal!: WritableSignal<boolean>;
  @Input() public noteSelected: INoteSelected | null = null;
  @Input({ required: true }) public isEdit: boolean = false;
  @Output() successFormEvent = new EventEmitter<{ success: boolean }>();

  ngAfterViewInit(): void {
    if (this.isEdit && this.noteSelected) {
      this.title?.setValue(this.noteSelected.title);
      this.noteContentRef.nativeElement.innerText = this.noteSelected.content;
      this.content?.setValue(this.noteSelected.content);
      this.public?.setValue(this.noteSelected.public);
    }
  }

  public pencilIcon = ionPencil;

  public errorsMessages: WritableSignal<string[]> = signal([]);
  public isFormSubmitted: boolean = false;

  public createNoteForm = this._fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
    ],
    content: ['', [Validators.required, Validators.minLength(5)]],
    public: [false],
  });

  get title() {
    return this.createNoteForm.get('title');
  }

  get content() {
    return this.createNoteForm.get('content');
  }

  public handleInputError(inputControl: AbstractControl | null) {
    return this.isFormSubmitted && inputControl?.errors ? true : false;
  }

  public createNoteFormSubmit() {
    this.errorsMessages.set([]);
    this.isFormSubmitted = true;

    const newNote = {
      title: this.title!.value!,
      content: this.createNoteForm.get('content')?.value?.trim()!,
      public:
        typeof this.public!.value! == 'string'
          ? this.public!.value! == 'true'
          : this.public!.value!,
    };

    if (this.title?.errors) {
      if (this.title?.errors?.['required']) {
        this.errorsMessages.set(['Título é obrigatório']);
      }
      if (this.title?.errors?.['minlength']) {
        this.errorsMessages.update((errors) =>
          errors.concat('Título deve ter no minimo 5 caracteres')
        );
      }
      if (this.title?.errors?.['maxlength']) {
        this.errorsMessages.update((errors) =>
          errors.concat('Título deve ter no maximo 50 caracteres')
        );
      }
    }

    if (newNote.content.length < 5) {
      this.errorsMessages.update((errors) =>
        errors.concat('Conteúdo deve ter no minimo 5 caracteres')
      );
    }

    if (this.errorsMessages().length > 0) return;

    if (this.isEdit && this.noteSelected) {
      this._noteService
        .editNote({ noteId: this.noteSelected.noteId, ...newNote })
        .subscribe({
          error: () => {
            this.errorsMessages.set(['Ocorreu um erro. Tente novamente']);
          },
          complete: () => {
            this.setOpenCreateEditNoteModal.set(false);
            this.successFormEvent.emit({ success: true });
          },
        });
    } else {
      this._noteService.addNote(newNote).subscribe({
        error: () => {
          this.errorsMessages.set(['Ocorreu um erro. Tente novamente']);
        },
        complete: () => {
          this.setOpenCreateEditNoteModal.set(false);
          this.successFormEvent.emit({ success: true });
        },
      });
    }
  }

  get public() {
    return this.createNoteForm.get('public');
  }

  onContentInput() {
    const element = this.noteContentRef.nativeElement;
    let currentText: string = element.innerText;

    if (currentText.length > 400) {
      element.innerText = currentText = currentText.slice(0, 400);
    }

    this.createNoteForm.patchValue({ content: currentText });
  }
}
