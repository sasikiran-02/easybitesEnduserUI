import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaymentService } from '../payment.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-payament',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './payament.component.html',
  styleUrl: './payament.component.css',
})
export class PaymentComponent implements OnInit {
  orderId!: number;
  userId!: number;
  paymentMethod: string = 'Card'; // Default method
  amount!: number;
  isProcessing: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId') || '0', 10);
    this.orderId = Number(this.route.snapshot.queryParamMap.get('orderId'));
    this.amount = Number(this.route.snapshot.queryParamMap.get('amount'));

    if (!this.orderId || !this.amount) {
      this.errorMessage = 'Invalid payment details.';
    }
  }

  /**
   * ✅ Dummy Process Payment
   */
  processPayment() {
    if (!this.paymentMethod) {
      this.errorMessage = 'Please select a payment method.';
      return;
    }

    this.isProcessing = true;

    setTimeout(() => {
      alert('Payment Successful!');
      this.router.navigate(['/orders']); // Redirect to orders page
    }, 2000); // Simulate a delay
  }

  /**
   * ✅ Cancel Payment & Delete Order
   */
  cancelPayment() {
    this.orderService
      .cancelOrder(this.orderId)
      .then(() => {
        alert('Payment cancelled. Order has been removed.');
        this.router.navigate(['/cart']); // Redirect back to cart
      })
      .catch((error: any) => {
        console.error('Order cancellation failed:', error);
      });
  }
}
