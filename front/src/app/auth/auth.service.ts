import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpOptions: any;
  public username: string;
  public errors: any = [];
  public expiresT = 72000;  // this = JWT_EXPIRATION_DELTA in settings.py

  constructor(private http: HttpClient, private router: Router) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  public login(user): Observable<any> {
    return this.http.post('api/auth-jwt/', JSON.stringify(user), this.httpOptions);
  }

  public logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('expires_at');
    this.username = null;
  }

  public updateData(token) {
    localStorage.setItem('jwt_token', token);
    const expiresAt = moment().add(token.expiresIn, 'second');
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    this.errors = [];
  }

  public getToken(): string {
    return localStorage.getItem('jwt_token');
  }

  public isAuthenticated() {
    return (localStorage.getItem('jwt_token') != null);
  }

  public getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public isLoggedIn() {
    const expiresAt = this.getExpiration();
    if ( !expiresAt ) {
      return false;
    } else {
      const interval = moment().diff(expiresAt, 'seconds');
      return (interval < this.expiresT);
    }
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  public getUsername() {
    const token = this.getToken();
    const token_parts = token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    return token_decoded.username;
  }
}
