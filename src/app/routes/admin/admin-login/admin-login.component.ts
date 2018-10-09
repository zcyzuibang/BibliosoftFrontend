import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { backendServer } from '../../../utils/backendServer';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  user: string;
  pass: string;

  constructor(private http: HttpClient) { }

  admin_login(user?: string, pass?: string) {
    const body = new URLSearchParams();
    body.set('username', user ? user : this.user);
    body.set('password', pass ? pass : this.pass);
    console.log(body.toString());
    this.http.post(`${backendServer.get_url()}/login`, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }).subscribe(
      val => {
        console.log('login success!');
        location.href = '/admin/home';
      },
      err => {
        console.log('login failed');
      },
      () => {}
    );
  }
}