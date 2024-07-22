import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';

interface Book {
  book_id: number;
  isbn: string;
  name: string;
  author: string;
  stock: number;
  current_price: number;
  quantity: number;
  imageUrl: string;
}

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {
  searchTerm: string = '';
  allBooks: Book[] = [];
  displayedBooks: Book[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    // Inicializamos la lista de libros con imágenes
    this.allBooks = [
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
    this.displayedBooks = [...this.allBooks];
    this.loadAllBooks();
  }

  // Carga todos los libros del backend
  loadAllBooks() {
    console.log('Fetching books...');
    this.bookService.getAllBooks().subscribe(
      (data) => {
        console.log('Books received:', data);
        // Combinar los libros del backend con los libros locales
        this.allBooks = [...this.allBooks, ...data.filter((book: Book) => 
          !this.allBooks.some(localBook => localBook.book_id === book.book_id)
        )];
        this.displayedBooks = [...this.allBooks];
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  // Realiza la búsqueda de libros
  searchBooks() {
    if (this.searchTerm.trim() === '') {
      this.displayedBooks = [...this.allBooks];
    } else {
      this.displayedBooks = this.allBooks.filter(book => 
        book.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        book.isbn.includes(this.searchTerm)
      );
    }
  }

  // Añade un libro al carrito
  addToCart(book: Book) {
    this.bookService.addToCart(book).subscribe(
      (response) => {
        console.log('Book added to cart:', response);
        alert('Libro añadido al carrito');
      },
      (error) => {
        console.error('Error adding book to cart:', error);
        alert('Error al añadir libro al carrito');
      }
    );
  }

  // Incrementa la cantidad de un libro
  incrementQuantity(book: Book) {
    if (book.quantity < book.stock) {
      book.quantity++;
    }
  }

  // Decrementa la cantidad de un libro
  decrementQuantity(book: Book) {
    if (book.quantity > 1) {
      book.quantity--;
    }
  }
}