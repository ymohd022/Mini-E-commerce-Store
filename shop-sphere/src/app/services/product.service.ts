import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 'm1',
      name: 'Premium Cotton T-Shirt',
      description: 'Luxurious cotton t-shirt with perfect fit and comfort',
      price: 29.99,
      category: 'men',
      subCategory: 'clothing',
      images: ['tshirt.png', 'tshirt2.jpg', 'tshirt3.jpg'],
      specifications: {
        material: '100% Cotton',
        fit: 'Regular',
        care: 'Machine wash'
      },
      stock: 100,
      rating: 4.5,
      reviews: 128,
      brand: 'HopStyle'
    },
    {
      id: 'm2',
      name: 'Classic Leather Wallet',
      description: 'Elegant and durable leather wallet with multiple compartments',
      price: 19.99,
      category: 'men',
      subCategory: 'accessories',
      images: ['wallet1.jpg', 'wallet2.jpeg'],
      specifications: {
        material: 'Genuine Leather',
        dimensions: '4.5 x 3.5 inches',
        warranty: '1 year'
      },
      stock: 50,
      rating: 4.8,
      reviews: 72,
      brand: 'LeatherCraft'
    },
    {
      id: 'm3',
      name: 'Sports Running Shoes',
      description: 'Lightweight running shoes designed for maximum comfort and durability',
      price: 49.99,
      category: 'men',
      subCategory: 'footwear',
      images: ['shoes1.jpg', 'shoes2.jpg'],
      specifications: {
        material: 'Breathable Mesh',
        sole: 'Rubber',
        weight: '600g'
      },
      stock: 80,
      rating: 4.7,
      reviews: 89,
      brand: 'RunEase'
    },
    {
      id: 'm4',
      name: 'Formal Dress Shirt',
      description: 'Sharp and stylish formal shirt for professional occasions',
      price: 39.99,
      category: 'men',
      subCategory: 'clothing',
      images: ['shirt1.jpg', 'shirt2.jpg'],
      specifications: {
        material: 'Polyester Blend',
        fit: 'Slim Fit',
        care: 'Hand wash'
      },
      stock: 60,
      rating: 4.4,
      reviews: 56,
      brand: 'Elegance'
    },
  
    // Women Products
    {
      id: 'w1',
      name: 'Floral Summer Dress',
      description: 'Beautiful floral dress perfect for summer outings',
      price: 34.99,
      category: 'women',
      subCategory: 'clothing',
      images: ['dress1.jpg', 'dress2.jpg'],
      specifications: {
        material: 'Chiffon',
        fit: 'Relaxed',
        care: 'Dry clean only'
      },
      stock: 70,
      rating: 4.6,
      reviews: 102,
      brand: 'BloomWear'
    },
    {
      id: 'w2',
      name: 'Leather Handbag',
      description: 'Stylish handbag with ample storage and sleek design',
      price: 59.99,
      category: 'women',
      subCategory: 'accessories',
      images: ['handbag1.jpg', 'handbag2.jpg'],
      specifications: {
        material: 'Genuine Leather',
        dimensions: '12 x 8 x 4 inches',
        warranty: '1 year'
      },
      stock: 40,
      rating: 4.9,
      reviews: 75,
      brand: 'StyleCraft'
    },
    {
      id: 'w3',
      name: 'Fitness Yoga Pants',
      description: 'Comfortable and stretchable yoga pants for daily workouts',
      price: 24.99,
      category: 'women',
      subCategory: 'activewear',
      images: ['pants1.jpg', 'pants2.jpg'],
      specifications: {
        material: 'Spandex Blend',
        fit: 'Body Fit',
        care: 'Machine wash'
      },
      stock: 90,
      rating: 4.7,
      reviews: 88,
      brand: 'FlexFit'
    },
    {
      id: 'w4',
      name: 'Silver Pendant Necklace',
      description: 'Elegant silver necklace with a heart-shaped pendant',
      price: 49.99,
      category: 'women',
      subCategory: 'jewelry',
      images: ['necklace1.jpg'],
      specifications: {
        material: '925 Sterling Silver',
        length: '18 inches',
        warranty: '6 months'
      },
      stock: 30,
      rating: 4.8,
      reviews: 63,
      brand: 'ShinyThings'
    },
  
    // Electronics
    {
      id: 'e1',
      name: 'Wireless Bluetooth Earbuds',
      description: 'High-quality sound and noise cancellation with ergonomic design',
      price: 79.99,
      category: 'electronics',
      subCategory: 'audio',
      images: ['earbuds1.jpg', 'earbuds2.jpeg'],
      specifications: {
        batteryLife: '24 hours',
        connectivity: 'Bluetooth 5.2',
        warranty: '1 year'
      },
      stock: 120,
      rating: 4.6,
      reviews: 189,
      brand: 'SoundSurge'
    },
    {
      id: 'e2',
      name: '4K Smart TV',
      description: 'Ultra HD Smart TV with vibrant display and streaming apps',
      price: 399.99,
      category: 'electronics',
      subCategory: 'television',
      images: ['tv1.jpg', 'tv2.jpg'],
      specifications: {
        resolution: '4K UHD',
        screenSize: '50 inches',
        warranty: '2 years'
      },
      stock: 20,
      rating: 4.7,
      reviews: 54,
      brand: 'VisionTech'
    },
    {
      id: 'e3',
      name: 'Gaming Laptop',
      description: 'High-performance laptop for gaming and multitasking',
      price: 999.99,
      category: 'electronics',
      subCategory: 'computers',
      images: ['laptop1.jpg', 'laptop2.jpg'],
      specifications: {
        processor: 'Intel Core i7',
        ram: '16GB',
        storage: '1TB SSD'
      },
      stock: 10,
      rating: 4.8,
      reviews: 34,
      brand: 'GamePro'
    },
    {
      id: 'e4',
      name: 'Smartphone',
      description: 'Feature-packed smartphone with stunning display and camera',
      price: 699.99,
      category: 'electronics',
      subCategory: 'mobile',
      images: ['phone1.jpg', 'phone2.jpg'],
      specifications: {
        screen: '6.5-inch AMOLED',
        camera: '108MP + 12MP',
        battery: '4500mAh'
      },
      stock: 50,
      rating: 4.6,
      reviews: 92,
      brand: 'MobilePlus'
    },
  
    // Grocery and Daily Needs
    {
      id: 'g1',
      name: 'Organic Brown Rice',
      description: 'Healthy and nutritious brown rice for daily meals',
      price: 12.99,
      category: 'grocery',
      subCategory: 'grains',
      images: ['rice1.jpg'],
      specifications: {
        weight: '5kg',
        type: 'Long Grain',
        // organic: true
      },
      stock: 100,
      rating: 4.5,
      reviews: 43,
      brand: 'HealthyHarvest'
    },
    {
      id: 'g2',
      name: 'Almonds',
      description: 'Premium quality raw almonds for snacking and cooking',
      price: 15.99,
      category: 'grocery',
      subCategory: 'nuts',
      images: ['almonds1.jpg'],
      specifications: {
        weight: '500g',
        // organic: true,
        packaging: 'Resealable'
      },
      stock: 70,
      rating: 4.7,
      reviews: 51,
      brand: 'NutriDelight'
    },
    {
      id: 'g3',
      name: 'Toothpaste',
      description: 'Fluoride toothpaste for strong and healthy teeth',
      price: 2.99,
      category: 'daily',
      subCategory: 'personal care',
      images: ['toothpaste1.jpg'],
      specifications: {
        weight: '150g',
        flavor: 'Mint',
        benefits: 'Cavity Protection'
      },
      stock: 200,
      rating: 4.4,
      reviews: 36,
      brand: 'FreshSmile'
    },
    {
      id: 'g4',
      name: 'Dishwashing Liquid',
      description: 'Tough on grease, gentle on hands',
      price: 3.99,
      category: 'daily',
      subCategory: 'cleaning',
      images: ['dishwash1.jpg'],
      specifications: {
        volume: '1L',
        scent: 'Lemon',
        benefits: 'Eco-friendly'
      },
      stock: 150,
      rating: 4.5,
      reviews: 41,
      brand: 'EcoClean'
    }
  ];
  constructor(private http: HttpClient) {}

  getProducts(category?: string): Observable<Product[]> {
    if (category) {
      return of(this.products.filter(p => p.category === category));
    }
    return of(this.products);
  }

  getProduct(id: string): Observable<Product | undefined> {
    return of(this.products.find(p => p.id === id));
  }
}