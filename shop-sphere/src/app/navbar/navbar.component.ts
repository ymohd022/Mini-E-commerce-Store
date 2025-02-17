import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isSearchOpen = false;
  isAuthenticated = false;
  user: any;
  cartCount: number = 0;

  constructor(private router: Router, private authService: AuthService, private cartService: CartService) {}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
        if (isAuthenticated) {
          this.user = this.authService.getCurrentUser();
        } else {
          this.cartCount = 0;
        }
      }
    );

    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  navigateToCart() {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/cart']);
    this.isMenuOpen = false;
  }

  logout() {
    this.authService.logout();
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }

  showUserProfile() {
    // Implement user profile display logic here
    console.log('Show user profile');
  }
}

