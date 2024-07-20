import { Component } from '@angular/core';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent {
  searchTerm: string = '';
  books: any[] = [];

  searchBooks() {
    // Aquí iría la lógica para buscar libros
    console.log('Searching for:', this.searchTerm);
    // Por ahora, simularemos algunos resultados
    this.books = [
      { id: 1, title: 'Book 1', author: 'Author 1', isbn: '1234567890123', price: 19.99 },
      { id: 2, title: 'Book 2', author: 'Author 2', isbn: '2345678901234', price: 29.99 },
    ];
  }

  addToCart(book: any) {
    // Aquí iría la lógica para añadir al carrito
    console.log('Added to cart:', book);
  }
}