import { Injectable } from '@angular/core';
import apiClient from './axios.config'; // ✅ Import the centralized Axios instance

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = '/cart'; // Base URL is already set in `apiClient`

  /**
   * ✅ Get all items in the cart
   */
  getCart(userId: number) {
    return apiClient.get(`${this.baseUrl}/${userId}`);
  }

  /**
   * ✅ Add a dish to the cart
   */
  addToCart(userId: number, dishId: number, quantity: number) {
    return apiClient.post(`${this.baseUrl}/${userId}/add/${dishId}`, null, {
      params: { quantity },
    });
  }

  /**
   * ✅ Remove a dish from the cart
   */
  removeFromCart(userId: number, dishId: number) {
    return apiClient.delete(`${this.baseUrl}/${userId}/remove/${dishId}`);
  }

  /**
   * ✅ Clear the cart
   */
  clearCart(userId: number) {
    return apiClient.delete(`${this.baseUrl}/${userId}/clear`);
  }
}
