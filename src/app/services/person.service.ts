import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../types/person.types';


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.set('Content-Type', 'application/json');
    this.headers.set('Access-Control-Allow-Origin', '*');
    this.headers.set('Access-Control-Allow-Credentials', 'true');
    this.headers.set('Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    this.headers.set('Access-Control-Allow-Headers',
      'origin, content-type, accept, authorization');
  }

  create(person: Person): Observable<Person> {
    return this.http.post<Person>(environment.personUrl + '/add', person, { headers: this.headers });
  }

  findAll(): Observable<Person[]> {
    return this.http.get<Person[]>(environment.personUrl + '/all', { headers: this.headers });
  }

  find(id: number): Observable<Person> {
    return this.http.get<Person>(environment.personUrl + '/findById/' + id, { headers: this.headers });
  }

  findByNom(nom: string): Observable<Person[]> {
    return this.http.get<Person[]>(environment.personUrl + '/findByNom/' + nom, { headers: this.headers });

  }

  update(person: Person): Observable<Person> {
    return this.http.put<Person>(environment.personUrl + '/update', person, { headers: this.headers });

  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(environment.personUrl + '/delete/' + id, { headers: this.headers });
  }
}
