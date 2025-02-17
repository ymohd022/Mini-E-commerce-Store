import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    private dialogRef: MatDialogRef<ProductDetailComponent>,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.selectedImage = this.product.images[0];
  }

  changeImage(image: string) {
    this.selectedImage = image;
  }

  addToCart() {
    if (!this.authService.getCurrentUser()) {
      this.dialogRef.close();
      this.snackBar.open('Please login to add items to cart', 'Close', { duration: 3000 });
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addToCart(this.product, this.quantity);
    this.snackBar.open('Item added to cart', 'Close', { duration: 3000 });
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}