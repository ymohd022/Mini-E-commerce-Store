import { CartItem } from '../services/cart.service';

export interface Order {
  id: string;
  items: {
    product: {
      id: number;
      name: string;
      price: number;
      images: string[];
    };
    quantity: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: Date;
  deliveryDate?: Date;
  trackingNumber?: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}