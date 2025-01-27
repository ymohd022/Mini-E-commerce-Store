import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  phone: string = '';
  otp: string = '';
  otpSent: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post('/api/send-otp', { phone: this.phone }).subscribe(
      (response: any) => {
        this.otpSent = true;
      },
      (error) => {
        console.error('Failed to send OTP', error);
      }
    );
  }

  onVerifyOTP() {
    this.http.post('/api/login', { phone: this.phone, otp: this.otp }).subscribe(
      (response: any) => {
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Failed to login', error);
      }
    );
  }
}