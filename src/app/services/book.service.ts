import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Book {
  book_id: number;
  isbn: string;
  name: string;
  author: string;
  stock: number;
  current_price: number;
  quantity: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [
    { 
      book_id: 1, 
      isbn: '9788420471830', 
      name: 'La ciudad y los perros', 
      author: 'Mario Vargas Llosa',
      stock: 10, 
      current_price: 59.90, 
      quantity: 1,
      imageUrl: 'assets/book-covers/la-ciudad-y-los-perros.jpg'
    },
    { 
      book_id: 2, 
      isbn: '9788420471823', 
      name: 'Conversación en La Catedral', 
      author: 'Mario Vargas Llosa',
      stock: 15, 
      current_price: 65.30, 
      quantity: 1,
      imageUrl: 'assets/book-covers/conversacion-en-la-catedral.jpg'
    },
    { 
      book_id: 3, 
      isbn: '9788420471816', 
      name: 'La casa verde', 
      author: 'Mario Vargas Llosa',
      stock: 8, 
      current_price: 55.50, 
      quantity: 1,
      imageUrl: 'assets/book-covers/la-casa-verde.jpg'
    },
    { 
      book_id: 4, 
      isbn: '9788437601519', 
      name: 'Los ríos profundos', 
      author: 'José María Arguedas',
      stock: 12, 
      current_price: 48.70, 
      quantity: 1,
      imageUrl: 'assets/book-covers/los-rios-profundos.jpg'
    },
    { 
      book_id: 5, 
      isbn: '9788420473895', 
      name: 'Un mundo para Julius', 
      author: 'Alfredo Bryce Echenique',
      stock: 20, 
      current_price: 52.00, 
      quantity: 1,
      imageUrl: 'assets/book-covers/un-mundo-para-julius.jpg'
    },
  ];

  private cart: Book[] = [];

  constructor() { }

  getAllBooks(): Observable<Book[]> {
    return of(this.books);
  }

  searchBooks(query: string): Observable<Book[]> {
    const results = this.books.filter(book => 
      book.name.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase()) ||
      book.isbn.includes(query)
    );
    return of(results);
  }

  addToCart(book: Book): Observable<any> {
    const existingBook = this.cart.find(item => item.book_id === book.book_id);
    if (existingBook) {
      existingBook.quantity += 1;
    } else {
      this.cart.push({...book, quantity: 1});
    }
    console.log('Book added to cart:', book);
    return of({ success: true, message: 'Book added to cart' });
  }

  getCart(): Observable<Book[]> {
    return of(this.cart);
  }

  removeFromCart(index: number): Observable<any> {
    this.cart.splice(index, 1);
    console.log('Book removed from cart at index:', index);
    return of({ success: true, message: 'Book removed from cart' });
  }

  updateCartItemQuantity(bookId: number, quantity: number): Observable<any> {
    const book = this.cart.find(item => item.book_id === bookId);
    if (book) {
      book.quantity = quantity;
    }
    console.log('Updated quantity for book:', bookId, 'to', quantity);
    return of({ success: true, message: 'Quantity updated' });
  }

  processOrder(orderData: any): Observable<any> {
    console.log('Processing order:', orderData);
    // Aquí simularíamos el procesamiento de la orden
    // En una aplicación real, esto se enviaría al backend
    this.cart = []; // Limpiamos el carrito después de procesar la orden
    return of({ success: true, message: 'Order processed successfully' });
  }
}