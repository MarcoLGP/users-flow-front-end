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
  constructor(private _httpClient: HttpClient) {}

  public getUserNotes(skip: number, take: number): Observable<INote[]> {
    return this._httpClient.get<INote[]>(
      `${environment.apiUrl}/Note?skip=${skip}&take=${take}`
    );
  }

  public addNote(note: INoteBase): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/Note`, { ...note });
  }

  public deleteNote(id: number): Observable<any> {
    return this._httpClient.delete(`${environment.apiUrl}/Note/${id}`);
  }

  public editNote(note: INoteSelected): Observable<any> {
    return this._httpClient.put(`${environment.apiUrl}/Note/${note.noteId}`, {
      ...note,
    });
  }

  public getPublicNotes(skip: number, take: number): Observable<INote[]> {
    return this._httpClient.get<INote[]>(
      `${environment.apiUrl}/Note/public/all`
    );
  }
}
