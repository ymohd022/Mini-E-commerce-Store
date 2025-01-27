import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    const user = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password,
    };

    this.http.post('/api/register', user).subscribe(
      (response: any) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Failed to register', error);
      }
    );
  }
}