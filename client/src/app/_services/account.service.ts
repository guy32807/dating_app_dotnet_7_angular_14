import { BehaviorSubject, map } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currrentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currrentUserSource.asObservable();
  constructor(private http: HttpClient) {}
  login(model: User) {
    return this.http.post<User>(`${this.baseUrl}/account/login`, model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currrentUserSource.next(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currrentUserSource.next(null);
  }

  setCurrentUser(user: User) {
    this.currrentUserSource.next(user);
  }

  register(model: any) {
    return this.http.post<User>(`${this.baseUrl}/account/register`, model).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currrentUserSource.next(user);
        }
      })
    );
  }
}
