import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  userId: number | null = null;
  paymentMethod: string = 'Card'; // Default Payment Method

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId') || '0', 10);
    if (!this.userId) {
      console.error('User ID not found in localStorage.');
      return;
    }
    this.loadCartItems();
  }

  /**
   * ✅ Fetch Cart Items & Calculate Total Price
   */
  loadCartItems() {
    this.cartService
      .getCart(this.userId!)
      .then((response) => {
        this.cartItems = response.data;
        this.calculateTotal();
      })
      .catch((error) => {
        console.error('Error fetching cart:', error);
      });
  }

  /**
   * ✅ Increase Quantity of a Cart Item
   */
  increaseQuantity(item: any) {
    item.quantity++;
    this.cartService.addToCart(this.userId!, item.dish.id, 1).then(() => {
      this.calculateTotal();
    });
  }

  /**
   * ✅ Decrease Quantity of a Cart Item
   */
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.addToCart(this.userId!, item.dish.id, -1).then(() => {
        this.calculateTotal();
      });
    } else {
      this.removeItem(item);
    }
  }

  /**
   * ✅ Remove an Item from the Cart
   */
  removeItem(item: any) {
    this.cartService.removeFromCart(this.userId!, item.dish.id).then(() => {
      this.cartItems = this.cartItems.filter(
        (cartItem) => cartItem.dish.id !== item.dish.id
      );
      this.calculateTotal();
    });
  }

  /**
   * ✅ Calculate Total Price of Cart
   */
  calculateTotal() {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.quantity * item.dish.price,
      0
    );
  }

  /**
   * ✅ Checkout & Proceed to Payment
   */
  checkout() {
    if (!this.userId) return;

    this.orderService
      .placeOrder(this.userId, this.paymentMethod)
      .then((response) => {
        const orderId = response.data.id;
        const amount = this.totalPrice;

        // Navigate to payment screen with order details
        this.router.navigate(['/payment'], {
          queryParams: { orderId, amount },
        });
      })
      .catch((error) => {
        console.error('Checkout failed:', error);
      });
  }
}
