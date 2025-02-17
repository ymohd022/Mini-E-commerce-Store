import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService, CartItem } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  selection = new SelectionModel<CartItem>(true, []);
  
  constructor(
    private cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  updateQuantity(item: CartItem, change: number) {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      this.cartService.updateQuantity(Number(item.product.id), newQuantity);
    }
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.snackBar.open('Item removed from cart', 'Close', { duration: 3000 });
  }

  getTotal(): number {
    return this.selection.selected.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0);
  }

  isAllSelected() {
    return this.selection.selected.length === this.cartItems.length;
  }

  toggleAllSelection() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.cartItems.forEach(item => this.selection.select(item));
    }
  }

  checkout() {
    if (this.selection.selected.length === 0) {
      this.snackBar.open('Please select items to checkout', 'Close', { duration: 3000 });
      return;
    }
    // Implement checkout logic here
    console.log('Checking out with items:', this.selection.selected);
  }
}