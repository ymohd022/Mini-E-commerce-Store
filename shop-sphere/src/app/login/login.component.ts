import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  loginForm: FormGroup;
  hidePassword = true;
  loginMethod: 'email' | 'phone' = 'email';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      emailOrPhone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleLoginMethod() {
    this.loginMethod = this.loginMethod === 'email' ? 'phone' : 'email';
    this.loginForm.get('emailOrPhone')?.setValue('');
    this.loginForm.get('emailOrPhone')?.setValidators(
      this.loginMethod === 'email' ? [Validators.required, Validators.email] : [Validators.required]
    );
    this.loginForm.get('emailOrPhone')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { emailOrPhone, password } = this.loginForm.value;
      this.authService.login(emailOrPhone, password).subscribe(
        (response) => {
          this.snackBar.open('Login successful', 'Close', { duration: 3000 });
          // Store the user's information (e.g., in localStorage or a state management solution)
          localStorage.setItem('user', JSON.stringify(response.user));
          this.router.navigate(['/dashboard']); // Navigate to the dashboard or home page
        },
        (error) => {
          this.snackBar.open('Invalid credentials', 'Close', { duration: 3000 });
        }
      );
    }
  }
}