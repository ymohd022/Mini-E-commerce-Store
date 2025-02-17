import { Component, OnInit } from '@angular/core';
import { Order } from '../interfaces/order.interface';
import { OrderService } from '../services/order.service';


@Component({
  selector: 'app-myorders',
  standalone: false,
  
  templateUrl: './myorders.component.html',
  styleUrl: './myorders.component.scss'
})
export class MyordersComponent implements OnInit {
  orders: Order[] = [];
  activeTab: 'active' | 'delivered' = 'active';

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  getFilteredOrders() {
    return this.orders.filter(order => {
      if (this.activeTab === 'active') {
        return ['pending', 'processing', 'shipped'].includes(order.status);
      } else {
        return order.status === 'delivered';
      }
    });
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      pending: 'warn',
      processing: 'accent',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'gray'
    };
    return colors[status] || 'primary';
  }

  getProgressValue(status: string): number {
    const values: { [key: string]: number } = {
      pending: 25,
      processing: 50,
      shipped: 75,
      delivered: 100,
      cancelled: 0
    };
    return values[status] || 0;
  }
}
