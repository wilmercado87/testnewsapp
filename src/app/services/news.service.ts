import { Contact } from './../models/contact';
import { Program } from './../models/program';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { New } from '../models/new';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiUrl = 'https://cms.qailumno.com'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getNews(): Observable<New[]> {
    return this.http.get<New[]>(this.apiUrl + '/servicios/noticias').pipe(
      tap((_) => console.log('fetched news:')),
      catchError(this.handleError<New[]>('getNews', []))
    );
  }

  getPrograms() : Observable<Program[]>{
    return this.http.get<Program[]>(this.apiUrl + '/servicios/programas').pipe(
      tap((_) => console.log('fetched programs:')),
      catchError(this.handleError<Program[]>('getPrograms', []))
    );
  }

  saveNew(data: Contact): Observable<any>{
    return this.http.post(this.apiUrl + '/servicios/registro', data, this.httpOptions).pipe(
      tap((_) => console.log('save new:')),
      catchError(this.handleError<New[]>('saveNew'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
