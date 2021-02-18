import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8000/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email,
      password
    }, httpOptions);
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      name,
      email,
      password
    }, httpOptions);
  }

  forgot(email: string): Observable<any> {
      return this.http.post(AUTH_API + 'forgot_password', {
          email
      }, httpOptions);
  }

  reset(email: string, token: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'reset', {
        email,
        token,
        password
    }, httpOptions);
  }

  logout(token: string): Observable<any> {
      return this.http.get(AUTH_API + 'logout', {
          headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
      });
  }
}