import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserAvatarComponent } from '@components/user-avatar/user-avatar.component';
import { NgIcon } from '@ng-icons/core';
import { ionGlobeOutline, ionLockClosed, ionPerson } from '@ng-icons/ionicons';

@Component({
  selector: 'app-note-item-list',
  standalone: true,
  imports: [UserAvatarComponent, NgIcon, NgClass],
  templateUrl: './note-item-list.component.html',
  styleUrl: './note-item-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteItemListComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) content!: string;
  @Input({ required: true }) date!: string;
  @Input({ required: true }) author!: string;

  @Input() public public: boolean = false;
  @Input() public selected: boolean = false;

  public userIcon: string = ionPerson;
  public lockedIcon: string = ionLockClosed;
  public globeIcon: string = ionGlobeOutline;

  public nl2br(content: string) {
    return content.replace(/\n/g, '<br>');
  }

  public formatarTempoRelativo(data: string) {
    const dataRecebida = new Date(data.endsWith('Z') ? data : data + 'Z');

    const agora = new Date();

    const diferencaMS = agora.getTime() - dataRecebida.getTime();

    const umMinuto = 60 * 1000;
    const umaHora = 60 * umMinuto;
    const umDia = 24 * umaHora;

    if (diferencaMS < umMinuto) {
      return 'Agora mesmo';
    }

    if (diferencaMS < umaHora) {
      const minutos = Math.floor(diferencaMS / umMinuto);
      return `Há ${minutos}m`;
    }

    if (diferencaMS < umDia) {
      const horas = Math.floor(diferencaMS / umaHora);
      return `Há ${horas}h`;
    }

    const trintaDias = 30 * umDia;
    if (diferencaMS < trintaDias) {
      const dias = Math.floor(diferencaMS / umDia);
      return `Há ${dias}d`;
    }

    const umAno = 365 * umDia;
    if (diferencaMS < umAno) {
      const meses = Math.floor(diferencaMS / trintaDias);
      return `Há ${meses} m${meses > 1 ? 'eses' : 'ês'}`;
    }

    const anos = Math.floor(diferencaMS / umAno);
    return `Há ${anos} ano${anos > 1 ? 's' : ''}`;
  }
}
