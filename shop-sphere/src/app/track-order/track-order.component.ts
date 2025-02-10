import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-track-order',
  standalone: false,
  
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.scss'
})
export class TrackOrderComponent {
  trackingForm: FormGroup;
  trackingPartners = [
    { name: 'FedEx', icon: 'local_shipping' },
    { name: 'BlueDart', icon: 'local_shipping' },
    { name: 'DHL', icon: 'local_shipping' }
  ];

  constructor(private fb: FormBuilder) {
    this.trackingForm = this.fb.group({
      orderId: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.trackingForm.valid) {
      console.log('Tracking request submitted', this.trackingForm.value);
      // Add tracking logic here
    }
  }
}