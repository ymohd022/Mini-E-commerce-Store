import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  selectedImage: string;
  quantity: number = 1;

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private dialogRef: MatDialogRef<ProductDetailComponent>
  ) {
    this.selectedImage = this.product.images[0];
  }

  changeImage(image: string) {
    this.selectedImage = image;
  }

  addToCart() {
    // Implement cart functionality
    console.log('Added to cart:', this.product.name, 'Quantity:', this.quantity);
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}