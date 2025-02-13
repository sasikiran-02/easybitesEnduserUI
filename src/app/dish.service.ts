import { Injectable } from '@angular/core';
import apiClient from './axios.config'; // ✅ Import the Axios instance with interceptor

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private baseUrl = '/dish'; // Base URL is already set in `apiClient`

  /**
   * ✅ Get all dishes from a specific restaurant
   */
  getDishesByRestaurant(restaurantId: number) {
    return apiClient.get(`${this.baseUrl}/restaurant/${restaurantId}`); // ✅ Automatically includes Authorization header
  }

  /**
   * ✅ Get details of a specific dish
   */
  getDishById(dishId: number) {
    return apiClient.get(`${this.baseUrl}/${dishId}`);
  }
}
