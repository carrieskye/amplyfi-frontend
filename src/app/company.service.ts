import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Company} from "./company";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})
export class CompanyService {
  private companiesUrl = `${environment.apiURL}/companies`;

  constructor(private http: HttpClient) {
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.companiesUrl)
      .pipe(
        tap(_ => console.log('Fetched companies')),
        catchError(this.handleError<Company[]>('getCompanies', []))
      );
  }

  getCompany(name: string): Observable<Company> {
    const url = `${this.companiesUrl}/${name}`;
    return this.http.get<Company>(url)
      .pipe(
        tap(_ => console.log(`Fetched company with name ${name}`)),
        catchError(this.handleError<Company>(`getCompany name=${name}`))
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
