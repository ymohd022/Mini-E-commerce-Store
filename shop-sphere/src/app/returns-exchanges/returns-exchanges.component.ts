import { Component } from '@angular/core';

@Component({
  selector: 'app-returns-exchanges',
  standalone: false,
  
  templateUrl: './returns-exchanges.component.html',
  styleUrl: './returns-exchanges.component.scss'
})
export class ReturnsExchangesComponent {
  returnSteps = [
    {
      title: 'Initiate Return',
      description: 'Log into your account and select the order you want to return',
      icon: 'assignment_return'
    },
    {
      title: 'Package Item',
      description: 'Pack the item securely with all tags and original packaging',
      icon: 'inventory_2'
    },
    {
      title: 'Ship Back',
      description: 'Use our prepaid shipping label to send the item back',
      icon: 'local_shipping'
    },
    {
      title: 'Get Refund',
      description: 'Receive your refund within 5-7 business days after we receive the item',
      icon: 'payments'
    }
  ];
}