import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IFestival } from './festival.interface';

@Injectable({
  providedIn: 'root',
})
export class FestivalService {
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

  getFestival(): Observable<IFestival[]> {
    return this.http.get<IFestival[]>(`${this.baseUrl}/api/festivales`);
  }

  postFestival(festival: IFestival): Observable<IFestival> {
    const body: any = { festival: festival };

    return this.http
      .post<IFestival>(`${this.baseUrl}/api/festivales`, body)
      .pipe(catchError(this.handleError));
  }

  putFestival(festival: IFestival): Observable<IFestival> {
    const body: any = { festival: festival };

    return this.http
      .put<IFestival>(`${this.baseUrl}/api/festivales`, body)
      .pipe(catchError(this.handleError));
  }

  deleteFestival(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/festivales/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
