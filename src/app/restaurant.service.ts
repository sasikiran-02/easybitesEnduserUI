import { Injectable } from '@angular/core';
import apiClient from './axios.config'; // Import Axios instance

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private baseUrl = '/restaurant'; // Base URL is already set in `apiClient`

  getAllRestaurants() {
    return apiClient.get(`${this.baseUrl}/all`); // ✅ Now automatically includes Authorization header
  }

  getRestaurantById(restaurantId: number) {
    return apiClient.get(`${this.baseUrl}/${restaurantId}`); // ✅ Token is attached automatically
  }
}
