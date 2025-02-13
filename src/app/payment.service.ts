import { Injectable } from '@angular/core';
import apiClient from './axios.config'; // ✅ Import custom Axios instance

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private baseUrl = '/payment'; // Base URL is already set in `apiClient`

  /**
   * ✅ Process a payment for an order
   */
  processPayment(orderId: number, paymentMethod: string, amount: number) {
    return apiClient.post(`${this.baseUrl}/process`, null, {
      params: { orderId, paymentMethod, amount }, // ✅ Use params instead of URL string interpolation
    });
  }

  /**
   * ✅ Get all payments for a user
   */
  getUserPayments(userId: number) {
    return apiClient.get(`${this.baseUrl}/${userId}`); // ✅ Automatically includes Authorization header
  }
}
