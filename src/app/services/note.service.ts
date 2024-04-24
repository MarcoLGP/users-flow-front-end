import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { LocalStorageService } from './local.storage.service';
import { Observable } from 'rxjs';
import { INote, INoteBase, INoteSelected } from '@models/Note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(
    private _httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  public getNotes(): Observable<INote[]> {
    const token = this.localStorageService.get('token');
    return this._httpClient.get<INote[]>(`${environment.apiUrl}/Note`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  public addNote(note: INoteBase): Observable<any> {
    const token = this.localStorageService.get('token');
    return this._httpClient.post(
      `${environment.apiUrl}/Note`,
      { ...note },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  public deleteNote(id: number): Observable<any> {
    const token = this.localStorageService.get('token');
    return this._httpClient.delete(`${environment.apiUrl}/Note/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  public editNote(note: INoteSelected): Observable<any> {
    const token = this.localStorageService.get('token');
    return this._httpClient.put(
      `${environment.apiUrl}/Note/${note.noteId}`,
      { ...note },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
}
