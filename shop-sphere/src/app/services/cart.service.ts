import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { AuthService } from './auth.service';

export interface CartItem {
  product: Product;
  quantity: number;
}



@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();
  
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const items = JSON.parse(savedCart);
      this.cartItems.next(items);
      this.updateCartCount();
    }
  }

  private updateCartCount() {
    const count = this.cartItems.value.reduce((total, item) => total + item.quantity, 0);
    this.cartCount.next(count);
  }

  addToCart(product: Product, quantity: number) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, { product, quantity }]);
    }

    this.updateCartCount();
    this.saveCart();
  }

  updateQuantity(productId: number, quantity: number) {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(item => item.product.id === productId.toString());
    if (item) {
      item.quantity = quantity;
      this.cartItems.next([...currentItems]);
      this.saveCart();
    }
  }

  removeFromCart(productId: number) {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item.product.id !== productId.toString());
    this.cartItems.next(updatedItems);
    this.saveCart();
  }

  getCartCount(): number {
    return this.cartItems.value.reduce((total, item) => total + item.quantity, 0);
  }

  clearCart() {
    this.cartItems.next([]);
    this.cartCount.next(0);
    localStorage.removeItem('cart');
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
  }
}