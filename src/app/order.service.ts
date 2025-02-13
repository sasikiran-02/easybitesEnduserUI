import { Injectable } from '@angular/core';
import apiClient from './axios.config'; // ✅ Import the Axios instance with interceptor

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = '/order'; // Base URL is already configured in `apiClient`

  /**
   * ✅ Place an order
   */
  placeOrder(userId: number, paymentMethod: string) {
    return apiClient.post(`${this.baseUrl}/${userId}/place`, null, {
      params: { paymentMethod }, // ✅ Use params instead of manual query string
    });
  }

  /**
   * ✅ Get all orders for a user
   */
  getUserOrders(userId: number) {
    return apiClient.get(`${this.baseUrl}/${userId}`); // ✅ Automatically includes Authorization header
  }

  /**
   * ✅ Get order details by order ID
   */
  getOrderDetails(orderId: number) {
    return apiClient.get(`${this.baseUrl}/details/${orderId}`);
  }

  cancelOrder(orderId: number) {
    return apiClient.delete(`${this.baseUrl}/cancel/${orderId}`);
  }
}
