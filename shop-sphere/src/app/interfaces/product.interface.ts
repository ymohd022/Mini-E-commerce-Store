export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    subCategory: string;
    images: string[];
    specifications?: { [key: string]: string };
    stock: number;
    rating: number;
    reviews: number;
    brand: string;
  }