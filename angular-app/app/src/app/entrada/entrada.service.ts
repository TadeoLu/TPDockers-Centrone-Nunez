import { Injectable } from '@angular/core';
import { IEntrada } from './entrada.interface';
import { Observable, catchError, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EntradaService {
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

  postEntrada(idFestival: number, entrada: IEntrada): Observable<IEntrada> {
    const body: any = { entrada: entrada };

    return this.http
      .post<IEntrada>(
        `${this.baseUrl}/api/festivales/${idFestival}/entradas`,
        body
      )
      .pipe(catchError(this.handleError));
  }

  deleteEntrada(idFestival: number, id: number): Observable<void> {
    return this.http
      .delete<void>(
        `${this.baseUrl}/api/festivales/${idFestival}/entradas/${id}`
      )
      .pipe(catchError(this.handleError));
  }

  putEntrada(idFestival: number, entrada: IEntrada): Observable<void> {
    const body: any = { entrada: entrada };

    return this.http
      .put<void>(`${this.baseUrl}/api/festivales/${idFestival}/entradas`, body)
      .pipe(catchError(this.handleError));
  }
}
