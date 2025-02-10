import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  isNew: boolean;
}

@Component({
  selector: 'app-new-arrivals',
  standalone: false,
  
  templateUrl: './new-arrivals.component.html',
  styleUrl: './new-arrivals.component.scss'
})
export class NewArrivalsComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Pink Shirt Insert Tweed Dress',
      price: 4499,
      image: 'Pink Shirt Insert Tweed Dress.jpg',
      isNew: true
    },
    {
      id: 2,
      name: 'Black Striped Knitted Crop Top',
      price: 1299,
      image: 'Black Striped Knitted Crop Top.jpg',
      isNew: true
    },
    {
      id: 3,
      name: 'Blue Half Shimmer Denim Dress',
      price: 5499,
      image: 'Blue Half Shimmer Denim Dress.jpg',
      isNew: true
    }
  ];

  sortOptions = [
    { value: 'popularity', viewValue: 'Popularity' },
    { value: 'price-low', viewValue: 'Price: Low to High' },
    { value: 'price-high', viewValue: 'Price: High to Low' },
    { value: 'newest', viewValue: 'Newest First' }
  ];
}
