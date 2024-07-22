import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService, Book } from '../services/book.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  clientData: any = {
    doc_type: 1,
    doc_number: '',
    first_name: '',
    last_name: '',
    phone: '',
    email: ''
  };

  cartItems: Book[] = [];
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

  onSubmit(): void {
    const orderData = {
      client: this.clientData,
      items: this.cartItems,
      total: this.total
    };

    // Simulamos el procesamiento de la orden
    console.log('Order processed:', orderData);
    alert('Orden procesada con éxito');
    this.router.navigate(['/confirmacion']);
  }
}