import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Doc} from "./doc";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})
export class DocService {
  private docsUrl = `${environment.apiURL}/docs`;

  constructor(private http: HttpClient) {
  }

  getDocs(): Observable<Doc[]> {
    return this.http.get<Doc[]>(this.docsUrl)
      .pipe(
        tap(_ => console.log('Fetched docs')),
        catchError(this.handleError<Doc[]>('getDocs', []))
      );
  }

  getDocsLimited(limit, skip): Observable<Doc[]> {
    const url = `${this.docsUrl}?limit=${limit}&skip=${skip}`;
    return this.http.get<Doc[]>(url)
      .pipe(
        tap(_ => console.log(`Fetched docs with limit ${limit} skipping the first ${skip}`)),
        catchError(this.handleError<Doc[]>('getDocs', []))
      );
  }

  getDoc(id: string): Observable<Doc> {
    const url = `${this.docsUrl}/${id}`;
    return this.http.get<Doc>(url)
      .pipe(
        tap(_ => console.log(`Fetched doc with id ${id}`)),
        catchError(this.handleError<Doc>(`getDoc id=${id}`))
      );
  }

  getNumberOfDocs(): Observable<number> {
    const url = `${this.docsUrl}-count`;
    return this.http.get<number>(url)
      .pipe(
        tap(_ => console.log('Fetched total number of docs')),
        catchError(this.handleError<number>('getNumberOfDocs'))
      );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
