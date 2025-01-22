import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-products',
  standalone: false,
  
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  category: string = 'all';
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = ['all', 'men', 'women', 'electronics', 'grocery', 'daily'];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'] || 'all';
      this.loadProducts();
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filterProducts();
    });
  }

  filterProducts() {
    this.filteredProducts = this.category === 'all' 
      ? this.products 
      : this.products.filter(p => p.category === this.category);
  }

  openProductDetails(product: Product) {
    this.dialog.open(ProductDetailComponent, {
      width: '100%',
      maxWidth: '800px',
      data: product
    });
  }
}