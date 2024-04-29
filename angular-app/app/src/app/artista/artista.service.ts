import { Injectable } from '@angular/core';
import { IArtista } from './artista.interface';
import { Observable, catchError, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArtistaService {
  private baseUrl = 'http://127.0.0.1:3000';

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  postArtista(idFestival: number, artista: IArtista): Observable<IArtista> {
    const body: any = { artista: artista };

    return this.http
      .post<IArtista>(
        `${this.baseUrl}/api/festivales/${idFestival}/artistas`,
        body
      )
      .pipe(catchError(this.handleError));
  }

  deleteArtista(idFestival: number, id: number): Observable<void> {
    return this.http
      .delete<void>(
        `${this.baseUrl}/api/festivales/${idFestival}/artistas/${id}`
      )
      .pipe(catchError(this.handleError));
  }

  putArtista(idFestival: number, artista: IArtista): Observable<void> {
    const body: any = { artista: artista };

    return this.http
      .put<void>(`${this.baseUrl}/api/festivales/${idFestival}/artistas`, body)
      .pipe(catchError(this.handleError));
  }
}
