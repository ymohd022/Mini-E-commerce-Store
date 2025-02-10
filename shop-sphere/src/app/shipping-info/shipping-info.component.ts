import { Component } from '@angular/core';

@Component({
  selector: 'app-shipping-info',
  standalone: false,
  
  templateUrl: './shipping-info.component.html',
  styleUrl: './shipping-info.component.scss'
})
export class ShippingInfoComponent {
  shippingMethods = [
    {
      title: 'Standard Delivery',
      time: '5-7 business days',
      cost: 'Free for orders above ₹999',
      icon: 'local_shipping'
    },
    {
      title: 'Express Delivery',
      time: '2-3 business days',
      cost: 'Additional ₹199',
      icon: 'rocket_launch'
    },
    {
      title: 'International Shipping',
      time: '7-14 business days',
      cost: 'Calculated at checkout',
      icon: 'flight_takeoff'
    }
  ];
}