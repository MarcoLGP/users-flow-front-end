import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-modal-root',
  standalone: true,
  imports: [],
  templateUrl: './modal-root.component.html',
  styleUrl: './modal-root.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalRootComponent {
  constructor (private elementRef: ElementRef) {};
  
  @Input({ required: true }) public setOpenModal!: WritableSignal<boolean>;

  @HostListener('document:keydown.escape', ['$event'])
  public onKeydownHandler() {
    this.setOpenModal.set(false);
  };

  public clickModal(event: MouseEvent) {
    if (!this.elementRef.nativeElement.querySelector('.modal_content').contains(event.target)) {
     this.setOpenModal.set(false);
    };
  };
};
