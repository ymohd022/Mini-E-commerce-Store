import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  passwordStrength = 0;
  isPhoneVerified = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  checkPasswordStrength(password: string) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^A-Za-z0-9]/)) strength++;
    this.passwordStrength = strength;
  }

  sendOTP() {
    const phone = this.registerForm.get('phone')?.value;
    this.authService.sendOTP(phone).subscribe(
      () => {
        this.snackBar.open('OTP sent successfully', 'Close', { duration: 3000 });
      },
      (error) => {
        this.snackBar.open('Failed to send OTP', 'Close', { duration: 3000 });
      }
    );
  }

  verifyOTP(otp: string) {
    const phone = this.registerForm.get('phone')?.value;
    this.authService.verifyOTP(phone, otp).subscribe(
      () => {
        this.isPhoneVerified = true;
        this.snackBar.open('Phone number verified', 'Close', { duration: 3000 });
      },
      (error) => {
        this.snackBar.open('Invalid OTP', 'Close', { duration: 3000 });
      }
    );
  }

  onSubmit() {
    if (this.registerForm.valid && this.isPhoneVerified) {
      const userData = this.registerForm.value;
      delete userData.confirmPassword;
      delete userData.terms;

      this.authService.register(userData).subscribe(
        () => {
          this.snackBar.open('Registration successful! Please log in.', 'Close', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        (error) => {
          if (error.status === 409) {
            this.snackBar.open('Email or phone number already exists', 'Close', { duration: 3000 });
          } else {
            this.snackBar.open('Registration failed', 'Close', { duration: 3000 });
          }
        }
      );
    }
  }
}