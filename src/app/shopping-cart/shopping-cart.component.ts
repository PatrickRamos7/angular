import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.bookService.getCart().subscribe(
      (data) => {
        this.cartItems = data;
        this.calculateTotal();
      },
      (error) => {
        console.error('Error loading cart:', error);
      }
    );
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + (item.current_price * item.quantity), 0);
  }

  removeItem(index: number): void {
    this.bookService.removeFromCart(index).subscribe(
      () => {
        this.cartItems.splice(index, 1);
        this.calculateTotal();
      },
      (error) => {
        console.error('Error removing item from cart:', error);
      }
    );
  }

  updateQuantity(item: any, newQuantity: number): void {
    if (newQuantity > 0 && newQuantity <= item.stock) {
      this.bookService.updateCartItemQuantity(item.book_id, newQuantity).subscribe(
        () => {
          item.quantity = newQuantity;
          this.calculateTotal();
        },
        (error) => {
          console.error('Error updating item quantity:', error);
        }
      );
    }
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}