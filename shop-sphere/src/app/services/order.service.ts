import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    // Replace with actual API call
    return of([
      {
        id: 'ORD-2024-001',
        items: [
          {
            product: {
              id: 1,
              name: 'Premium Cotton T-Shirt',
              price: 29.99,
              images: ['Premium Cotton T-Shirt.jpg']
            },
            quantity: 2
          }
        ],
        totalAmount: 59.98,
        status: 'processing',
        orderDate: new Date(),
        trackingNumber: 'TRK123456789',
        shippingAddress: {
          street: '123 Main St',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400001'
        }
      }
      // Add more mock orders as needed
    ]);
  }

  createOrder(order: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders`, order);
  }
}