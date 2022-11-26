import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';
  users: any;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get('http://localhost:5002/api/users').subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.log(err),
      complete: () => console.log('No error found'),
    });
  }
}
