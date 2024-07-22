import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  orderNumber: string = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  orderDate: Date = new Date();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  returnToHome(): void {
    this.router.navigate(['/buscar']);
  }
}