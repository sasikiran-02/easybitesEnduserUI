import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RestaurantService } from '../restaurant.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userEmail: string = localStorage.getItem('userEmail') || 'Guest';
  searchQuery: string = '';
  featuredRestaurants: any[] = [];
  filteredRestaurants: any[] = [];
  cartItemCount: number = 0;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFeaturedRestaurants();
  }

  loadFeaturedRestaurants() {
    this.restaurantService.getAllRestaurants().then((response) => {
      this.featuredRestaurants = response.data.slice(0, 4); // Show only 4 restaurants
      this.filteredRestaurants = [...this.featuredRestaurants];
    });
  }

  searchRestaurants() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/restaurants'], {
        queryParams: { search: this.searchQuery },
      });
    } else {
      this.router.navigate(['/restaurants']); // Navigate to all restaurants if no search term
    }
  }

  viewAllRestaurants() {
    this.router.navigate(['/restaurants']); // Navigate to full restaurant list
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }
}
